import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface DoodlePathProps {
  color: string;
}

export default function DoodlePath({ color }: DoodlePathProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const inView = useInView(pathRef, { once: true });
  
  useEffect(() => {
    if (inView && pathRef.current) {
      pathRef.current.classList.add('animate-draw');
    }
  }, [inView]);

  return (
    <svg className="absolute -z-10 bottom-0 left-0 w-full" height="10" viewBox="0 0 200 10">
      <motion.path 
        ref={pathRef}
        className="doodle-path"
        d="M0,5 Q40,20 80,5 T160,5 T240,5" 
        fill="none" 
        stroke={color} 
        strokeWidth="5" 
        strokeLinecap="round"
      />
    </svg>
  );
}
