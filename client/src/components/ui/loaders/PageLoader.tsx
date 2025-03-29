import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import MascotLoader from "./MascotLoader";
import { useTheme } from "@/hooks/use-theme";

interface PageLoaderProps {
  isLoading?: boolean;
  delay?: number;
  message?: string;
  mascotType?: "coder" | "rocket" | "robot" | "paperPlane";
}

export default function PageLoader({
  isLoading = true,
  delay = 800,
  message = "Loading awesome content...",
  mascotType = "coder"
}: PageLoaderProps) {
  const [show, setShow] = useState(isLoading);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShow(false);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setShow(true);
    }
  }, [isLoading, delay]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[2000] flex flex-col items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300"
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="relative"
          >
            {/* Paper background with folded corner */}
            <div className="relative bg-white dark:bg-gray-800 rounded-lg p-10 shadow-xl border-2 border-gray-100 dark:border-gray-700 transition-colors duration-300">
              {/* Folded corner effect */}
              <div className="absolute top-0 right-0 h-10 w-10 bg-gray-100 dark:bg-gray-700 transition-colors duration-300">
                <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[10px] border-r-[10px] border-white dark:border-gray-800 transition-colors duration-300"></div>
              </div>
              
              <MascotLoader type={mascotType} size="xl" message={message} />
              
              <motion.div 
                className="mt-8 flex space-x-3 justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className={`w-3 h-3 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-500'}`}
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </motion.div>
              
              <motion.p 
                className="mt-6 text-sm text-center text-gray-500 dark:text-gray-400 font-doodle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Made with <span className="text-red-500">❤️</span> and a bit of magic
              </motion.p>
            </div>
            
            {/* Decorative elements */}
            <motion.div 
              className="absolute -top-6 -left-6 w-12 h-12 text-primary dark:text-blue-400"
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, repeatType: "reverse" }
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-4 -right-4 w-10 h-10 text-primary dark:text-blue-400"
              animate={{ 
                rotate: -360,
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, repeatType: "reverse" }
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 17l-5-5m0 0l5-5m-5 5h12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}