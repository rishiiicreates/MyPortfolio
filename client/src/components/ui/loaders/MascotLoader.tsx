import { motion } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";
import { useState, useEffect } from "react";

type MascotType = "coder" | "rocket" | "robot" | "paperPlane";

interface MascotLoaderProps {
  type?: MascotType;
  size?: "sm" | "md" | "lg" | "xl";
  message?: string;
  inline?: boolean;
  autoHide?: boolean;
  hideDelay?: number;
}

export default function MascotLoader({
  type = "coder",
  size = "md",
  message = "Loading...",
  inline = false,
  autoHide = false,
  hideDelay = 3000,
}: MascotLoaderProps) {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(true);

  // Auto-hide functionality
  useEffect(() => {
    if (autoHide) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, hideDelay);
      return () => clearTimeout(timer);
    }
  }, [autoHide, hideDelay]);

  if (!visible) return null;

  // Size mappings
  const sizeMap = {
    sm: { width: 60, height: 60, text: "text-sm" },
    md: { width: 80, height: 80, text: "text-base" },
    lg: { width: 100, height: 100, text: "text-lg" },
    xl: { width: 120, height: 120, text: "text-xl" }
  };

  const { width, height, text } = sizeMap[size];
  
  // Container classes based on inline prop
  const containerClasses = inline 
    ? "inline-flex flex-col items-center justify-center gap-4" 
    : "flex flex-col items-center justify-center min-h-[200px] gap-4";

  // Render different mascot based on type
  const renderMascot = () => {
    switch (type) {
      case "coder":
        return <CoderMascot width={width} height={height} theme={theme} />;
      case "rocket":
        return <RocketMascot width={width} height={height} theme={theme} />;
      case "robot":
        return <RobotMascot width={width} height={height} theme={theme} />;
      case "paperPlane":
        return <PaperPlaneMascot width={width} height={height} theme={theme} />;
      default:
        return <CoderMascot width={width} height={height} theme={theme} />;
    }
  };

  return (
    <div className={containerClasses}>
      {renderMascot()}
      {message && (
        <motion.p 
          className={`font-doodle ${text} text-primary dark:text-blue-400 animate-pulse`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
}

// Coder mascot - a little coding character with floating code snippets
function CoderMascot({ width, height, theme }: { width: number; height: number; theme: string }) {
  const isDark = theme === 'dark';
  const primaryColor = isDark ? "#60A5FA" : "#3B82F6";
  const secondaryColor = isDark ? "#93C5FD" : "#60A5FA";
  const accentColor = isDark ? "#DBEAFE" : "#2563EB";
  
  const floatingCodeVariants = {
    animate: {
      y: [0, -10, 0],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        repeatType: "reverse" as const,
      }
    }
  };

  const characterVariants = {
    animate: {
      y: [0, -5, 0],
      rotate: [0, 2, 0, -2, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse" as const,
      }
    }
  };

  return (
    <motion.div 
      className="relative"
      style={{ width, height }}
      initial="initial"
      animate="animate"
    >
      {/* Floating code snippets */}
      <motion.div 
        className="absolute" 
        style={{ top: -20, left: 0 }}
        variants={floatingCodeVariants}
        custom={0}
      >
        <svg width="20" height="10" viewBox="0 0 20 10">
          <text x="0" y="8" fill={primaryColor} fontSize="8">{`{ }`}</text>
        </svg>
      </motion.div>
      
      <motion.div 
        className="absolute" 
        style={{ top: -15, right: 5 }}
        variants={floatingCodeVariants}
        custom={0.5}
      >
        <svg width="20" height="10" viewBox="0 0 20 10">
          <text x="0" y="8" fill={secondaryColor} fontSize="8">{`</>`}</text>
        </svg>
      </motion.div>
      
      <motion.div 
        className="absolute" 
        style={{ top: -10, right: -15 }}
        variants={floatingCodeVariants}
        custom={1}
      >
        <svg width="20" height="10" viewBox="0 0 20 10">
          <text x="0" y="8" fill={accentColor} fontSize="8">{`()`}</text>
        </svg>
      </motion.div>

      {/* Character body */}
      <motion.svg 
        width={width} 
        height={height} 
        viewBox="0 0 100 100"
        variants={characterVariants}
      >
        {/* Head */}
        <circle cx="50" cy="40" r="22" fill={isDark ? "#374151" : "#E5E7EB"} stroke={primaryColor} strokeWidth="2" />
        
        {/* Eyes */}
        <circle cx="42" cy="35" r="4" fill={primaryColor} />
        <circle cx="58" cy="35" r="4" fill={primaryColor} />
        
        {/* Glasses */}
        <rect x="35" y="31" width="14" height="8" rx="4" fill="none" stroke={accentColor} strokeWidth="1.5" />
        <rect x="51" y="31" width="14" height="8" rx="4" fill="none" stroke={accentColor} strokeWidth="1.5" />
        <line x1="49" y1="35" x2="51" y2="35" stroke={accentColor} strokeWidth="1.5" />
        
        {/* Smile */}
        <path d="M42,45 Q50,52 58,45" fill="none" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" />
        
        {/* Body */}
        <rect x="40" y="62" width="20" height="25" rx="4" fill={primaryColor} />
        
        {/* Arms */}
        <line x1="40" y1="70" x2="25" y2="60" stroke={primaryColor} strokeWidth="4" strokeLinecap="round" />
        <line x1="60" y1="70" x2="75" y2="60" stroke={primaryColor} strokeWidth="4" strokeLinecap="round" />
        
        {/* Legs */}
        <line x1="45" y1="87" x2="40" y2="100" stroke={primaryColor} strokeWidth="4" strokeLinecap="round" />
        <line x1="55" y1="87" x2="60" y2="100" stroke={primaryColor} strokeWidth="4" strokeLinecap="round" />
        
        {/* Computer */}
        <rect x="25" y="50" width="50" height="30" rx="2" fill={isDark ? "#1F2937" : "#F3F4F6"} stroke={secondaryColor} strokeWidth="1.5" />
        <rect x="30" y="55" width="40" height="20" rx="1" fill={isDark ? "#111827" : "#FFFFFF"} />
        <line x1="35" y1="60" x2="45" y2="60" stroke={accentColor} strokeWidth="1" />
        <line x1="35" y1="65" x2="50" y2="65" stroke={secondaryColor} strokeWidth="1" />
        <line x1="35" y1="70" x2="48" y2="70" stroke={primaryColor} strokeWidth="1" />
      </motion.svg>
    </motion.div>
  );
}

// Rocket mascot - a cute rocket blasting off
function RocketMascot({ width, height, theme }: { width: number; height: number; theme: string }) {
  const isDark = theme === 'dark';
  const primaryColor = isDark ? "#60A5FA" : "#3B82F6";
  const secondaryColor = isDark ? "#93C5FD" : "#60A5FA";
  const accentColor = isDark ? "#DBEAFE" : "#2563EB";

  const rocketVariants = {
    animate: {
      y: [0, -10, 0],
      rotate: [0, 2, 0, -2, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };

  const flameVariants = {
    animate: {
      scaleY: [0.5, 1.2, 0.5],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };

  const starVariants = {
    animate: (custom: number) => ({
      opacity: [0.2, 1, 0.2],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse" as const,
        delay: custom * 0.3
      }
    })
  };

  return (
    <motion.div 
      className="relative"
      style={{ width, height }}
      initial="initial"
      animate="animate"
    >
      {/* Stars */}
      <motion.circle cx="20%" cy="20%" r="2" fill={primaryColor} variants={starVariants} custom={0} />
      <motion.circle cx="80%" cy="15%" r="3" fill={secondaryColor} variants={starVariants} custom={0.5} />
      <motion.circle cx="15%" cy="70%" r="2" fill={accentColor} variants={starVariants} custom={0.8} />
      <motion.circle cx="85%" cy="65%" r="2" fill={primaryColor} variants={starVariants} custom={0.2} />
      <motion.circle cx="60%" cy="85%" r="3" fill={secondaryColor} variants={starVariants} custom={0.7} />

      {/* Rocket */}
      <motion.svg 
        width={width} 
        height={height} 
        viewBox="0 0 100 100"
        variants={rocketVariants}
      >
        {/* Rocket Body */}
        <path 
          d="M50,10 C60,10 70,30 70,60 L70,75 C70,77 68,80 65,80 L35,80 C32,80 30,77 30,75 L30,60 C30,30 40,10 50,10 Z" 
          fill={isDark ? "#374151" : "#E5E7EB"} 
          stroke={primaryColor} 
          strokeWidth="2"
        />
        
        {/* Window */}
        <circle cx="50" cy="40" r="10" fill={isDark ? "#111827" : "#FFFFFF"} stroke={secondaryColor} strokeWidth="2" />
        <circle cx="50" cy="40" r="6" fill={isDark ? "#1F2937" : "#F3F4F6"} />
        
        {/* Fins */}
        <path 
          d="M30,60 L15,75 L30,75 Z" 
          fill={primaryColor} 
        />
        <path 
          d="M70,60 L85,75 L70,75 Z" 
          fill={primaryColor} 
        />
        
        {/* Rocket Base */}
        <rect x="35" y="80" width="30" height="5" rx="2" fill={isDark ? "#1F2937" : "#D1D5DB"} />
        
        {/* Flame */}
        <motion.g variants={flameVariants} style={{ originY: 0, originX: "50%" }}>
          <path 
            d="M40,85 L50,105 L60,85 Z" 
            fill="orange" 
          />
          <path 
            d="M43,85 L50,100 L57,85 Z" 
            fill="yellow" 
          />
        </motion.g>
      </motion.svg>
    </motion.div>
  );
}

// Robot mascot - a cute robot with blinking lights and antenna
function RobotMascot({ width, height, theme }: { width: number; height: number; theme: string }) {
  const isDark = theme === 'dark';
  const primaryColor = isDark ? "#60A5FA" : "#3B82F6";
  const secondaryColor = isDark ? "#93C5FD" : "#60A5FA";
  const accentColor = isDark ? "#DBEAFE" : "#2563EB";

  const robotVariants = {
    animate: {
      y: [0, -5, 0],
      rotate: [0, 1, 0, -1, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse" as const,
      }
    }
  };

  const antennaVariants = {
    animate: {
      scaleY: [0.95, 1.05, 0.95],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse" as const,
      }
    }
  };

  const lightVariants = {
    animate: (custom: number) => ({
      opacity: [0.4, 1, 0.4],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: "reverse" as const,
        delay: custom * 0.2
      }
    })
  };

  return (
    <motion.div 
      className="relative"
      style={{ width, height }}
      initial="initial"
      animate="animate"
    >
      <motion.svg 
        width={width} 
        height={height} 
        viewBox="0 0 100 100"
        variants={robotVariants}
      >
        {/* Antenna */}
        <motion.g variants={antennaVariants} style={{ originY: "100%", originX: "50%" }}>
          <line x1="50" y1="10" x2="50" y2="20" stroke={primaryColor} strokeWidth="2" />
          <circle cx="50" cy="8" r="4" fill={accentColor} />
        </motion.g>
        
        {/* Head */}
        <rect x="35" y="20" width="30" height="25" rx="5" fill={isDark ? "#374151" : "#E5E7EB"} stroke={primaryColor} strokeWidth="2" />
        
        {/* Eyes */}
        <circle cx="43" cy="30" r="4" fill={isDark ? "#111827" : "#FFFFFF"} stroke={secondaryColor} strokeWidth="1" />
        <circle cx="57" cy="30" r="4" fill={isDark ? "#111827" : "#FFFFFF"} stroke={secondaryColor} strokeWidth="1" />
        <circle cx="43" cy="30" r="2" fill={primaryColor} />
        <circle cx="57" cy="30" r="2" fill={primaryColor} />
        
        {/* Mouth */}
        <rect x="42" y="38" width="16" height="2" rx="1" fill={isDark ? "#111827" : "#9CA3AF"} />
        
        {/* Body */}
        <rect x="30" y="50" width="40" height="30" rx="5" fill={isDark ? "#374151" : "#E5E7EB"} stroke={primaryColor} strokeWidth="2" />
        
        {/* Control Panel */}
        <rect x="40" y="55" width="20" height="15" rx="2" fill={isDark ? "#1F2937" : "#F3F4F6"} />
        
        {/* Blinking Lights */}
        <motion.circle cx="45" cy="60" r="2" fill="red" variants={lightVariants} custom={0} />
        <motion.circle cx="50" cy="60" r="2" fill="yellow" variants={lightVariants} custom={0.5} />
        <motion.circle cx="55" cy="60" r="2" fill="green" variants={lightVariants} custom={1} />
        
        <motion.circle cx="45" cy="65" r="2" fill="blue" variants={lightVariants} custom={1.5} />
        <motion.circle cx="50" cy="65" r="2" fill="purple" variants={lightVariants} custom={2} />
        <motion.circle cx="55" cy="65" r="2" fill="orange" variants={lightVariants} custom={2.5} />
        
        {/* Arms */}
        <rect x="20" y="55" width="10" height="5" rx="2" fill={primaryColor} />
        <rect x="70" y="55" width="10" height="5" rx="2" fill={primaryColor} />
        <line x1="20" y1="57.5" x2="30" y2="57.5" stroke={primaryColor} strokeWidth="5" strokeLinecap="round" />
        <line x1="70" y1="57.5" x2="80" y2="57.5" stroke={primaryColor} strokeWidth="5" strokeLinecap="round" />
        
        {/* Legs */}
        <rect x="35" y="80" width="10" height="15" rx="2" fill={primaryColor} />
        <rect x="55" y="80" width="10" height="15" rx="2" fill={primaryColor} />
      </motion.svg>
    </motion.div>
  );
}

// Paper Plane mascot - a flying paper plane with trail
function PaperPlaneMascot({ width, height, theme }: { width: number; height: number; theme: string }) {
  const isDark = theme === 'dark';
  const primaryColor = isDark ? "#60A5FA" : "#3B82F6";
  const secondaryColor = isDark ? "#93C5FD" : "#60A5FA";
  const paperColor = isDark ? "#D1D5DB" : "#FFFFFF";

  const planePathVariants = {
    animate: {
      d: [
        "M10,50 Q30,40 50,50 Q70,60 90,50",
        "M10,45 Q30,55 50,45 Q70,35 90,45",
        "M10,50 Q30,40 50,50 Q70,60 90,50"
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse" as const,
      }
    }
  };

  const planeVariants = {
    animate: {
      rotate: [0, 5, 0, -5, 0],
      x: [0, 5, 0, -5, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse" as const,
      }
    }
  };

  const trailVariants = {
    animate: (custom: number) => ({
      opacity: [1, 0],
      x: [-5 * custom, -20 * custom],
      transition: {
        duration: 1,
        repeat: Infinity,
        delay: custom * 0.1
      }
    })
  };

  return (
    <motion.div 
      className="relative"
      style={{ width, height }}
      initial="initial"
      animate="animate"
    >
      <svg width={width} height={height} viewBox="0 0 100 100">
        {/* Flight Path (invisible guide) */}
        <motion.path 
          d="M10,50 Q30,40 50,50 Q70,60 90,50" 
          fill="none" 
          stroke="transparent" 
          id="planePath"
          variants={planePathVariants}
        />
        
        {/* Trailing dots */}
        <motion.circle cx="25" cy="45" r="1" fill={secondaryColor} variants={trailVariants} custom={1} />
        <motion.circle cx="20" cy="47" r="1" fill={secondaryColor} variants={trailVariants} custom={2} />
        <motion.circle cx="15" cy="49" r="1" fill={secondaryColor} variants={trailVariants} custom={3} />
        
        <motion.g variants={planeVariants}>
          <path 
            d="M50,30 L75,45 L50,60 Z" 
            fill={paperColor} 
            stroke={primaryColor} 
            strokeWidth="1" 
          />
          <path 
            d="M50,30 L50,60 L35,45 Z" 
            fill={paperColor} 
            stroke={primaryColor} 
            strokeWidth="1" 
          />
          <line 
            x1="50" 
            y1="30" 
            x2="50" 
            y2="60" 
            stroke={primaryColor} 
            strokeWidth="0.5" 
            strokeDasharray="2,2" 
          />
        </motion.g>
      </svg>
    </motion.div>
  );
}