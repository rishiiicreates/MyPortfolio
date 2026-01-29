import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import AboutMe from "@/pages/AboutMe";
import Journey from "@/pages/Journey";
import Chatbot from "@/components/chatbot/Chatbot";
import { ThemeProvider } from "@/hooks/use-theme";
import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={AboutMe} />
      <Route path="/journey" component={Journey} />
      <Route component={NotFound} />
    </Switch>
  );
}

import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Quick minimal loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Shorter load time

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>

        {isLoading ? (
          <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm font-medium opacity-70 tracking-widest">LOADING SYSTEM...</p>
            </div>
          </div>
        ) : (
          <SmoothScroll>
            <div className="min-h-screen bg-background transition-colors duration-300 cursor-none">
              <CustomCursor />
              <div className="noise-overlay" />
              <Router />
              <Toaster />
              {/* Embedded AI Assistant */}
              <Chatbot />
              <Analytics />
            </div>
          </SmoothScroll>
        )}
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
