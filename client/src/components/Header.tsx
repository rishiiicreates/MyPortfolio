import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useTheme } from "@/hooks/use-theme";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 py-4 transition-all duration-300 ${
        scrolled 
          ? "bg-white dark:bg-gray-900 bg-opacity-80 dark:bg-opacity-80 backdrop-blur-md shadow-sm" 
          : "bg-white dark:bg-gray-900 bg-opacity-100 dark:bg-opacity-100"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="font-doodle text-2xl font-bold text-primary hover:text-secondary transition duration-300">
          <span className="inline-block animate-wobble">H</span>rishikesh
        </a>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#about" className="nav-link font-doodle text-lg hover:text-primary transition duration-300">About</a>
          <a href="#skills" className="nav-link font-doodle text-lg hover:text-primary transition duration-300">Skills</a>
          <a href="#projects" className="nav-link font-doodle text-lg hover:text-primary transition duration-300">Projects</a>
          <a href="#certificates" className="nav-link font-doodle text-lg hover:text-primary transition duration-300">Certificates</a>
          <a href="#contact" className="nav-link font-doodle text-lg hover:text-primary transition duration-300">Contact</a>
          <ThemeToggle />
        </nav>
        
        <div className="flex items-center md:hidden space-x-4">
          <ThemeToggle />
          <button 
            className="text-primary dark:text-primary-foreground text-2xl" 
            onClick={toggleMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden bg-white dark:bg-gray-900 absolute w-full shadow-md transition-all duration-300 ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="container mx-auto py-4 px-4 flex flex-col space-y-4">
          <a 
            href="#about" 
            className="font-doodle text-lg hover:text-primary transition duration-300"
            onClick={closeMenu}
          >
            About
          </a>
          <a 
            href="#skills" 
            className="font-doodle text-lg hover:text-primary transition duration-300"
            onClick={closeMenu}
          >
            Skills
          </a>
          <a 
            href="#projects" 
            className="font-doodle text-lg hover:text-primary transition duration-300"
            onClick={closeMenu}
          >
            Projects
          </a>
          <a 
            href="#certificates" 
            className="font-doodle text-lg hover:text-primary transition duration-300"
            onClick={closeMenu}
          >
            Certificates
          </a>
          <a 
            href="#contact" 
            className="font-doodle text-lg hover:text-primary transition duration-300"
            onClick={closeMenu}
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
}
