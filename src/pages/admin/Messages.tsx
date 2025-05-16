
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DashboardLayout from "@/components/dashboard-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Search, Trash } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Define the Message type
type Message = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  date?: string;
  created_at: string;
  read: boolean | null;
  archived: boolean | null;
};

const MessagesPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [filter, setFilter] = useState("all");
  const queryClient = useQueryClient();
  
  // Fetch messages from Supabase
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching messages:", error);
        toast({
          title: "Error loading messages",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }
      
      return data as Message[];
    },
  });

  // Delete message mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', id);
      
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      toast({
        title: "Message deleted",
        description: "The message has been successfully deleted.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error deleting message",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  // Update message read status mutation
  const updateReadMutation = useMutation({
    mutationFn: async ({ id, read }: { id: string, read: boolean }) => {
      const { error } = await supabase
        .from('messages')
        .update({ read })
        .eq('id', id);
      
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      toast({
        title: "Message status updated",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error updating message",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  // Archive message mutation
  const archiveMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('messages')
        .update({ archived: true })
        .eq('id', id);
      
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      toast({
        title: "Message archived",
        description: "The message has been archived.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error archiving message",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const handleDeleteMessage = (id: string) => {
    deleteMutation.mutate(id);
    
    if (selectedMessage && selectedMessage.id === id) {
      setSelectedMessage(null);
    }
  };

  const handleMarkAsRead = (id: string) => {
    updateReadMutation.mutate({ id, read: true });
  };

  const handleMarkAsUnread = (id: string) => {
    updateReadMutation.mutate({ id, read: false });
  };

  const handleArchiveMessage = (id: string) => {
    archiveMutation.mutate(id);
    
    if (selectedMessage && selectedMessage.id === id) {
      setSelectedMessage(null);
    }
  };
  
  const filteredMessages = messages
    .filter(message => {
      if (filter === "read") return message.read === true;
      if (filter === "unread") return message.read === false;
      return true;
    })
    .filter(message => 
      message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (message.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      message.message.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <DashboardLayout
      title="Messages"
      description="Manage contact form submissions"
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Tabs 
            defaultValue="all" 
            value={filter} 
            onValueChange={setFilter}
            className="w-full md:w-auto"
          >
            <TabsList className="grid grid-cols-3 w-full md:w-auto">
              <TabsTrigger value="all">All ({messages.length})</TabsTrigger>
              <TabsTrigger value="unread">
                Unread ({messages.filter(m => m.read === false).length})
              </TabsTrigger>
              <TabsTrigger value="read">
                Read ({messages.filter(m => m.read === true).length})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center p-12">
            <p>Loading messages...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="col-span-1 lg:col-span-1 overflow-hidden">
              <CardContent className="p-0">
                <div className="max-h-[calc(100vh-240px)] overflow-y-auto">
                  {filteredMessages.length > 0 ? (
                    <div className="divide-y">
                      {filteredMessages.map((message) => (
                        <div 
                          key={message.id} 
                          className={`p-4 cursor-pointer hover:bg-muted/50 ${
                            selectedMessage?.id === message.id ? "bg-muted" : ""
                          } ${message.read === false ? "bg-blue-50 dark:bg-blue-900/10" : ""}`}
                          onClick={() => {
                            setSelectedMessage(message);
                            if (message.read === false) {
                              handleMarkAsRead(message.id);
                            }
                          }}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <h3 className={`font-medium ${message.read === false ? "font-semibold" : ""}`}>
                              {message.name}
                            </h3>
                            <div className="text-xs text-muted-foreground">
                              {formatDate(message.created_at)}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            {message.email}
                          </p>
                          <p className={`text-sm truncate ${message.read === false ? "font-medium" : ""}`}>
                            {message.subject || "(No subject)"}
                          </p>
                          {message.read === false && (
                            <div className="flex justify-end mt-1">
                              <Badge variant="secondary" className="text-xs">New</Badge>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-8 text-center">
                      <p className="text-muted-foreground mb-2">No messages found</p>
                      <p className="text-sm text-muted-foreground">
                        {searchQuery ? "Try adjusting your search query" : "All messages will appear here"}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-1 lg:col-span-2">
              <CardContent className="p-6">
                {selectedMessage ? (
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-xl font-semibold mb-1">{selectedMessage.subject || "(No subject)"}</h2>
                        <p className="text-muted-foreground">
                          From: {selectedMessage.name} ({selectedMessage.email})
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Received: {formatDate(selectedMessage.created_at)}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            if (selectedMessage.read) {
                              handleMarkAsUnread(selectedMessage.id);
                            } else {
                              handleMarkAsRead(selectedMessage.id);
                            }
                          }}
                        >
                          {selectedMessage.read ? "Mark as unread" : "Mark as read"}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive"
                          onClick={() => handleDeleteMessage(selectedMessage.id)}
                        >
                          <Trash className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <p className="whitespace-pre-line">{selectedMessage.message}</p>
                    </div>
                    
                    <div className="flex justify-between mt-8">
                      <Button 
                        variant="outline"
                        onClick={() => {
                          window.location.href = `mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || ''}`
                        }}
                      >
                        Reply via Email
                      </Button>
                      <Button onClick={() => handleArchiveMessage(selectedMessage.id)}>
                        Archive Message
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <p className="text-muted-foreground mb-2">No message selected</p>
                    <p className="text-sm text-muted-foreground">
                      Select a message from the list to view its contents
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      
      <Dialog
        open={!!selectedMessage}
        onOpenChange={(open) => {
          if (!open) setSelectedMessage(null);
        }}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedMessage?.subject || "(No subject)"}</DialogTitle>
            <DialogDescription>
              From: {selectedMessage?.name} ({selectedMessage?.email})
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="whitespace-pre-line">{selectedMessage?.message}</p>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default MessagesPage;
