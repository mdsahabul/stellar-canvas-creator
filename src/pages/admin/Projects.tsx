
import { useState } from "react";
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

const ProjectsPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock project data
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A full-stack e-commerce solution with customer portal, admin dashboard, and payment integration.",
      image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      status: "published",
      featured: true,
    },
    {
      id: 2,
      title: "Finance Dashboard",
      description: "Dashboard for tracking financial data with interactive charts and real-time updates.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      tags: ["TypeScript", "React", "D3.js", "Firebase"],
      status: "published",
      featured: true,
    },
    {
      id: 3,
      title: "Social Media App",
      description: "Mobile-first social platform for connecting professionals in creative industries.",
      image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      tags: ["React Native", "Firebase", "Redux", "AWS"],
      status: "draft",
      featured: false,
    },
  ]);

  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter(project => project.id !== id));
    toast({
      title: "Project deleted",
      description: "The project has been successfully deleted.",
    });
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setProjects(projects.map(project => 
      project.id === id ? { ...project, status: newStatus } : project
    ));
    toast({
      title: "Status updated",
      description: `Project status has been changed to ${newStatus}.`,
    });
  };

  const handleFeaturedToggle = (id: number) => {
    setProjects(projects.map(project => 
      project.id === id ? { ...project, featured: !project.featured } : project
    ));
    
    const project = projects.find(p => p.id === id);
    const willBeFeautred = !project?.featured;
    
    toast({
      title: willBeFeautred ? "Project featured" : "Project unfeatured",
      description: willBeFeautred 
        ? "The project will now be featured on your portfolio." 
        : "The project is no longer featured on your portfolio.",
    });
  };

  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
        
        <Dialog>
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
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Project Title</Label>
                <Input id="title" placeholder="Enter project title" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter project description"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input id="image" placeholder="Enter image URL or upload" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input id="tags" placeholder="React, TypeScript, etc." />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      className="h-4 w-4"
                    />
                    <Label htmlFor="featured">Featured Project</Label>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button onClick={() => {
                toast({
                  title: "Project created",
                  description: "The project has been successfully created.",
                });
              }}>
                Save Project
              </Button>
            </DialogFooter>
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
        
        <TabsContent value="grid" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img 
                    src={project.image} 
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
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleStatusChange(
                            project.id, 
                            project.status === "published" ? "draft" : "published"
                          )}
                        >
                          <span>{project.status === "published" ? "Unpublish" : "Publish"}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleFeaturedToggle(project.id)}>
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
                  <Button size="sm">Edit Project</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="list" className="mt-4">
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
                            src={project.image} 
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
                        <Button variant="ghost" size="icon">
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
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleStatusChange(
                                project.id, 
                                project.status === "published" ? "draft" : "published"
                              )}
                            >
                              <span>{project.status === "published" ? "Unpublish" : "Publish"}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleFeaturedToggle(project.id)}>
                              <span>{project.featured ? "Unfeature" : "Feature"}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="focus:text-destructive">
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
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default ProjectsPage;
