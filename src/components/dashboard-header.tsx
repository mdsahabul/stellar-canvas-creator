
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Bell } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DashboardHeader = () => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
      <div className="flex flex-1 items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2">
          <span className="text-lg font-bold">Portfolio Admin</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  3
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="flex items-center justify-between border-b px-4 py-2">
                <span className="font-semibold">Notifications</span>
                <Button variant="ghost" size="sm">Mark all as read</Button>
              </div>
              <div className="max-h-80 overflow-auto">
                <DropdownMenuItem className="cursor-pointer py-2">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm">New message from contact form</p>
                    <p className="text-xs text-muted-foreground">10 minutes ago</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer py-2">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm">Project "E-commerce Platform" updated</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer py-2">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm">New testimonial added</p>
                    <p className="text-xs text-muted-foreground">Yesterday</p>
                  </div>
                </DropdownMenuItem>
              </div>
              <div className="border-t p-2">
                <Button variant="ghost" className="w-full justify-center" asChild>
                  <Link to="/admin/messages">View all notifications</Link>
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <ThemeToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://i.pravatar.cc/150?img=8" alt="Admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline-block">Admin User</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link to="/admin/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Link to="/">View Site</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Link to="/login">Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
