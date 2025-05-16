
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  BookOpen,
  Code,
  Palette,
  MessageSquare,
  Settings,
  Star,
} from "lucide-react";

const DashboardSidebar = () => {
  const location = useLocation();
  
  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Projects",
      href: "/admin/projects",
      icon: Code,
    },
    {
      name: "Skills",
      href: "/admin/skills",
      icon: Star,
    },
    {
      name: "Testimonials",
      href: "/admin/testimonials",
      icon: MessageSquare,
    },
    {
      name: "About",
      href: "/admin/about",
      icon: BookOpen,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Palette,
    },
    {
      name: "Messages",
      href: "/admin/messages",
      icon: MessageSquare,
    },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r bg-background md:flex md:flex-col">
      <div className="flex flex-1 flex-col overflow-y-auto py-4">
        <div className="flex items-center justify-center h-16 px-6 border-b">
          <Link to="/dashboard" className="flex items-center gap-2">
            <span className="text-lg font-bold">Portfolio CMS</span>
          </Link>
        </div>
        <nav className="mt-6 px-3 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Button
                key={item.name}
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isActive && "bg-secondary"
                )}
                asChild
              >
                <Link to={item.href} className="flex items-center gap-3">
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              </Button>
            );
          })}
        </nav>
      </div>
      <div className="p-3 border-t">
        <Button
          variant="outline"
          className="w-full justify-start"
          asChild
        >
          <Link to="/" className="flex items-center gap-3">
            <Settings className="h-5 w-5" />
            View Website
          </Link>
        </Button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
