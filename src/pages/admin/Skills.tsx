
import DashboardLayout from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

const SkillsPage = () => {
  return (
    <DashboardLayout
      title="Skills"
      description="Manage your professional skills"
    >
      <div className="grid gap-6">
        <div className="flex justify-end">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Skill
          </Button>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Frontend Development</CardTitle>
            <CardDescription>
              Skills related to frontend web development
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">React</span>
                  <span>90%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "90%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">TypeScript</span>
                  <span>85%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "85%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">HTML/CSS</span>
                  <span>95%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "95%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Tailwind CSS</span>
                  <span>85%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "85%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Edit Category</Button>
          </CardFooter>
        </Card>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Backend Development</CardTitle>
            <CardDescription>
              Skills related to backend development
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Node.js</span>
                  <span>80%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "80%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Express</span>
                  <span>75%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "75%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">PostgreSQL</span>
                  <span>70%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "70%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Supabase</span>
                  <span>80%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "80%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Edit Category</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Other Skills</CardTitle>
            <CardDescription>
              Additional professional skills
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Git</span>
                  <span>85%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "85%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Docker</span>
                  <span>65%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "65%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">UI/UX Design</span>
                  <span>75%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "75%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">AWS</span>
                  <span>65%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "65%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Edit Category</Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SkillsPage;
