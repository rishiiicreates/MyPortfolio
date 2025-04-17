import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DoodlePath from "@/components/ui/DoodlePath";
import PaperCard from "@/components/ui/PaperCard";
import StrawHat from "@/assets/icons/StrawHat";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { textVariants, fadeInLeftVariants, fadeInRightVariants, staggerContainerEnhanced, floatingVariants } from "@/lib/animations";
import { Github, Twitter, Linkedin, Instagram, Coffee, Code, Sparkles, Zap, Gamepad, BookOpen, Search, X } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { findAnswer } from "./chatbot/ChatbotData";
import { apiRequest } from "@/lib/queryClient";

export default function About() {
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [headingRef, headingControls] = useScrollAnimation(0.2);
  const [leftColRef, leftColControls] = useScrollAnimation(0.1);
  const [rightColRef, rightColControls] = useScrollAnimation(0.1);
  const [timelineRef, timelineControls] = useScrollAnimation(0.1);
  const { theme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const toggleEasterEgg = () => {
    setEasterEggActive(true);
    setTimeout(() => setEasterEggActive(false), 5000);
  };
  
  // Close the search overlay when scrolling away from the About section
  useEffect(() => {
    if (!searchOpen) return;
    
    // Track both scroll position and section visibility
    const initialScrollY = window.scrollY;
    let lastCheckedY = initialScrollY;
    const scrollThreshold = 60; // Even more sensitive: Close after scrolling just 60px
    
    const handleScroll = () => {
      // Get current values
      if (!sectionRef.current) return;
      const currentScrollY = window.scrollY;
      const aboutRect = sectionRef.current.getBoundingClientRect();
      const aboutTop = aboutRect.top;
      const aboutBottom = aboutRect.bottom;
      const viewportHeight = window.innerHeight;
      
      // Calculate scroll changes
      const totalScrollChange = Math.abs(currentScrollY - initialScrollY);
      const incrementalChange = Math.abs(currentScrollY - lastCheckedY);
      
      // Enhanced conditions for closing the search overlay:
      // 1. About section begins to move out of optimal viewing area (more sensitive threshold)
      // 2. User has scrolled even a small amount from when they opened the search
      // 3. User is scrolling at any noticeable speed
      // 4. Total scroll distance exceeds fixed amount regardless of direction
      if (
        aboutTop > viewportHeight * 0.35 || // Decrease from 0.4 (close sooner when scrolling down)
        aboutBottom < viewportHeight * 0.35 || // Increase from 0.3 (close sooner when scrolling up)
        totalScrollChange > scrollThreshold ||
        incrementalChange > 35 || // Reduced from 50 (detect smaller movements)
        Math.abs(currentScrollY - initialScrollY) > 120 // Absolute scroll distance failsafe
      ) {
        setSearchOpen(false);
        setSearchQuery("");
        setSearchResult(null);
        setIsTyping(false);
      }
      
      // Update last checked position
      lastCheckedY = currentScrollY;
    };
    
    // Use passive: true for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [searchOpen]);
  
  // Also close the search overlay when navigating to other sections via clicks
  useEffect(() => {
    const handleNavClick = () => {
      if (searchOpen) {
        setSearchOpen(false);
        setSearchQuery("");
        setSearchResult(null);
        setIsTyping(false);
      }
    };
    
    // Add listeners to all navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
      link.addEventListener('click', handleNavClick);
    });
    
    return () => {
      navLinks.forEach(link => {
        link.removeEventListener('click', handleNavClick);
      });
    };
  }, [searchOpen]);
  
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsTyping(true);
    setSearchResult(null);
    
    try {
      // Add a brief delay to show the typing animation
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log("About: Sending query to chatbot API:", searchQuery);
      
      // Use a timeout to ensure we don't wait too long for a response
      const timeoutPromise = new Promise<{ success: boolean, message: string }>((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), 15000) // Extended timeout for OpenAI calls
      );
      
      // Try to get response from the API
      const fetchPromise = apiRequest<{ success: boolean, message: string }>("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: searchQuery }),
      });
      
      // Race the fetch against a timeout
      const response = await Promise.race([fetchPromise, timeoutPromise]);
      
      // If we got a response from the server, display it regardless of whether it came from OpenAI or predefined answers
      if (response && response.success) {
        console.log("About: Received successful response from chatbot API");
        setSearchResult(response.message);
      } else {
        console.warn("API responded with failure");
        // In the unlikely case the API responds with success:false, show a friendly error
        setSearchResult("I'm having trouble processing your request right now. Please try asking something about Hrishikesh's skills or projects instead.");
      }
    } catch (error) {
      console.error("Error getting chatbot response:", error);
      
      // Only use local fallback as a last resort if the server is completely unreachable
      setSearchResult("I'm having trouble connecting to my knowledge base. Please check your internet connection and try again, or ask something about Hrishikesh's projects or skills.");
    } finally {
      setIsTyping(false);
    }
  };

  // Timeline item animations with spring physics
  const itemVariants = {
    hidden: { opacity: 0, x: -20, scale: 0.95 },
    visible: (i: number) => ({ 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: i * 0.1 
      } 
    })
  };

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="py-20 relative overflow-hidden bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Background decorative elements */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-yellow-200 to-amber-300 dark:from-yellow-600/30 dark:to-amber-700/30 rounded-full opacity-30 blur-xl"></div>
      <div className="absolute bottom-10 right-0 w-60 h-60 bg-gradient-to-tr from-blue-200 to-indigo-300 dark:from-blue-600/30 dark:to-indigo-700/30 rounded-full opacity-40 transform translate-x-1/3 blur-xl"></div>
      
      {/* Animated floating particles */}
      <motion.div 
        className="absolute top-1/4 left-10 w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 dark:from-purple-500/60 dark:to-indigo-500/60 opacity-60 blur-sm"
        variants={floatingVariants}
        initial="initial"
        animate="animate"
        custom={{ yOffset: 30, duration: 6, scaleOffset: 0.1 }}
      />
      
      <motion.div 
        className="absolute bottom-1/3 right-10 w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-emerald-400 dark:from-teal-500/60 dark:to-emerald-500/60 opacity-60 blur-sm"
        variants={floatingVariants}
        initial="initial"
        animate="animate"
        custom={{ yOffset: 20, duration: 8, scaleOffset: 0.2 }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-between items-center mb-16">
          <motion.h2 
            ref={headingRef}
            className="text-4xl md:text-5xl font-doodle font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-teal-500 dark:from-blue-400 dark:via-purple-400 dark:to-teal-400"
            variants={textVariants}
            initial="hidden"
            animate={headingControls}
          >
            <span className="relative z-10 inline-block">
              About Me
              <motion.div 
                className="absolute -bottom-2 left-0 w-full" 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
              >
                <DoodlePath color="rgba(147, 51, 234, 0.7)" />
              </motion.div>
            </span>
          </motion.h2>
          
          {/* Search Button */}
          <motion.button
            className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 text-primary dark:text-blue-400 hidden md:flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSearchOpen(true)}
          >
            <Search size={18} />
            <span className="font-doodle">Ask me anything</span>
          </motion.button>
        </div>
        
        {/* Search Overlay */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-white dark:bg-gray-800 paper rounded-xl w-full max-w-2xl shadow-2xl p-6 relative border border-gray-100 dark:border-gray-700"
              >
                {/* Close Button */}
                <button 
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery("");
                    setSearchResult(null);
                    setIsTyping(false);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Close search"
                >
                  <X size={20} className="text-gray-500 dark:text-gray-400" />
                </button>
                
                <h3 className="text-2xl font-doodle font-bold text-gray-800 dark:text-gray-100 mb-6">Ask Hrishikesh</h3>
                
                {/* Search Input */}
                <div className="flex gap-2 mb-6">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && void handleSearch()}
                    placeholder="Ask me about my skills, experience, or interests..."
                    className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSearch}
                    disabled={!searchQuery.trim()}
                    className={`px-4 py-3 rounded-lg bg-primary dark:bg-blue-600 text-white font-doodle shadow-md hover:bg-primary/90 dark:hover:bg-blue-700 transition-colors ${
                      !searchQuery.trim() ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    Ask
                  </motion.button>
                </div>
                
                {/* Results Area */}
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 min-h-[200px] relative">
                  {!searchResult && !isTyping && (
                    <div className="text-center text-gray-600 dark:text-gray-300 font-doodle mt-12">
                      <p>Ask me anything about Hrishikesh!</p>
                      <p className="text-sm mt-2">Try questions about skills, experience, or interests</p>
                    </div>
                  )}
                  
                  {isTyping && (
                    <div className="flex justify-start mt-4">
                      <div className="max-w-[90%] p-4 rounded-xl bg-white dark:bg-gray-700 shadow-md">
                        <div className="flex space-x-2 items-center h-6">
                          <div className="w-2 h-2 bg-primary/60 dark:bg-blue-500/60 rounded-full animate-bounce delay-75"></div>
                          <div className="w-2 h-2 bg-primary/60 dark:bg-blue-500/60 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-primary/60 dark:bg-blue-500/60 rounded-full animate-bounce delay-150"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {searchResult && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-doodle text-gray-900 dark:text-white leading-relaxed"
                    >
                      {searchResult}
                    </motion.div>
                  )}
                </div>
                
                {/* Suggested Questions */}
                <div className="mt-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 font-doodle">Try asking about:</p>
                  <div className="flex flex-wrap gap-2">
                    {["Web 3.0", "AI", "App Development", "Design Skills", "Contact Info"].map((topic) => (
                      <button
                        key={topic}
                        onClick={() => {
                          setSearchQuery(`Tell me about your ${topic.toLowerCase()}`);
                          setTimeout(() => {
                            void handleSearch();
                          }, 100);
                        }}
                        className="text-xs py-1 px-3 rounded-full border border-primary dark:border-blue-500 text-primary dark:text-blue-400 hover:bg-primary hover:text-white dark:hover:bg-blue-600 transition-colors flex items-center gap-1 font-doodle"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="flex flex-col md:flex-row items-stretch gap-10">
          <motion.div 
            ref={leftColRef}
            className="md:w-1/2"
            variants={fadeInLeftVariants}
            initial="hidden"
            animate={leftColControls}
          >
            <PaperCard customClass="h-full transform transition-transform duration-500 hover:-rotate-1 hover:shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-dashed border-blue-100 dark:border-blue-900">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
              >
                <p className="font-doodle text-lg mb-6 text-gray-800 dark:text-gray-100">
                  Hey there! 👋 I'm <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 relative inline-block">
                    Hrishikesh
                    <motion.span 
                      className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-400/50 to-indigo-400/50 dark:from-blue-500/50 dark:to-indigo-500/50" 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.6, duration: 0.4 }}
                    />
                  </span>, the guy who teaches machines to think, designs systems that speak, and turns raw data into digital sorcery.
                </p>
                
                <p className="font-doodle text-lg mb-6 text-gray-800 dark:text-gray-100">
                  I build for reactions rather than className="font-semibold text-pink-600 dark:text-pink-300">screen. </span> Whether it's a interface or machine learning model, I craft with intention-where every detail has a role, and every <span className="font-semibold text-teal-600 dark:text-teal-300">line of code</span> tells the system something new.
                </p>
                
                <p className="font-doodle text-lg relative text-gray-800 dark:text-gray-100">
                  When I'm not coding, you might find me sketching, watching One Piece
                  <motion.span 
                    className="inline-block cursor-pointer text-primary dark:text-primary-foreground ml-1"
                    onClick={toggleEasterEgg}
                    whileHover={{ 
                      rotate: [0, -10, 10, -10, 0],
                      scale: 1.2,
                      transition: { duration: 0.6 } 
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <StrawHat className="w-5 h-5 inline" />
                  </motion.span>, or exploring the outdoors for inspiration.
                </p>
                
                {/* Easter Egg */}
                <motion.div 
                  className={`easter-egg mt-6 p-5 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/30 dark:to-amber-900/30 rounded-lg border-2 border-dashed border-yellow-400 dark:border-yellow-600 overflow-hidden ${easterEggActive ? 'block' : 'hidden'}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={easterEggActive ? 
                    { height: 'auto', opacity: 1 } : 
                    { height: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <p className="font-doodle text-center text-lg text-amber-800 dark:text-amber-300 font-semibold">
                    "I'm going to be King of the Pirates!" - Monkey D. Luffy
                  </p>
                  <div className="text-center mt-3">
                    <motion.span 
                      className="inline-block text-3xl"
                      animate={{ 
                        y: [0, -15, 0],
                        rotate: [0, 5, 0, -5, 0]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                    >
                      🏴‍☠️
                    </motion.span>
                  </div>
                </motion.div>
              </motion.div>
            </PaperCard>
          </motion.div>
          
          <motion.div 
            ref={rightColRef}
            className="md:w-1/2"
            variants={fadeInRightVariants}
            initial="hidden"
            animate={rightColControls}
          >
            <PaperCard customClass="h-full transform transition-transform duration-500 hover:rotate-1 hover:shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-dashed border-teal-100 dark:border-teal-900">
              <h3 className="font-doodle text-2xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-emerald-500 dark:from-teal-400 dark:to-emerald-400 relative inline-block">
                My Journey
                <motion.div 
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-teal-300 to-emerald-300 dark:from-teal-600 dark:to-emerald-600" 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                />
              </h3>
              
              {/* Timeline */}
              <motion.div 
                ref={timelineRef}
                className="relative border-l-2 border-dashed border-teal-400 dark:border-teal-600 pl-8 ml-6"
                variants={staggerContainerEnhanced}
                initial="hidden"
                animate={timelineControls}
              >
                {/* Timeline Items using custom variants with spring physics */}
                {[
                  { 
                    title: "Started Coding", 
                    description: "Found out the web listens when you speak its language.",
                    color: "blue"
                  },
                  { 
                    title: "Studied Design", 
                    description: "Learned that function. without form is only half the story.",
                    color: "amber"
                  },
                  { 
                    title: "Dove into AI/ML", 
                    description: "Discovered how wild it is to teach machines to learn like we do-and sometime, better.",
                    color: "emerald"
                  },
                  { 
                    title: "Present Day", 
                    description: "Balancing both worlds-building for intelligence, designing for emotion, and forever learning.",
                    color: "violet"
                  }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    className="mb-10 relative last:mb-0"
                    custom={i} 
                    variants={itemVariants}
                  >
                    <motion.div 
                      className={`absolute -left-10 mt-1.5 w-6 h-6 rounded-full bg-gradient-to-br from-${item.color}-400 to-${item.color}-600 dark:from-${item.color}-500 dark:to-${item.color}-700 border-4 border-white dark:border-gray-700 shadow-md`}
                      whileHover={{ 
                        scale: 1.2,
                        boxShadow: theme === 'dark' ? "0 0 0 3px rgba(75,85,99,0.5)" : "0 0 0 3px rgba(255,255,255,0.8)" 
                      }}
                    />
                    <motion.h4 
                      className={`font-doodle text-xl font-bold text-${item.color}-600 dark:text-${item.color}-400`}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {item.title}
                    </motion.h4>
                    <p className="font-doodle text-gray-800 dark:text-gray-200">{item.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </PaperCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
