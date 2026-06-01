import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import DoodlePath from "@/components/ui/DoodlePath";
import SpeechBubble from "@/components/ui/SpeechBubble";
import { testimonials } from "@/data/portfolioData";

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-doodle font-bold text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="relative z-10 text-gray-900 dark:text-white">
            Testimonials
            <DoodlePath color="#FFD166" />
          </span>
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {testimonials.map((testimonial, index) => (
            <SpeechBubble 
              key={index} 
              testimonial={testimonial} 
              delay={index * 0.3}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
