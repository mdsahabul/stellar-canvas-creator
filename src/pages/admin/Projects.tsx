
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DashboardLayout from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Plus, Search, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Define the Project type
type Project = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  tags: string[];
  status: string;
  featured: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
};

// Project form schema
const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().nullable().optional(),
  image_url: z.string().nullable().optional(),
  tags: z.string().transform((val) => 
    val.split(",").map((tag) => tag.trim()).filter(Boolean)
  ),
  status: z.enum(["published", "draft"]),
  featured: z.boolean().default(false),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

const ProjectsPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const queryClient = useQueryClient();
  
  // Form for creating/editing projects
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      image_url: "",
      tags: "",
      status: "draft",
      featured: false,
    },
  });
  
  // Fetch projects from Supabase
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching projects:", error);
        toast({
          title: "Error loading projects",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }
      
      return data as Project[];
    },
  });

  // Create project mutation
  const createMutation = useMutation({
    mutationFn: async (values: ProjectFormValues) => {
      // Get current user ID from Supabase auth
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error("You must be logged in to create a project");
      
      const { error } = await supabase
        .from('projects')
        .insert({
          title: values.title,
          description: values.description,
          image_url: values.image_url,
          tags: values.tags,
          status: values.status,
          featured: values.featured,
          user_id: user.id,
        });
      
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({
        title: "Project created",
        description: "The project has been successfully created.",
      });
      setIsCreateDialogOpen(false);
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error creating project",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  // Update project mutation
  const updateMutation = useMutation({
    mutationFn: async (data: { id: string; values: ProjectFormValues }) => {
      const { error } = await supabase
        .from('projects')
        .update({
          title: data.values.title,
          description: data.values.description,
          image_url: data.values.image_url,
          tags: data.values.tags,
          status: data.values.status,
          featured: data.values.featured,
          updated_at: new Date().toISOString(),
        })
        .eq('id', data.id);
      
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({
        title: "Project updated",
        description: "The project has been successfully updated.",
      });
      setIsEditDialogOpen(false);
      setCurrentProject(null);
    },
    onError: (error: Error) => {
      toast({
        title: "Error updating project",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  // Delete project mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
      
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({
        title: "Project deleted",
        description: "The project has been successfully deleted.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error deleting project",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  // Status update mutation
  const statusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('projects')
        .update({ 
          status,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);
      
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({
        title: "Status updated",
        description: "Project status has been changed successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error updating status",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  // Featured toggle mutation
  const featuredMutation = useMutation({
    mutationFn: async ({ id, featured }: { id: string; featured: boolean }) => {
      const { error } = await supabase
        .from('projects')
        .update({ 
          featured,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);
      
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({
        title: "Featured status updated",
        description: "The project's featured status has been updated.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error updating featured status",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const handleDeleteProject = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleStatusChange = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "published" ? "draft" : "published";
    statusMutation.mutate({ id, status: newStatus });
  };

  const handleFeaturedToggle = (id: string, currentFeatured: boolean) => {
    featuredMutation.mutate({ id, featured: !currentFeatured });
  };

  const onCreateSubmit = (values: ProjectFormValues) => {
    createMutation.mutate(values);
  };

  const onEditSubmit = (values: ProjectFormValues) => {
    if (currentProject) {
      updateMutation.mutate({ id: currentProject.id, values });
    }
  };

  const handleEditProject = (project: Project) => {
    setCurrentProject(project);
    form.reset({
      title: project.title,
      description: project.description || "",
      image_url: project.image_url || "",
      tags: project.tags.join(", "),
      status: project.status as "published" | "draft",
      featured: project.featured,
    });
    setIsEditDialogOpen(true);
  };

  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
    project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <DashboardLayout 
      title="Projects" 
      description="Manage your portfolio projects"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
              <DialogDescription>
                Add a new project to your portfolio. Fill in the details below.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onCreateSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter project title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter project description"
                          rows={4}
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="image_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter image URL"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags (comma separated)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="React, TypeScript, etc."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                          <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                            {...field}
                          >
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="featured"
                    render={({ field }) => (
                      <FormItem className="flex items-end space-x-2">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={field.onChange}
                            className="h-4 w-4"
                          />
                        </FormControl>
                        <FormLabel>Featured Project</FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={createMutation.isPending}>
                    {createMutation.isPending ? "Saving..." : "Save Project"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Project</DialogTitle>
              <DialogDescription>
                Update the project details below.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onEditSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter project title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter project description"
                          rows={4}
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="image_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter image URL"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags (comma separated)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="React, TypeScript, etc."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                          <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                            {...field}
                          >
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="featured"
                    render={({ field }) => (
                      <FormItem className="flex items-end space-x-2">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={field.onChange}
                            className="h-4 w-4"
                          />
                        </FormControl>
                        <FormLabel>Featured Project</FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={updateMutation.isPending}>
                    {updateMutation.isPending ? "Saving..." : "Update Project"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue="grid">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              Sort: Newest First
            </Button>
            <Button variant="outline" size="sm">
              Filter
            </Button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center p-12">
            <p>Loading projects...</p>
          </div>
        ) : (
          <>
            <TabsContent value="grid" className="mt-4">
              {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((project) => (
                    <Card key={project.id} className="overflow-hidden">
                      <div className="aspect-video relative">
                        <img 
                          src={project.image_url || "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&w=764&q=80"} 
                          alt={project.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="secondary" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditProject(project)}>
                                <Edit className="h-4 w-4 mr-2" />
                                <span>Edit</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleStatusChange(project.id, project.status)}
                              >
                                <span>{project.status === "published" ? "Unpublish" : "Publish"}</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleFeaturedToggle(project.id, project.featured)}>
                                <span>{project.featured ? "Unfeature" : "Feature"}</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-destructive focus:text-destructive"
                                onClick={() => handleDeleteProject(project.id)}
                              >
                                <Trash className="h-4 w-4 mr-2" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>{project.title}</CardTitle>
                          <div className="flex space-x-1">
                            {project.featured && (
                              <Badge variant="secondary">Featured</Badge>
                            )}
                            <Badge variant={project.status === "published" ? "default" : "outline"}>
                              {project.status === "published" ? "Published" : "Draft"}
                            </Badge>
                          </div>
                        </div>
                        <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, index) => (
                            <Badge key={index} variant="outline">{tag}</Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">Preview</Button>
                        <Button size="sm" onClick={() => handleEditProject(project)}>Edit Project</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center p-8">
                  <p className="text-muted-foreground">No projects found. Create your first project!</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="list" className="mt-4">
              {filteredProjects.length > 0 ? (
                <div className="overflow-hidden rounded-md border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="p-4 text-left font-medium">Project</th>
                        <th className="p-4 text-left font-medium">Status</th>
                        <th className="p-4 text-left font-medium">Tags</th>
                        <th className="p-4 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProjects.map((project, index) => (
                        <tr key={project.id} className={index % 2 ? "bg-muted/30" : ""}>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="h-12 w-12 rounded-md overflow-hidden">
                                <img 
                                  src={project.image_url || "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&w=764&q=80"} 
                                  alt={project.title} 
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-medium">{project.title}</p>
                                <p className="text-muted-foreground line-clamp-1">
                                  {project.description}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Badge variant={project.status === "published" ? "default" : "outline"}>
                                {project.status === "published" ? "Published" : "Draft"}
                              </Badge>
                              {project.featured && (
                                <Badge variant="secondary">Featured</Badge>
                              )}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex flex-wrap gap-1">
                              {project.tags.slice(0, 2).map((tag, i) => (
                                <Badge key={i} variant="outline">{tag}</Badge>
                              ))}
                              {project.tags.length > 2 && (
                                <Badge variant="outline">+{project.tags.length - 2}</Badge>
                              )}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleEditProject(project)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-destructive"
                                onClick={() => handleDeleteProject(project.id)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleEditProject(project)}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    <span>Edit</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => handleStatusChange(project.id, project.status)}
                                  >
                                    <span>{project.status === "published" ? "Unpublish" : "Publish"}</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleFeaturedToggle(project.id, project.featured)}>
                                    <span>{project.featured ? "Unfeature" : "Feature"}</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    className="text-destructive focus:text-destructive"
                                    onClick={() => handleDeleteProject(project.id)}
                                  >
                                    <Trash className="h-4 w-4 mr-2" />
                                    <span>Delete</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center p-8">
                  <p className="text-muted-foreground">No projects found. Create your first project!</p>
                </div>
              )}
            </TabsContent>
          </>
        )}
      </Tabs>
    </DashboardLayout>
  );
};

export default ProjectsPage;
