import { motion } from "framer-motion";

export default function DoodleAvatar() {
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%">
      <defs>
        <clipPath id="circleClip">
          <circle cx="100" cy="100" r="90" />
        </clipPath>
      </defs>
      
      {/* Background */}
      <circle cx="100" cy="100" r="90" fill="#fff" />
      
      {/* Face */}
      <motion.g 
        clipPath="url(#circleClip)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hair */}
        <motion.path 
          d="M30,80 C30,50 60,20 100,20 C140,20 170,50 170,80 C170,110 170,90 170,110 C170,130 160,120 160,140 L40,140 C40,120 30,130 30,110 C30,90 30,110 30,80 Z" 
          fill="#333"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />
        
        {/* Face */}
        <motion.ellipse 
          cx="100" 
          cy="95" 
          rx="55" 
          ry="65" 
          fill="#FFD8C9"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
        
        {/* Eyes */}
        <g>
          <motion.g
            animate={{ y: [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <circle cx="75" cy="85" r="8" fill="white" />
            <motion.circle 
              cx="75" 
              cy="85" 
              r="4" 
              fill="#333"
              animate={{ 
                cx: [75, 77, 75, 73, 75],
              }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            />
          </motion.g>
          
          <motion.g
            animate={{ y: [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <circle cx="125" cy="85" r="8" fill="white" />
            <motion.circle 
              cx="125" 
              cy="85" 
              r="4" 
              fill="#333"
              animate={{ 
                cx: [125, 127, 125, 123, 125],
              }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            />
          </motion.g>
        </g>
        
        {/* Eyebrows */}
        <motion.path 
          d="M65,75 Q75,70 85,75" 
          fill="none" 
          stroke="#333" 
          strokeWidth="2" 
          strokeLinecap="round"
          animate={{ d: ["M65,75 Q75,70 85,75", "M65,73 Q75,65 85,73", "M65,75 Q75,70 85,75"] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        />
        
        <motion.path 
          d="M115,75 Q125,70 135,75" 
          fill="none" 
          stroke="#333" 
          strokeWidth="2" 
          strokeLinecap="round"
          animate={{ d: ["M115,75 Q125,70 135,75", "M115,73 Q125,65 135,73", "M115,75 Q125,70 135,75"] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        />
        
        {/* Mouth */}
        <motion.path 
          d="M85,115 Q100,125 115,115" 
          fill="none" 
          stroke="#333" 
          strokeWidth="3" 
          strokeLinecap="round"
          animate={{ d: ["M85,115 Q100,125 115,115", "M85,115 Q100,130 115,115", "M85,115 Q100,125 115,115"] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        />
        
        {/* Nose */}
        <motion.path 
          d="M95,95 Q100,105 105,95" 
          fill="none" 
          stroke="#333" 
          strokeWidth="1.5" 
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        />
        
        {/* Glasses */}
        <motion.g
          stroke="#FF6B6B"
          strokeWidth="2"
          fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <circle cx="75" cy="85" r="12" />
          <circle cx="125" cy="85" r="12" />
          <line x1="87" y1="85" x2="113" y2="85" />
          <line x1="63" y1="85" x2="55" y2="80" />
          <line x1="137" y1="85" x2="145" y2="80" />
        </motion.g>
        
        {/* Blush */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <circle cx="70" cy="105" r="8" fill="#FF6B6B" opacity="0.5" />
          <circle cx="130" cy="105" r="8" fill="#FF6B6B" opacity="0.5" />
        </motion.g>
      </motion.g>
    </svg>
  );
}
