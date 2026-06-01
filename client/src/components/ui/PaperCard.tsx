import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";

interface PaperCardProps {
  children: ReactNode;
  customClass?: string;
}

export default function PaperCard({ children, customClass = "" }: PaperCardProps) {
  const { theme } = useTheme();
  
  return (
    <motion.div 
      className={`paper p-8 rounded-lg shadow-md bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 transition-colors duration-300 ${customClass}`}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      whileHover={{ 
        boxShadow: theme === 'dark' 
          ? "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)" 
          : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        translateY: -5,
        transition: { 
          duration: 0.3,
          ease: "easeOut"
        }
      }}
    >
      {children}
    </motion.div>
  );
}
