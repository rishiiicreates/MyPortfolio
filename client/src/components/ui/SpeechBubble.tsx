import { motion } from "framer-motion";
import { Testimonial } from "@/data/portfolioData";
import { useTheme } from "@/hooks/use-theme";

interface SpeechBubbleProps {
  testimonial: Testimonial;
  delay: number;
}

export default function SpeechBubble({ testimonial, delay }: SpeechBubbleProps) {
  const { theme } = useTheme();

  return (
    <div className="relative">
      {/* Speech Bubble */}
      <motion.div 
        className="paper p-6 rounded-lg relative mb-16 bg-white dark:bg-gray-800 shadow-md border-2 border-gray-100 dark:border-gray-700 transition-colors duration-300"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.6,
            delay,
          }
        }}
        animate={{ y: [0, -10, 0] }}
        transition={{ 
          y: {
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut",
            delay,
          }
        }}
        whileHover={{ 
          scale: 1.03, 
          boxShadow: theme === 'dark' 
            ? "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)" 
            : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
        viewport={{ once: true }}
      >
        {/* Triangle pointer */}
        <div className="absolute bottom-0 left-12 transform translate-y-1/2 rotate-45 w-4 h-4 bg-white dark:bg-gray-800 border-r-2 border-b-2 border-gray-100 dark:border-gray-700"></div>
        
        <p className="font-doodle italic mb-4 text-gray-800 dark:text-gray-100">"{testimonial.text}"</p>
        
        <p className="font-doodle font-bold text-primary dark:text-blue-400">- {testimonial.name}</p>
        <p className="font-doodle text-sm text-gray-700 dark:text-gray-300">{testimonial.role}</p>
      </motion.div>
      
      {/* Avatar */}
      <div className="flex items-center ml-6">
        <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-md bg-gradient-to-r from-primary/30 to-secondary/30 dark:from-blue-600/30 dark:to-indigo-600/30 flex items-center justify-center transition-colors duration-300">
          <span className="font-doodle text-xl text-primary dark:text-white">{testimonial.name.charAt(0)}</span>
        </div>
      </div>
    </div>
  );
}
