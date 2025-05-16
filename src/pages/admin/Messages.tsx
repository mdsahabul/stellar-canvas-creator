
import { useState } from "react";
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

const MessagesPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [filter, setFilter] = useState("all");
  
  // Mock message data
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      subject: "Project Inquiry",
      message: "Hi there, I'm interested in working with you on a new website for my business. Can we discuss the details?",
      date: "2023-05-16T14:22:30Z",
      read: false,
    },
    {
      id: 2,
      name: "Emma Watson",
      email: "emma.watson@example.com",
      subject: "Collaboration Opportunity",
      message: "Hello, I'm reaching out to see if you'd be interested in collaborating on a new project I'm launching next month. It's a platform for creative professionals to showcase their work.",
      date: "2023-05-15T09:14:22Z",
      read: false,
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@example.com",
      subject: "Job Opportunity",
      message: "We've been impressed by your portfolio and would like to discuss a potential full-time position at our agency. Please let me know when you might be available for a call.",
      date: "2023-05-10T16:45:10Z",
      read: true,
    },
    {
      id: 4,
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      subject: "Your Recent Project",
      message: "I just wanted to reach out and say how impressed I am with the e-commerce platform you built. The user experience is exceptional. I'm wondering if you could provide some insights into how you approached the UX design.",
      date: "2023-05-08T11:32:45Z",
      read: true,
    },
    {
      id: 5,
      name: "David Chen",
      email: "david.chen@example.com",
      subject: "Speaking Engagement",
      message: "I'm organizing a tech conference in September and would love to have you as a speaker to discuss your approach to portfolio websites with CMS integration. Would you be interested?",
      date: "2023-05-05T13:27:18Z",
      read: true,
    },
  ]);

  const handleDeleteMessage = (id: number) => {
    setMessages(messages.filter(message => message.id !== id));
    
    if (selectedMessage && selectedMessage.id === id) {
      setSelectedMessage(null);
    }
    
    toast({
      title: "Message deleted",
      description: "The message has been successfully deleted.",
    });
  };

  const handleMarkAsRead = (id: number) => {
    setMessages(messages.map(message => 
      message.id === id ? { ...message, read: true } : message
    ));
    
    toast({
      title: "Message marked as read",
    });
  };

  const handleMarkAsUnread = (id: number) => {
    setMessages(messages.map(message => 
      message.id === id ? { ...message, read: false } : message
    ));
    
    toast({
      title: "Message marked as unread",
    });
  };
  
  const filteredMessages = messages
    .filter(message => {
      if (filter === "read") return message.read;
      if (filter === "unread") return !message.read;
      return true;
    })
    .filter(message => 
      message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
                Unread ({messages.filter(m => !m.read).length})
              </TabsTrigger>
              <TabsTrigger value="read">
                Read ({messages.filter(m => m.read).length})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
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
                        } ${!message.read ? "bg-blue-50 dark:bg-blue-900/10" : ""}`}
                        onClick={() => {
                          setSelectedMessage(message);
                          if (!message.read) {
                            handleMarkAsRead(message.id);
                          }
                        }}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h3 className={`font-medium ${!message.read ? "font-semibold" : ""}`}>
                            {message.name}
                          </h3>
                          <div className="text-xs text-muted-foreground">
                            {formatDate(message.date)}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {message.email}
                        </p>
                        <p className={`text-sm truncate ${!message.read ? "font-medium" : ""}`}>
                          {message.subject}
                        </p>
                        {!message.read && (
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
                      <h2 className="text-xl font-semibold mb-1">{selectedMessage.subject}</h2>
                      <p className="text-muted-foreground">
                        From: {selectedMessage.name} ({selectedMessage.email})
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Received: {formatDate(selectedMessage.date)}
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
                    <Button variant="outline">
                      Reply via Email
                    </Button>
                    <Button>
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
      </div>
      
      <Dialog
        open={!!selectedMessage}
        onOpenChange={(open) => {
          if (!open) setSelectedMessage(null);
        }}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedMessage?.subject}</DialogTitle>
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
