import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden bg-background flex flex-col justify-center">
      {/* Parallax Background with Overlay */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <img
          src="/hero-ai.png"
          alt="AI Engineering Workspace"
          className="w-full h-full object-cover"
        />
        {/* Strong Dark Overlay for Text Visibility */}
        <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none"></div>
      </motion.div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 h-full flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          {/* Accent Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            className="h-1.5 bg-accent mb-8"
          />

          <h1 className="font-display font-bold text-6xl md:text-9xl leading-[0.85] text-[#DDDBD6] uppercase tracking-tighter mb-8 drop-shadow-md">
            AI Product <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DDDBD6] to-[#DDDBD6]/65">
              Engineer
            </span>
          </h1>

          <p className="font-mono text-lg md:text-xl text-white font-medium max-w-xl uppercase tracking-widest mb-12 pl-1 border-l-2 border-accent/20 drop-shadow-lg">
            Building Intelligent Systems & <br />
            Scalable Architectures
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-32 left-6 md:left-12 flex items-center gap-4 group cursor-pointer"
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <div className="w-2 h-2 rounded-full bg-accent group-hover:scale-150 transition-transform duration-500"></div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#DDDBD6] drop-shadow-md group-hover:text-accent transition-colors">Scroll to explore</span>
        </motion.div>
      </div>
    </section>
  );
}
