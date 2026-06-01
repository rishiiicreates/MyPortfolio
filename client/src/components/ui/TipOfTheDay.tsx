import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/hooks/use-theme';
import { Lightbulb, X, Heart, ChevronLeft, ChevronRight } from 'lucide-react';

// Collection of programming tips
const programmingTips = [
  {
    tip: "Debugging is like being the detective in a crime movie where you're also the murderer.",
    category: "Debugging"
  },
  {
    tip: "A good variable name is worth a hundred comments.",
    category: "Clean Code"
  },
  {
    tip: "The best error message is the one that doesn't show up.",
    category: "User Experience"
  },
  {
    tip: "Code refactoring is like cleaning your room - it seems unnecessary until you can't find anything.",
    category: "Refactoring"
  },
  {
    tip: "Always code as if the person who will maintain your code is a violent psychopath who knows where you live.",
    category: "Maintainability"
  },
  {
    tip: "You're not done when it works, you're done when it's clear.",
    category: "Code Quality"
  },
  {
    tip: "Sometimes the best way to solve a problem is to take a break from it.",
    category: "Problem Solving"
  },
  {
    tip: "Version control is like insurance - you won't appreciate it until things go wrong.",
    category: "Git"
  },
  {
    tip: "The more time spent planning, the less time spent debugging.",
    category: "Planning"
  },
  {
    tip: "Code is like humor. When you have to explain it, it's bad.",
    category: "Readability"
  },
  {
    tip: "AI is cool I guess, but good variable names are cooler.",
    category: "AI"
  },
  {
    tip: "Writing documentation is like sending a letter to your future self.",
    category: "Documentation"
  },
  {
    tip: "The best code is the code not written - fewer lines, fewer bugs.",
    category: "Simplicity"
  },
  {
    tip: "It works on my machine' is not a valid test strategy.",
    category: "Testing"
  },
  {
    tip: "Programming is like writing a book - except if you miss a single comma the whole book makes no sense.",
    category: "Syntax"
  }
];

interface TipOfTheDayProps {
  className?: string;
  position?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
  theme?: 'light' | 'dark' | 'auto';
}

export default function TipOfTheDay({ 
  className = '', 
  position = 'bottom-right',
  theme: propTheme = 'auto'
}: TipOfTheDayProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isLiked, setIsLiked] = useState<boolean[]>(Array(programmingTips.length).fill(false));
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const { theme: systemTheme } = useTheme();
  
  // Determine the actual theme to use
  const actualTheme = propTheme === 'auto' ? systemTheme : propTheme;
  
  // Get a random tip on first render and when day changes
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * programmingTips.length);
    setCurrentTipIndex(randomIndex);
    
    // Check for likes in localStorage
    const savedLikes = localStorage.getItem('tipLikes');
    if (savedLikes) {
      setIsLiked(JSON.parse(savedLikes));
    }
    
    // Check if the widget should be collapsed by default
    const collapsedState = localStorage.getItem('tipCollapsed');
    if (collapsedState) {
      setIsCollapsed(JSON.parse(collapsedState));
    }

    // Set up scroll listener to detect when user scrolls to footer
    const handleScroll = () => {
      const footerElement = document.getElementById('footer');
      if (footerElement) {
        const footerPosition = footerElement.getBoundingClientRect();
        // Show tip when footer is in view or close to being in view
        setShowTip(footerPosition.top <= window.innerHeight + 100);
      }
    };

    // Initial check on mount
    handleScroll();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup scroll listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Save likes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tipLikes', JSON.stringify(isLiked));
  }, [isLiked]);
  
  // Save collapsed state to localStorage
  useEffect(() => {
    localStorage.setItem('tipCollapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);
  
  const nextTip = () => {
    setCurrentTipIndex((prevIndex) => (prevIndex + 1) % programmingTips.length);
  };
  
  const prevTip = () => {
    setCurrentTipIndex((prevIndex) => 
      prevIndex === 0 ? programmingTips.length - 1 : prevIndex - 1
    );
  };
  
  const toggleLike = () => {
    setIsLiked((prevLikes) => {
      const newLikes = [...prevLikes];
      newLikes[currentTipIndex] = !newLikes[currentTipIndex];
      return newLikes;
    });
  };
  
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  // Map position prop to CSS classes
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'bottom-right': 'bottom-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-left': 'bottom-20 left-4' // Increased bottom margin to ensure it's above the footer
  };
  
  // Don't render if explicitly closed by user or if not scrolled to footer yet
  if (!isVisible || !showTip) return null;
  
  const currentTip = programmingTips[currentTipIndex];
  
  return (
    <div className={`fixed ${positionClasses[position]} z-[1000] ${className}`}>
      <AnimatePresence>
        {!isCollapsed ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className={`paper w-72 rounded-lg shadow-lg overflow-hidden border-2 ${
              actualTheme === 'dark' 
                ? 'bg-gray-800/90 border-gray-700 text-white backdrop-blur-sm' 
                : 'bg-white/90 border-gray-200 text-gray-800 backdrop-blur-sm'
            }`}
          >
            {/* Header */}
            <div className={`px-4 py-2 flex justify-between items-center border-b ${
              actualTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                <h3 className="font-doodle font-semibold text-sm">Tip of the Day</h3>
              </div>
              <div className="flex gap-1">
                <button 
                  onClick={toggleCollapse}
                  className={`p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
                  aria-label="Collapse tip"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsVisible(false)}
                  className={`p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
                  aria-label="Close tip"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-4">
              <div 
                className="min-h-[80px] flex items-center mb-2 font-doodle"
              >
                <p className="text-sm">{currentTip.tip}</p>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  actualTheme === 'dark' 
                    ? 'bg-gray-700 text-gray-300' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {currentTip.category}
                </span>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={toggleLike}
                    className={`p-1 rounded-full transition-colors ${
                      isLiked[currentTipIndex] ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                    }`}
                    aria-label={isLiked[currentTipIndex] ? "Unlike" : "Like"}
                  >
                    <Heart className="w-4 h-4" fill={isLiked[currentTipIndex] ? "currentColor" : "none"} />
                  </button>
                  <div className="flex gap-1">
                    <button 
                      onClick={prevTip}
                      className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      aria-label="Previous tip"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={nextTip}
                      className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      aria-label="Next tip"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleCollapse}
            className={`rounded-full p-3 shadow-lg ${
              actualTheme === 'dark' 
                ? 'bg-gray-800 text-amber-500' 
                : 'bg-white text-amber-500'
            }`}
            aria-label="Show tip of the day"
          >
            <Lightbulb className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}