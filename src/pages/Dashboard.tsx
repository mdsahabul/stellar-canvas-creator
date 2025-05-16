
import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart } from "recharts";
import { 
  Code,
  Star,
  MessageSquare,
  BookOpen,
  Palette,
  Mail,
  Eye,
  Users,
  ArrowUp,
  ArrowDown
} from "lucide-react";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("week");

  // Mock data for the charts
  const visitorsData = [
    { name: "Mon", value: 400 },
    { name: "Tue", value: 300 },
    { name: "Wed", value: 500 },
    { name: "Thu", value: 280 },
    { name: "Fri", value: 590 },
    { name: "Sat", value: 350 },
    { name: "Sun", value: 300 },
  ];

  const messagesData = [
    { name: "Mon", value: 3 },
    { name: "Tue", value: 2 },
    { name: "Wed", value: 1 },
    { name: "Thu", value: 0 },
    { name: "Fri", value: 5 },
    { name: "Sat", value: 2 },
    { name: "Sun", value: 1 },
  ];

  const projectViewsData = [
    { name: "E-commerce", value: 45 },
    { name: "Finance Dashboard", value: 30 },
    { name: "Social Media App", value: 25 },
  ];

  const cardData = [
    {
      title: "Projects",
      value: "12",
      change: "+2",
      trend: "up",
      description: "Total projects in your portfolio",
      icon: Code,
      link: "/admin/projects",
    },
    {
      title: "Skills",
      value: "24",
      change: "+4",
      trend: "up",
      description: "Tracked skills in your profile",
      icon: Star,
      link: "/admin/skills",
    },
    {
      title: "Testimonials",
      value: "8",
      change: "+1",
      trend: "up",
      description: "Client testimonials received",
      icon: MessageSquare,
      link: "/admin/testimonials",
    },
    {
      title: "Messages",
      value: "14",
      change: "-3",
      trend: "down",
      description: "Unread contact messages",
      icon: Mail,
      link: "/admin/messages",
    },
  ];

  return (
    <DashboardLayout
      title="Dashboard"
      description="Overview of your portfolio website"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cardData.map((card, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                <card.icon className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <div className="flex items-center pt-1 text-xs text-muted-foreground">
                {card.trend === "up" ? (
                  <ArrowUp className="h-3 w-3 mr-1 text-green-500" />
                ) : (
                  <ArrowDown className="h-3 w-3 mr-1 text-red-500" />
                )}
                <span className={card.trend === "up" ? "text-green-500" : "text-red-500"}>
                  {card.change}
                </span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
            <CardFooter className="p-2">
              <Button variant="ghost" size="sm" asChild className="w-full">
                <Link to={card.link}>
                  <span>View details</span>
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="analytics" className="mt-6">
        <TabsList>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="content">Content Management</TabsTrigger>
        </TabsList>
        <TabsContent value="analytics" className="mt-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Website Visitors</CardTitle>
                  <Tabs defaultValue={timeRange} onValueChange={setTimeRange}>
                    <TabsList>
                      <TabsTrigger value="week">Week</TabsTrigger>
                      <TabsTrigger value="month">Month</TabsTrigger>
                      <TabsTrigger value="year">Year</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <CardDescription>Daily visitors to your portfolio</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[200px] w-full">
                  {/* Placeholder for chart - replace with actual implementation */}
                  <div className="flex items-center justify-center h-full bg-muted/50 rounded-md">
                    Visitor Chart - Bar Chart Component
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Project Views</CardTitle>
                <CardDescription>Most viewed portfolio projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full">
                  {/* Placeholder for chart - replace with actual implementation */}
                  <div className="flex items-center justify-center h-full bg-muted/50 rounded-md">
                    Project Views - Pie Chart Component
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
                <CardDescription>Contact form submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full">
                  {/* Placeholder for chart - replace with actual implementation */}
                  <div className="flex items-center justify-center h-full bg-muted/50 rounded-md">
                    Messages - Line Chart Component
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" asChild>
                  <Link to="/admin/messages">View all messages</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Website Stats</CardTitle>
                <CardDescription>Portfolio performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="flex flex-col border rounded-md p-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Unique Visitors</span>
                    </div>
                    <div className="mt-2">
                      <div className="text-2xl font-bold">1,247</div>
                      <div className="flex items-center pt-1 text-xs text-muted-foreground">
                        <ArrowUp className="h-3 w-3 mr-1 text-green-500" />
                        <span className="text-green-500">12%</span>
                        <span className="ml-1">from last month</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col border rounded-md p-4">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Total Page Views</span>
                    </div>
                    <div className="mt-2">
                      <div className="text-2xl font-bold">3,872</div>
                      <div className="flex items-center pt-1 text-xs text-muted-foreground">
                        <ArrowUp className="h-3 w-3 mr-1 text-green-500" />
                        <span className="text-green-500">8%</span>
                        <span className="ml-1">from last month</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col border rounded-md p-4">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Contact Rate</span>
                    </div>
                    <div className="mt-2">
                      <div className="text-2xl font-bold">5.2%</div>
                      <div className="flex items-center pt-1 text-xs text-muted-foreground">
                        <ArrowUp className="h-3 w-3 mr-1 text-green-500" />
                        <span className="text-green-500">2%</span>
                        <span className="ml-1">from last month</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="content" className="mt-4">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Projects</CardTitle>
                <CardDescription>Manage your portfolio projects</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">E-commerce Platform</span>
                    <Badge>Published</Badge>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Finance Dashboard</span>
                    <Badge>Published</Badge>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">Social Media App</span>
                    <Badge variant="outline">Draft</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link to="/admin/projects">Manage Projects</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
                <CardDescription>Update your professional skills</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Frontend Development</span>
                    <span className="text-muted-foreground">4 skills</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Backend Development</span>
                    <span className="text-muted-foreground">4 skills</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">Other Skills</span>
                    <span className="text-muted-foreground">4 skills</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link to="/admin/skills">Manage Skills</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Personal Bio</span>
                    <span className="text-muted-foreground">Updated 2 weeks ago</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Experience</span>
                    <span className="text-muted-foreground">Updated 1 month ago</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">Education</span>
                    <span className="text-muted-foreground">Updated 1 month ago</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link to="/admin/about">Edit About</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Testimonials</CardTitle>
                <CardDescription>Client and colleague reviews</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Alex Johnson</span>
                    <Badge>Published</Badge>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Sarah Chen</span>
                    <Badge>Published</Badge>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">Michael Torres</span>
                    <Badge>Published</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link to="/admin/testimonials">Manage Testimonials</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>Contact form submissions</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">John Smith</span>
                    <Badge variant="secondary">New</Badge>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Emma Watson</span>
                    <Badge variant="secondary">New</Badge>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">Robert Brown</span>
                    <Badge variant="outline">Read</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link to="/admin/messages">View Messages</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Customize your portfolio</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Theme Customization</span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      Default Theme
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">SEO Settings</span>
                    <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">
                      Optimized
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">Site Structure</span>
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                      Default
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link to="/admin/settings">Manage Settings</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Dashboard;
