
import { useEffect } from "react";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Index = () => {
  useEffect(() => {
    // Simple scroll animation
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => observer.observe(el));
    
    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A full-stack e-commerce solution with customer portal, admin dashboard, and payment integration.",
      image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      link: "#"
    },
    {
      id: 2,
      title: "Finance Dashboard",
      description: "Dashboard for tracking financial data with interactive charts and real-time updates.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      tags: ["TypeScript", "React", "D3.js", "Firebase"],
      link: "#"
    },
    {
      id: 3,
      title: "Social Media App",
      description: "Mobile-first social platform for connecting professionals in creative industries.",
      image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      tags: ["React Native", "Firebase", "Redux", "AWS"],
      link: "#"
    },
  ];

  const skills = {
    frontend: [
      { name: "React", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "HTML/CSS", level: 95 },
      { name: "Tailwind CSS", level: 85 },
    ],
    backend: [
      { name: "Node.js", level: 80 },
      { name: "Express", level: 75 },
      { name: "PostgreSQL", level: 70 },
      { name: "Supabase", level: 80 },
    ],
    other: [
      { name: "Git", level: 85 },
      { name: "Docker", level: 65 },
      { name: "UI/UX Design", level: 75 },
      { name: "AWS", level: 65 },
    ],
  };

  const testimonials = [
    {
      id: 1,
      content: "The portfolio CMS created by this developer has transformed how we manage our agency's showcase. Incredibly intuitive and powerful!",
      author: "Alex Johnson",
      position: "Creative Director, Design Studio",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
      id: 2,
      content: "I've used many portfolio systems over the years, but this is by far the most flexible and user-friendly solution I've encountered.",
      author: "Sarah Chen",
      position: "Freelance Photographer",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    {
      id: 3,
      content: "The ability to completely customize my portfolio's appearance while having full control over content has been game-changing for my business.",
      author: "Michael Torres",
      position: "Frontend Developer",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center relative pt-16">
        <div className="container px-4 md:px-6 py-10 md:py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="animate-on-scroll">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                Creative Developer & <span className="text-primary">UI Designer</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                I build beautiful, functional websites and applications with cutting-edge technologies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <a href="#projects">View My Work</a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="#contact">Contact Me</a>
                </Button>
              </div>
            </div>
            <div className="hidden lg:flex justify-end animate-on-scroll">
              <div className="relative w-full max-w-md aspect-square rounded-full bg-gradient-to-tr from-primary/20 to-secondary/20 backdrop-blur-sm p-1">
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                    alt="Developer" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="section bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2">About Me</h2>
            <p className="text-muted-foreground max-w-2xl">
              Web developer and designer with a passion for creating stunning digital experiences
            </p>
            <Separator className="mt-4 w-24" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <h3 className="text-2xl font-bold mb-4">My Journey</h3>
              <p className="mb-4 text-muted-foreground">
                With over 8 years of experience in web development, I've worked with startups, agencies, and established companies to create memorable digital products. My approach combines clean code with creative design thinking.
              </p>
              <p className="mb-6 text-muted-foreground">
                I specialize in building modern React applications with TypeScript, backed by powerful API solutions. My passion lies in creating interfaces that are not only beautiful but also intuitive and accessible.
              </p>
              
              <div className="flex gap-4 mt-6">
                <Button variant="outline" size="sm">Download CV</Button>
                <Button variant="ghost" size="sm">My Process</Button>
              </div>
            </div>
            
            <div className="animate-on-scroll">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-background rounded-md p-4 text-center">
                      <h4 className="font-bold text-4xl text-primary mb-1">8+</h4>
                      <p className="text-muted-foreground">Years of Experience</p>
                    </div>
                    <div className="bg-background rounded-md p-4 text-center">
                      <h4 className="font-bold text-4xl text-primary mb-1">50+</h4>
                      <p className="text-muted-foreground">Projects Completed</p>
                    </div>
                    <div className="bg-background rounded-md p-4 text-center">
                      <h4 className="font-bold text-4xl text-primary mb-1">30+</h4>
                      <p className="text-muted-foreground">Happy Clients</p>
                    </div>
                    <div className="bg-background rounded-md p-4 text-center">
                      <h4 className="font-bold text-4xl text-primary mb-1">15+</h4>
                      <p className="text-muted-foreground">Technologies Mastered</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Projects Section */}
      <section id="projects" className="section">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2">My Projects</h2>
            <p className="text-muted-foreground max-w-2xl">
              Explore some of my recent work and the technologies I've used
            </p>
            <Separator className="mt-4 w-24" />
          </div>
          
          <div className="flex justify-center mb-8">
            <Tabs defaultValue="all" className="w-full max-w-md">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="web">Web</TabsTrigger>
                <TabsTrigger value="app">App</TabsTrigger>
                <TabsTrigger value="design">Design</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="animate-on-scroll">
                <div className="project-card group h-full">
                  <div className="aspect-video rounded-t-lg overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="bg-card p-6 rounded-b-lg border">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.link}>View Project</a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-12">
            <Button>View All Projects</Button>
          </div>
        </div>
      </section>
      
      {/* Skills Section */}
      <section id="skills" className="section bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2">My Skills</h2>
            <p className="text-muted-foreground max-w-2xl">
              Technologies and tools I'm proficient with
            </p>
            <Separator className="mt-4 w-24" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="animate-on-scroll">
              <Card className="h-full">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4">Frontend Development</h3>
                  <div className="space-y-4">
                    {skills.frontend.map((skill, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="skill-bar">
                          <div 
                            className="skill-progress" 
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="animate-on-scroll">
              <Card className="h-full">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4">Backend Development</h3>
                  <div className="space-y-4">
                    {skills.backend.map((skill, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="skill-bar">
                          <div 
                            className="skill-progress" 
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="animate-on-scroll">
              <Card className="h-full">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4">Other Skills</h3>
                  <div className="space-y-4">
                    {skills.other.map((skill, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="skill-bar">
                          <div 
                            className="skill-progress" 
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="section">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2">Testimonials</h2>
            <p className="text-muted-foreground max-w-2xl">
              What my clients and colleagues say about my work
            </p>
            <Separator className="mt-4 w-24" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="animate-on-scroll">
                <Card className="h-full">
                  <CardContent className="flex flex-col p-6">
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
                    <p className="text-muted-foreground mb-6 flex-grow">
                      {testimonial.content}
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-4">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.author} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.position}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="section bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2">Get In Touch</h2>
            <p className="text-muted-foreground max-w-2xl">
              Have a project in mind? Let's talk about how we can work together
            </p>
            <Separator className="mt-4 w-24" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="animate-on-scroll">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-6">Send Me a Message</h3>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">Name</label>
                        <Input id="name" placeholder="Your name" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <Input id="email" type="email" placeholder="Your email" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                      <Input id="subject" placeholder="Subject of your message" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">Message</label>
                      <Textarea 
                        id="message" 
                        placeholder="Write your message here..." 
                        className="min-h-[150px]"
                      />
                    </div>
                    <Button type="submit" className="w-full">Send Message</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <div className="animate-on-scroll">
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                <p className="text-muted-foreground mb-6">
                  Feel free to reach out through any of these channels. I'll get back to you as soon as possible.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="text-primary"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Phone</h4>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="text-primary"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <path d="m22 6-10 7L2 6" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Email</h4>
                      <p className="text-muted-foreground">hello@portfolio-cms.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="text-primary"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Location</h4>
                      <p className="text-muted-foreground">San Francisco, California</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4">Follow Me</h3>
                <div className="flex space-x-4">
                  <Button variant="outline" size="icon" asChild>
                    <a href="#" aria-label="Twitter">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                      </svg>
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href="#" aria-label="GitHub">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href="#" aria-label="LinkedIn">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect width="4" height="12" x="2" y="9" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href="#" aria-label="Instagram">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                      </svg>
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <SiteFooter />
    </div>
  );
};

export default Index;
