import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useLocation } from "wouter";

import Magnetic from "@/components/Magnetic";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isBottom, setIsBottom] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Check if near bottom to hide fixed elements that clash with footer
      const isNearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 150;
      setIsBottom(isNearBottom);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { title: "Home", href: "/" },
    { title: "Work", href: "/#projects" },
    { title: "About", href: "/about" },
    { title: "Experience", href: "/experience" },
    { title: "Contact", href: "/contact" }
  ];

  return (
    <>
      {/* Fixed Desktop Frame Elements */}
      <div className="fixed top-0 left-0 w-full z-[60] px-6 md:px-12 py-6 md:py-8 flex justify-between items-start pointer-events-none mix-blend-difference text-white">
        <Magnetic>
          <a href="#" className="pointer-events-auto group block">
            <span className="font-display font-bold text-2xl md:text-3xl tracking-tighter uppercase">
              Hrishikesh<span className="text-accent">.</span>
            </span>
          </a>
        </Magnetic>

        <Magnetic>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="pointer-events-auto group flex items-center gap-2"
          >
            <span className="hidden md:block font-mono text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {isOpen ? "Close" : "Menu"}
            </span>
            <div className="w-10 h-10 md:w-12 md:h-12 border border-current rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-90">
              {isOpen ? <X size={20} /> : <Plus size={20} />}
            </div>
          </button>
        </Magnetic>
      </div>

      {/* Bottom Frame Elements (Desktop Only) */}
      <div className={`fixed bottom-0 left-0 w-full z-40 px-6 md:px-12 py-6 md:py-8 justify-between items-end hidden md:flex pointer-events-none mix-blend-difference text-white transition-opacity duration-300 ${isBottom ? 'opacity-0' : 'opacity-100'}`}>
        <span className="font-mono text-xs uppercase tracking-widest">
          AI Product Engineer
        </span>
        <span className="font-mono text-xs uppercase tracking-widest">
          ©{new Date().getFullYear()}
        </span>
      </div>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Side Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-full md:w-[40%] bg-accent z-50 flex flex-col justify-center items-center shadow-2xl"
            >
              <div className="flex flex-col gap-6 md:gap-8 items-center text-center">
                {menuItems.map((item, index) => (
                  <Magnetic key={index}>
                    <motion.a
                      href={item.href}
                      onClick={(e) => {
                        if (item.href.startsWith("/#")) {
                          // Let default behavior handle hash links if on same page
                          // but if we are on another page, we should navigate to home first
                          if (window.location.pathname !== "/") {
                            e.preventDefault();
                            window.location.href = item.href; // Full reload to get to home and scroll
                          } else {
                            setIsOpen(false);
                          }
                        } else {
                          e.preventDefault();
                          setIsOpen(false);
                          window.history.pushState(null, '', item.href);
                          window.dispatchEvent(new Event('pushstate'));
                          // Or use wouter's setLocation:
                          setLocation(item.href);
                        }
                      }}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + (index * 0.1), duration: 0.5 }}
                      className="font-display font-bold text-5xl md:text-7xl text-background uppercase tracking-tight hover:text-black transition-colors cursor-pointer"
                    >
                      {item.title}
                    </motion.a>
                  </Magnetic>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-12 left-0 w-full text-center"
              >
                <span className="font-mono text-background/60 text-xs uppercase tracking-widest">
                  Based in India • Available Globally
                </span>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
