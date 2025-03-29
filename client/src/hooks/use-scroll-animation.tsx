import { useEffect, useRef } from 'react';
import { useAnimation, AnimationControls } from 'framer-motion';
import { useInView } from 'framer-motion';

export function useScrollAnimation(amount: number = 0.1): [React.RefObject<HTMLDivElement>, AnimationControls] {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { 
    amount, 
    once: false 
  });
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);
  
  return [ref, controls];
}