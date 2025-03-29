import { motion } from "framer-motion";
import DoodlePath from "@/components/ui/DoodlePath";
import ProjectCard from "@/components/ui/ProjectCard";
import { portfolioProjects } from "@/data/portfolioData";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { staggerContainerEnhanced, textVariants } from "@/lib/animations";
import { useTheme } from "@/hooks/use-theme";

export default function Projects() {
  const [headingRef, headingControls] = useScrollAnimation(0.1);
  const [projectsRef, projectsControls] = useScrollAnimation(0.1);
  const { theme } = useTheme();

  return (
    <section id="projects" className="py-20 relative overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-blue-100 dark:bg-blue-900/30 rounded-full opacity-20 -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-teal-100 dark:bg-teal-900/30 rounded-full opacity-20 translate-y-1/3 -translate-x-1/4"></div>
      
      <div className="container mx-auto px-4">
        <motion.h2 
          ref={headingRef}
          className="text-4xl md:text-5xl font-doodle font-bold text-center mb-16 text-gray-900 dark:text-white"
          variants={textVariants}
          initial="hidden"
          animate={headingControls}
        >
          <span className="relative z-10 inline-block">
            My Projects
            <motion.div 
              className="absolute -bottom-2 left-0 w-full" 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
            >
              <DoodlePath color={theme === 'dark' ? "rgba(96, 165, 250, 0.7)" : "rgba(59, 130, 246, 0.7)"} />
            </motion.div>
          </span>
        </motion.h2>
        
        <motion.div 
          ref={projectsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainerEnhanced}
          initial="hidden"
          animate={projectsControls}
          viewport={{ once: false, amount: 0.25 }}
        >
          {portfolioProjects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
