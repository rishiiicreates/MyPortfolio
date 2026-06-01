import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import AboutPage from "@/pages/About";
import ExperiencePage from "@/pages/ExperiencePage";
import ContactPage from "@/pages/ContactPage";
import Chatbot from "@/components/chatbot/Chatbot";
import MusicPlayer from "@/components/MusicPlayer";
import { PORTFOLIO_TRACKS } from "@/data/tracks";
import { ThemeProvider } from "@/hooks/use-theme";
import { useState, useEffect } from "react";

import SmoothScroll from "@/components/SmoothScroll";
import OnekoFollower from "@/components/OnekoFollower";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={AboutPage} />
      <Route path="/experience" component={ExperiencePage} />
      <Route path="/contact" component={ContactPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

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
        {/* Global hidden YouTube player — persists across navigation */}
        <MusicPlayer tracks={PORTFOLIO_TRACKS} isGlobal={true} />

        {isLoading ? (
          <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm font-medium opacity-70 tracking-widest">LOADING SYSTEM...</p>
            </div>
          </div>
        ) : (
          <SmoothScroll>
            <div className="min-h-screen bg-background transition-colors duration-300">
              <OnekoFollower />
              <div className="noise-overlay" />
              <Router />
              <Toaster />
              {/* Embedded AI Assistant */}
              <Chatbot />
            </div>
          </SmoothScroll>
        )}

        {/* Floating music player UI — persists across navigation */}
        <MusicPlayer tracks={PORTFOLIO_TRACKS} isGlobal={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
