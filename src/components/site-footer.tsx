
import { Link } from "react-router-dom";

const SiteFooter = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="text-xl font-display font-bold mb-4 inline-block">
              Portfolio
            </Link>
            <p className="text-muted-foreground mt-2">
              A professional portfolio website with custom CMS capabilities.
              Showcase your work and skills with style.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/#hero" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/#about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="/#projects" className="text-muted-foreground hover:text-primary transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="/#skills" className="text-muted-foreground hover:text-primary transition-colors">
                  Skills
                </a>
              </li>
              <li>
                <a href="/#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <p className="text-muted-foreground mb-4">
              Follow me on social media or get in touch directly.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Twitter
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                GitHub
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            &copy; {currentYear} Portfolio CMS. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <Link to="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
