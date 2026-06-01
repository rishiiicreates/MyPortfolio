import { Variants } from "framer-motion";

// Staggered container animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

// Enhanced staggered container with more dramatic effect
export const staggerContainerEnhanced: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
      staggerDirection: 1,
      when: "beforeChildren"
    }
  }
};

// Card animations - enhanced with scale and shadow effects
export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.6,
      type: "spring", 
      stiffness: 100,
      damping: 12
    }
  },
  hover: {
    y: -10,
    scale: 1.03,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15
    }
  }
};

// Text animations - enhanced with letter spacing
export const textVariants: Variants = {
  hidden: { opacity: 0, y: -20, letterSpacing: "-0.05em" },
  visible: { 
    opacity: 1, 
    y: 0,
    letterSpacing: "normal",
    transition: { 
      duration: 0.7,
      ease: [0.215, 0.61, 0.355, 1] // custom cubic bezier for elegant motion
    }
  }
};

// Fade in from left animation
export const fadeInLeftVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.7, 
      ease: "easeOut" 
    }
  }
};

// Fade in from right animation
export const fadeInRightVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.7, 
      ease: "easeOut" 
    }
  }
};

// Fade in from bottom animation
export const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.7, 
      ease: "easeOut" 
    }
  }
};

// Enhanced button animations with customizable parameters
export const buttonVariants: Variants = {
  initial: { opacity: 0, scale: 0.8, y: 0 },
  animate: (custom: { delay?: number; yOffset?: number } = {}) => ({
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: { 
      duration: 0.5,
      delay: custom.delay || 0,
      type: "spring",
      stiffness: 500,
      damping: 17
    }
  }),
  hover: (custom: { yOffset?: number } = {}) => ({ 
    scale: 1.05,
    y: custom?.yOffset ? -custom.yOffset : -5,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    transition: { 
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }),
  tap: () => ({ 
    scale: 0.97,
    y: 0,
    transition: { 
      type: "spring",
      stiffness: 500,
      damping: 20
    }
  })
};

// Draw path animations - enhanced with more precise control
export const drawPathVariants: Variants = {
  hidden: { 
    pathLength: 0,
    opacity: 0
  },
  visible: { 
    pathLength: 1,
    opacity: 1,
    transition: { 
      pathLength: { duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] },
      opacity: { duration: 0.3, ease: "easeIn" }
    }
  }
};

// Floating animations - enhanced with customizable parameters
export const floatingVariants: Variants = {
  initial: { y: 0, scale: 1 },
  animate: (custom: { yOffset?: number; duration?: number; scaleOffset?: number } = {}) => ({
    y: [0, custom.yOffset || -10, 0],
    scale: [1, 1 + (custom.scaleOffset || 0.05), 1],
    rotate: [0, 1, 0, -1, 0],
    transition: {
      duration: custom.duration || 4,
      repeat: Infinity,
      ease: "easeInOut",
      times: [0, 0.25, 0.5, 0.75, 1]
    }
  })
};

// Pulsating animation with customizable parameters
export const pulseVariants: Variants = {
  initial: { scale: 1, opacity: 0.9 },
  animate: (custom: { scaleOffset?: number; duration?: number } = {}) => ({
    scale: [1, 1 + (custom.scaleOffset || 0.05), 1],
    opacity: [0.9, 1, 0.9],
    transition: {
      duration: custom.duration || 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  })
};

// Wobble animations - enhanced with customizable parameters
export const wobbleVariants: Variants = {
  initial: { rotate: 0, scale: 1 },
  animate: (custom: { angle?: number; duration?: number; scaleOffset?: number } = {}) => ({
    rotate: [0, custom.angle || 3, 0, (custom.angle || 3) * -1, 0],
    scale: [1, 1 + (custom.scaleOffset || 0.02), 1],
    transition: {
      duration: custom.duration || 2.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  })
};

// Subtle highlight animation
export const highlightVariants: Variants = {
  initial: { 
    backgroundPosition: "0% 0%",
    opacity: 0.7
  },
  animate: { 
    backgroundPosition: "100% 0%",
    opacity: 1,
    transition: { 
      duration: 1.5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
};
