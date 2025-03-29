import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Chatbot from "@/components/chatbot/Chatbot";
import TipOfTheDay from "@/components/ui/TipOfTheDay";
import { ThemeProvider } from "@/hooks/use-theme";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { PageLoader } from "@/components/ui/loaders";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

// Page transition effect
const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate initial page loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Show loader for 2.5 seconds
    
    return () => clearTimeout(timer);
  }, []);

  // Randomly select a mascot for the page loader
  const mascotTypes = ["coder", "rocket", "robot", "paperPlane"] as const;
  const randomMascot = mascotTypes[Math.floor(Math.random() * mascotTypes.length)];
  
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        {/* Page loading animation */}
        <PageLoader 
          isLoading={isLoading} 
          message="Preparing something awesome..." 
          mascotType={randomMascot}
        />
        
        <div className="relative">
          <AnimatePresence mode="wait">
            {!isLoading && (
              <motion.div
                key="app-container"
                initial="initial"
                animate="in"
                exit="exit"
                variants={pageVariants}
                className="min-h-screen dark:bg-gray-900 transition-colors duration-300"
              >
                <Router />
                <Toaster />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Always render the Chatbot outside any animation containers */}
          {!isLoading && <Chatbot />}
          
          {/* Tip of the Day widget */}
          {!isLoading && <TipOfTheDay position="bottom-left" />}
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
