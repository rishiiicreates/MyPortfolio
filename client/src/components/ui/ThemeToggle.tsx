import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2 rounded-full bg-gradient-to-r from-blue-100 to-teal-100 dark:from-blue-900 dark:to-teal-900 shadow-md hover:shadow-lg transition-shadow"
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative w-14 h-7 bg-white dark:bg-gray-800 rounded-full shadow-inner overflow-hidden">
        {/* Track background with animated gradient */}
        <motion.div 
          className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-50/40 via-blue-100/40 to-teal-100/40 dark:from-blue-900/40 dark:via-purple-900/40 dark:to-teal-900/40"
          animate={{
            backgroundPosition: theme === 'dark' ? "100% 0%" : "0% 0%",
          }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Circle thumb */}
        <motion.div 
          className="absolute top-1 w-5 h-5 bg-gradient-to-br from-yellow-300 to-yellow-500 dark:from-blue-400 dark:to-purple-600 rounded-full shadow flex items-center justify-center"
          initial={false}
          animate={{
            left: theme === 'dark' ? "calc(100% - 1.5rem)" : "0.25rem",
            rotate: theme === 'dark' ? 360 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30
          }}
        >
          {theme === 'light' ? (
            <Sun className="w-3 h-3 text-yellow-50" />
          ) : (
            <Moon className="w-3 h-3 text-blue-50" />
          )}
        </motion.div>
        
        {/* Stars (visible in dark mode) */}
        {theme === 'dark' && (
          <>
            <motion.div
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
              style={{ top: '25%', left: '25%' }}
            />
            <motion.div
              className="absolute w-1.5 h-1.5 bg-white rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0.8, 1, 0.8] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.7 }}
              style={{ top: '60%', left: '35%' }}
            />
            <motion.div
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.2 }}
              style={{ top: '40%', left: '60%' }}
            />
          </>
        )}
        
        {/* Sun rays (visible in light mode) */}
        {theme === 'light' && (
          <>
            <motion.div
              className="absolute w-8 h-0.5 bg-yellow-100 rounded-full opacity-70"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ top: '40%', left: '60%', transform: 'rotate(30deg)' }}
            />
            <motion.div
              className="absolute w-6 h-0.5 bg-yellow-100 rounded-full opacity-70"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
              style={{ top: '60%', left: '70%', transform: 'rotate(-30deg)' }}
            />
          </>
        )}
      </div>
    </motion.button>
  );
}