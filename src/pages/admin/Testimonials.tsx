
import DashboardLayout from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Plus, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const TestimonialsPage = () => {
  const { toast } = useToast();
  
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      content: "The portfolio CMS created by this developer has transformed how we manage our agency's showcase. Incredibly intuitive and powerful!",
      author: "Alex Johnson",
      position: "Creative Director, Design Studio",
      avatar: "https://i.pravatar.cc/150?img=1",
      status: "published"
    },
    {
      id: 2,
      content: "I've used many portfolio systems over the years, but this is by far the most flexible and user-friendly solution I've encountered.",
      author: "Sarah Chen",
      position: "Freelance Photographer",
      avatar: "https://i.pravatar.cc/150?img=5",
      status: "published"
    },
    {
      id: 3,
      content: "The ability to completely customize my portfolio's appearance while having full control over content has been game-changing for my business.",
      author: "Michael Torres",
      position: "Frontend Developer",
      avatar: "https://i.pravatar.cc/150?img=3",
      status: "published"
    },
  ]);
  
  const handleDeleteTestimonial = (id: number) => {
    setTestimonials(testimonials.filter(testimonial => testimonial.id !== id));
    toast({
      title: "Testimonial deleted",
      description: "The testimonial has been successfully deleted.",
    });
  };
  
  const handleStatusChange = (id: number) => {
    setTestimonials(testimonials.map(testimonial => 
      testimonial.id === id 
        ? { 
            ...testimonial, 
            status: testimonial.status === "published" ? "draft" : "published" 
          } 
        : testimonial
    ));
    
    const testimonial = testimonials.find(t => t.id === id);
    const newStatus = testimonial?.status === "published" ? "draft" : "published";
    
    toast({
      title: "Status updated",
      description: `Testimonial has been ${newStatus === "published" ? "published" : "unpublished"}.`,
    });
  };
  
  return (
    <DashboardLayout
      title="Testimonials"
      description="Manage client and colleague testimonials"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-muted-foreground">
            Showing {testimonials.length} testimonials
          </p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Testimonial</DialogTitle>
              <DialogDescription>
                Add a new client or colleague testimonial to your portfolio.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Author Name</Label>
                <Input id="name" placeholder="John Smith" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="position">Position</Label>
                <Input id="position" placeholder="CEO, Company Name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="testimonial">Testimonial</Label>
                <Textarea
                  id="testimonial"
                  placeholder="Enter testimonial content"
                  rows={4}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="avatar">Avatar URL</Label>
                <Input id="avatar" placeholder="https://example.com/avatar.jpg" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="status" defaultChecked />
                <Label htmlFor="status">Publish immediately</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button onClick={() => {
                toast({
                  title: "Testimonial added",
                  description: "The testimonial has been successfully added.",
                });
              }}>
                Save Testimonial
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="flex flex-col">
            <CardContent className="pt-6 flex-grow">
              <div className="mb-6">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="36" 
                  height="36" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-primary/30"
                >
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                </svg>
              </div>
              <p className="text-muted-foreground mb-6">
                {testimonial.content}
              </p>
              <div className="flex items-center mt-auto">
                <Avatar className="h-10 w-10 mr-4">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                  <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.position}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t flex justify-between pt-4">
              <Badge variant={testimonial.status === "published" ? "default" : "outline"}>
                {testimonial.status === "published" ? "Published" : "Draft"}
              </Badge>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleStatusChange(testimonial.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    {testimonial.status === "published" ? (
                      <path d="M18.6 2.4A2.4 2.4 0 0 1 21 4.8V10c0 .5-.5 1-1 1s-1-.5-1-1V7L9 17c-.3.3-.7.3-1 0l-2-2a.7.7 0 0 1 0-1l10-10H14c-.5 0-1-.5-1-1s.5-1 1-1h4.8c.6 0 .7.3.8.4z" />
                    ) : (
                      <path d="M9 10.6l5.4 5.4M19 12c0 7-7 10-7 10v-4c-5 0-5-4-5-4H3V6h4v3s0-4 5-4v-4c7 3 7 11 7 11z" />
                    )}
                  </svg>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive"
                  onClick={() => handleDeleteTestimonial(testimonial.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default TestimonialsPage;
