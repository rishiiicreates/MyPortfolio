import { motion } from "framer-motion";
import MascotLoader from "./MascotLoader";

interface SectionLoaderProps {
  message?: string;
  mascotType?: "coder" | "rocket" | "robot" | "paperPlane";
  size?: "sm" | "md" | "lg";
}

export default function SectionLoader({
  message = "Loading...",
  mascotType = "rocket",
  size = "md"
}: SectionLoaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-10 w-full"
    >
      <div className="paper bg-white dark:bg-gray-800 rounded-lg p-5 shadow-md border border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <MascotLoader 
          type={mascotType} 
          size={size} 
          message={message} 
        />
      </div>
    </motion.div>
  );
}