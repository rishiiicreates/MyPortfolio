import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";

interface SkillBarProps {
  name: string;
  percentage: number;
}

export default function SkillBar({ name, percentage }: SkillBarProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();
  
  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  return (
    <div ref={ref}>
      <div className="flex justify-between mb-2">
        <motion.span 
          className="font-doodle font-semibold text-gray-900 dark:text-white"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {name}
        </motion.span>
        <motion.span 
          className="font-doodle font-medium text-gray-800 dark:text-gray-200"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {percentage}%
        </motion.span>
      </div>
      <div className="h-[12px] rounded-full bg-gray-200 dark:bg-gray-700 shadow-inner overflow-hidden relative border border-gray-300 dark:border-gray-600">
        <motion.div 
          className={`h-full rounded-full bg-gradient-to-r ${
            theme === 'dark' 
              ? 'from-teal-500 via-blue-500 to-indigo-500 shadow-[0_0_12px_rgba(79,209,197,0.9)]' 
              : 'from-teal-400 via-blue-400 to-indigo-400 shadow-[0_0_10px_rgba(79,209,197,0.6)]'
          }`}
          initial={{ width: 0 }}
          animate={isVisible ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ 
            width: { duration: 1, ease: "easeInOut", delay: 0.3 },
          }}
          whileHover={{ 
            boxShadow: theme === 'dark' 
              ? '0 0 15px rgba(79,209,197,1)' 
              : '0 0 12px rgba(79,209,197,0.8)',
            scale: 1.01,
            transition: { duration: 0.2 }
          }}
        />
      </div>
    </div>
  );
}
