
import { useState } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/components/theme-provider";

const SettingsPage = () => {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  
  const [settings, setSettings] = useState({
    siteTitle: "Portfolio CMS",
    siteDescription: "A professional portfolio website with CMS capabilities",
    primaryColor: "#3B82F6",
    secondaryColor: "#10B981",
    accentColor: "#8B5CF6",
    fontHeading: "Playfair Display",
    fontBody: "Inter",
    showHero: true,
    showAbout: true,
    showProjects: true,
    showSkills: true,
    showTestimonials: true,
    showContact: true,
    customCss: "",
    metaTitle: "Portfolio CMS | Professional Web Developer",
    metaDescription: "Portfolio showcasing web development projects, skills, and services.",
    metaKeywords: "portfolio, web development, react, typescript, developer",
    ogImage: "https://example.com/og-image.jpg",
  });
  
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your portfolio settings have been updated successfully.",
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: value,
    });
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setSettings({
      ...settings,
      [name]: checked,
    });
  };
  
  return (
    <DashboardLayout
      title="Settings"
      description="Customize your portfolio website"
    >
      <Tabs defaultValue="appearance">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="sections">Page Sections</TabsTrigger>
          <TabsTrigger value="seo">SEO & Metadata</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General</CardTitle>
              <CardDescription>
                Update your site's basic information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="siteTitle">Site Title</Label>
                <Input 
                  id="siteTitle" 
                  name="siteTitle"
                  value={settings.siteTitle} 
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea 
                  id="siteDescription" 
                  name="siteDescription"
                  value={settings.siteDescription} 
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>
                Customize your portfolio's appearance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Mode</h3>
                <div className="flex gap-4">
                  <div
                    className={`flex flex-col items-center gap-2 cursor-pointer rounded-md p-2 border ${
                      theme === "light" ? "border-primary" : "border-border"
                    }`}
                    onClick={() => setTheme("light")}
                  >
                    <div className="w-20 h-20 bg-background rounded-md border"></div>
                    <span>Light</span>
                  </div>
                  <div
                    className={`flex flex-col items-center gap-2 cursor-pointer rounded-md p-2 border ${
                      theme === "dark" ? "border-primary" : "border-border"
                    }`}
                    onClick={() => setTheme("dark")}
                  >
                    <div className="w-20 h-20 bg-black rounded-md border border-gray-700"></div>
                    <span>Dark</span>
                  </div>
                  <div
                    className={`flex flex-col items-center gap-2 cursor-pointer rounded-md p-2 border ${
                      theme === "system" ? "border-primary" : "border-border"
                    }`}
                    onClick={() => setTheme("system")}
                  >
                    <div className="w-20 h-20 bg-gradient-to-r from-white to-gray-900 rounded-md border"></div>
                    <span>System</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Colors</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="primaryColor"
                        name="primaryColor"
                        type="color"
                        value={settings.primaryColor}
                        onChange={handleInputChange}
                        className="w-10 h-10 p-1"
                      />
                      <Input
                        value={settings.primaryColor}
                        name="primaryColor"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="secondaryColor"
                        name="secondaryColor"
                        type="color"
                        value={settings.secondaryColor}
                        onChange={handleInputChange}
                        className="w-10 h-10 p-1"
                      />
                      <Input
                        value={settings.secondaryColor}
                        name="secondaryColor"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="accentColor">Accent Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="accentColor"
                        name="accentColor"
                        type="color"
                        value={settings.accentColor}
                        onChange={handleInputChange}
                        className="w-10 h-10 p-1"
                      />
                      <Input
                        value={settings.accentColor}
                        name="accentColor"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Typography</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="fontHeading">Heading Font</Label>
                    <select
                      id="fontHeading"
                      name="fontHeading"
                      value={settings.fontHeading}
                      onChange={handleInputChange as any}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    >
                      <option value="Playfair Display">Playfair Display</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Montserrat">Montserrat</option>
                      <option value="Lato">Lato</option>
                      <option value="Poppins">Poppins</option>
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="fontBody">Body Font</Label>
                    <select
                      id="fontBody"
                      name="fontBody"
                      value={settings.fontBody}
                      onChange={handleInputChange as any}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    >
                      <option value="Inter">Inter</option>
                      <option value="Open Sans">Open Sans</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Lato">Lato</option>
                      <option value="Poppins">Poppins</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <Button onClick={handleSave}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sections" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Page Sections</CardTitle>
              <CardDescription>
                Control which sections appear on your portfolio
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="showHero">Hero Section</Label>
                    <p className="text-sm text-muted-foreground">
                      The main landing section of your portfolio
                    </p>
                  </div>
                  <Switch
                    id="showHero"
                    checked={settings.showHero}
                    onCheckedChange={(checked) => handleSwitchChange("showHero", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="showAbout">About Section</Label>
                    <p className="text-sm text-muted-foreground">
                      Your bio and personal information
                    </p>
                  </div>
                  <Switch
                    id="showAbout"
                    checked={settings.showAbout}
                    onCheckedChange={(checked) => handleSwitchChange("showAbout", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="showProjects">Projects Section</Label>
                    <p className="text-sm text-muted-foreground">
                      Showcase of your portfolio projects
                    </p>
                  </div>
                  <Switch
                    id="showProjects"
                    checked={settings.showProjects}
                    onCheckedChange={(checked) => handleSwitchChange("showProjects", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="showSkills">Skills Section</Label>
                    <p className="text-sm text-muted-foreground">
                      Display of your professional skills
                    </p>
                  </div>
                  <Switch
                    id="showSkills"
                    checked={settings.showSkills}
                    onCheckedChange={(checked) => handleSwitchChange("showSkills", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="showTestimonials">Testimonials Section</Label>
                    <p className="text-sm text-muted-foreground">
                      Feedback from clients and colleagues
                    </p>
                  </div>
                  <Switch
                    id="showTestimonials"
                    checked={settings.showTestimonials}
                    onCheckedChange={(checked) => handleSwitchChange("showTestimonials", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="showContact">Contact Section</Label>
                    <p className="text-sm text-muted-foreground">
                      Contact form and information
                    </p>
                  </div>
                  <Switch
                    id="showContact"
                    checked={settings.showContact}
                    onCheckedChange={(checked) => handleSwitchChange("showContact", checked)}
                  />
                </div>
              </div>
              
              <Button onClick={handleSave} className="mt-6">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>
                Optimize your portfolio for search engines
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  name="metaTitle"
                  value={settings.metaTitle}
                  onChange={handleInputChange}
                />
                <p className="text-xs text-muted-foreground">
                  Recommended: 50-60 characters
                </p>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  name="metaDescription"
                  value={settings.metaDescription}
                  onChange={handleInputChange}
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  Recommended: 150-160 characters
                </p>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="metaKeywords">Meta Keywords</Label>
                <Input
                  id="metaKeywords"
                  name="metaKeywords"
                  value={settings.metaKeywords}
                  onChange={handleInputChange}
                />
                <p className="text-xs text-muted-foreground">
                  Comma-separated keywords
                </p>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="ogImage">Social Media Image</Label>
                <Input
                  id="ogImage"
                  name="ogImage"
                  value={settings.ogImage}
                  onChange={handleInputChange}
                />
                <p className="text-xs text-muted-foreground">
                  Recommended size: 1200x630px
                </p>
              </div>
              
              <Button onClick={handleSave}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Custom CSS</CardTitle>
              <CardDescription>
                Add custom CSS styles to your portfolio
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="customCss">CSS Code</Label>
                <Textarea
                  id="customCss"
                  name="customCss"
                  value={settings.customCss}
                  onChange={handleInputChange}
                  rows={10}
                  className="font-mono"
                />
              </div>
              
              <Button onClick={handleSave}>Save Changes</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Export/Import</CardTitle>
              <CardDescription>
                Export or import your portfolio settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" onClick={() => {
                  toast({
                    title: "Settings exported",
                    description: "Your settings have been exported to a JSON file.",
                  });
                }}>
                  Export Settings
                </Button>
                <Button variant="outline">Import Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default SettingsPage;
