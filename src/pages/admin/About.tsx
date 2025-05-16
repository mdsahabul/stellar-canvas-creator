
import { useState } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const AboutPage = () => {
  const { toast } = useToast();
  
  const [aboutData, setAboutData] = useState({
    name: "John Doe",
    title: "Creative Developer & UI Designer",
    shortBio: "I build beautiful, functional websites and applications with cutting-edge technologies.",
    fullBio: "With over 8 years of experience in web development, I've worked with startups, agencies, and established companies to create memorable digital products. My approach combines clean code with creative design thinking.\n\nI specialize in building modern React applications with TypeScript, backed by powerful API solutions. My passion lies in creating interfaces that are not only beautiful but also intuitive and accessible.",
    email: "hello@portfolio-cms.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, California",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    experience: [
      {
        position: "Senior Frontend Developer",
        company: "Tech Innovations Inc.",
        period: "2020 - Present",
        description: "Lead developer for client projects, focusing on React and TypeScript applications. Mentored junior developers and established coding standards for the team."
      },
      {
        position: "Web Developer",
        company: "Creative Agency",
        period: "2017 - 2020",
        description: "Developed websites and web applications for clients across various industries. Worked closely with designers to implement pixel-perfect interfaces."
      },
      {
        position: "Junior Developer",
        company: "StartUp Co.",
        period: "2015 - 2017",
        description: "Assisted in building and maintaining web applications. Collaborated with the team to implement new features and fix bugs."
      }
    ],
    education: [
      {
        degree: "Master of Computer Science",
        institution: "Tech University",
        year: "2015",
        description: "Focused on web technologies and user experience design."
      },
      {
        degree: "Bachelor of Science in Information Technology",
        institution: "State University",
        year: "2013",
        description: "Graduated with honors. Specialized in software development."
      }
    ],
    socialMedia: {
      twitter: "https://twitter.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
      instagram: "https://instagram.com/johndoe"
    }
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAboutData({
      ...aboutData,
      [name]: value
    });
  };
  
  const handleSocialMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAboutData({
      ...aboutData,
      socialMedia: {
        ...aboutData.socialMedia,
        [name]: value
      }
    });
  };
  
  const handleExperienceChange = (index: number, field: string, value: string) => {
    const updatedExperience = [...aboutData.experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value
    };
    
    setAboutData({
      ...aboutData,
      experience: updatedExperience
    });
  };
  
  const handleEducationChange = (index: number, field: string, value: string) => {
    const updatedEducation = [...aboutData.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value
    };
    
    setAboutData({
      ...aboutData,
      education: updatedEducation
    });
  };
  
  const handleSave = () => {
    toast({
      title: "Information updated",
      description: "Your about information has been saved successfully.",
    });
  };

  return (
    <DashboardLayout
      title="About"
      description="Manage your personal information"
    >
      <Tabs defaultValue="basic">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your basic personal details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={aboutData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="title">Professional Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={aboutData.title}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="shortBio">Short Bio</Label>
                <Textarea
                  id="shortBio"
                  name="shortBio"
                  value={aboutData.shortBio}
                  onChange={handleInputChange}
                  placeholder="Brief description that appears in the hero section"
                  rows={2}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="fullBio">Full Bio</Label>
                <Textarea
                  id="fullBio"
                  name="fullBio"
                  value={aboutData.fullBio}
                  onChange={handleInputChange}
                  placeholder="Detailed biography for your about section"
                  rows={6}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Update your contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={aboutData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={aboutData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={aboutData.location}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
              <CardDescription>
                Update your profile image
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="rounded-full overflow-hidden w-32 h-32">
                  <img
                    src={aboutData.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-4 flex-grow">
                  <div className="grid gap-2">
                    <Label htmlFor="avatar">Image URL</Label>
                    <Input
                      id="avatar"
                      name="avatar"
                      value={aboutData.avatar}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <Button variant="outline">Upload New Image</Button>
                    <Button variant="outline" className="text-destructive">
                      Remove Image
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="experience" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Work Experience</CardTitle>
              <CardDescription>
                Add or edit your professional experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {aboutData.experience.map((exp, index) => (
                <div key={index} className="border rounded-md p-4 space-y-4">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Experience #{index + 1}</h3>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      Remove
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor={`position-${index}`}>Position</Label>
                      <Input
                        id={`position-${index}`}
                        value={exp.position}
                        onChange={(e) => handleExperienceChange(index, "position", e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`company-${index}`}>Company</Label>
                      <Input
                        id={`company-${index}`}
                        value={exp.company}
                        onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor={`period-${index}`}>Period</Label>
                    <Input
                      id={`period-${index}`}
                      value={exp.period}
                      onChange={(e) => handleExperienceChange(index, "period", e.target.value)}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor={`description-${index}`}>Description</Label>
                    <Textarea
                      id={`description-${index}`}
                      value={exp.description}
                      onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full">
                Add Experience
              </Button>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="education" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
              <CardDescription>
                Add or edit your educational background
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {aboutData.education.map((edu, index) => (
                <div key={index} className="border rounded-md p-4 space-y-4">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Education #{index + 1}</h3>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      Remove
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor={`degree-${index}`}>Degree</Label>
                      <Input
                        id={`degree-${index}`}
                        value={edu.degree}
                        onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`institution-${index}`}>Institution</Label>
                      <Input
                        id={`institution-${index}`}
                        value={edu.institution}
                        onChange={(e) => handleEducationChange(index, "institution", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor={`year-${index}`}>Year</Label>
                    <Input
                      id={`year-${index}`}
                      value={edu.year}
                      onChange={(e) => handleEducationChange(index, "year", e.target.value)}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor={`edu-description-${index}`}>Description</Label>
                    <Textarea
                      id={`edu-description-${index}`}
                      value={edu.description}
                      onChange={(e) => handleEducationChange(index, "description", e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full">
                Add Education
              </Button>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Social Media</CardTitle>
              <CardDescription>
                Update your social media profiles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    name="twitter"
                    value={aboutData.socialMedia.twitter}
                    onChange={handleSocialMediaChange}
                    placeholder="https://twitter.com/username"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    name="linkedin"
                    value={aboutData.socialMedia.linkedin}
                    onChange={handleSocialMediaChange}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="github">GitHub</Label>
                  <Input
                    id="github"
                    name="github"
                    value={aboutData.socialMedia.github}
                    onChange={handleSocialMediaChange}
                    placeholder="https://github.com/username"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    name="instagram"
                    value={aboutData.socialMedia.instagram}
                    onChange={handleSocialMediaChange}
                    placeholder="https://instagram.com/username"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default AboutPage;
