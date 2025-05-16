
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import AdminProjects from "./pages/admin/Projects";
import AdminSkills from "./pages/admin/Skills";
import AdminTestimonials from "./pages/admin/Testimonials";
import AdminSettings from "./pages/admin/Settings";
import AdminMessages from "./pages/admin/Messages";
import AdminAbout from "./pages/admin/About";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin/projects" element={<AdminProjects />} />
            <Route path="/admin/skills" element={<AdminSkills />} />
            <Route path="/admin/testimonials" element={<AdminTestimonials />} />
            <Route path="/admin/messages" element={<AdminMessages />} />
            <Route path="/admin/about" element={<AdminAbout />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin" element={<Navigate to="/admin/projects" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
