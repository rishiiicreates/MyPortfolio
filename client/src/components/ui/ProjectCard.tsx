import { motion } from "framer-motion";
import { Project } from "@/data/portfolioData";
import { Github, ExternalLink } from "lucide-react";
import { cardVariants } from "@/lib/animations";
import { useTheme } from "@/hooks/use-theme";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { theme } = useTheme();
  
  // Custom card variants with staggered delay based on index
  const projectCardVariants = {
    hidden: cardVariants.hidden,
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6,
        type: "spring", 
        stiffness: 100,
        damping: 12,
        delay: index * 0.1 
      }
    }
  };

  // Technology tag animations
  const tagVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1 }
  };

  // Link button animations
  const linkVariants = {
    initial: { x: 0 },
    hover: { x: 3, transition: { type: "spring", stiffness: 300 } }
  };

  return (
    <motion.div 
      className="project-card paper rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 transition-colors duration-300"
      variants={projectCardVariants}
      whileHover={{ 
        y: -10,
        scale: 1.03,
        boxShadow: theme === 'dark' 
          ? "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)" 
          : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: { type: "spring", stiffness: 400, damping: 17 }
      }}
    >
      <div className="relative h-48 overflow-hidden group">
        {/* Project background with image or doodle effect */}
        {project.image ? (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-teal-50 dark:from-blue-900/30 dark:to-teal-900/30 flex items-center justify-center transition-opacity duration-300">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-teal-50 dark:from-blue-900/30 dark:to-teal-900/30 flex items-center justify-center transition-opacity duration-300">
            <svg viewBox="0 0 200 100" width="100%" height="100%" className="p-8 opacity-70">
              <rect x="20" y="20" width="160" height="60" fill="none" stroke={theme === 'dark' ? "#60A5FA" : "#3B82F6"} strokeWidth="2" strokeDasharray="5,5" />
              <line x1="20" y1="40" x2="180" y2="40" stroke={theme === 'dark' ? "#60A5FA" : "#3B82F6"} strokeWidth="2" strokeDasharray="5,5" />
              <circle cx="35" cy="30" r="5" fill={theme === 'dark' ? "#60A5FA" : "#3B82F6"} />
            </svg>
          </div>
        )}

        {/* Overlay that appears on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60 dark:from-blue-600/90 dark:to-indigo-600/80 opacity-0 flex items-center justify-center z-10"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="transform rotate-0 scale-0"
            whileHover={{ 
              rotate: [0, -5, 5, 0],
              scale: 1, 
              transition: { 
                duration: 0.5,
                type: "spring", 
                stiffness: 300 
              } 
            }}
          >
            <span className="font-doodle text-2xl text-white px-6 py-3 rounded-md border-2 border-white shadow-lg">
              View Project
            </span>
          </motion.div>
        </motion.div>

        {/* Project title */}
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-white dark:from-gray-800 to-transparent">
          <h3 className="font-doodle text-xl font-bold text-primary dark:text-blue-400 drop-shadow-sm">
            {project.title}
          </h3>
        </div>
      </div>
      
      <div className="p-6">
        <p className="font-doodle mb-5 text-gray-800 dark:text-gray-100 leading-relaxed">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech, techIndex) => (
            <motion.span 
              key={techIndex} 
              className="inline-block bg-blue-100 dark:bg-blue-900/50 text-primary dark:text-blue-300 px-3 py-1 rounded-full text-xs font-doodle border border-blue-200 dark:border-blue-800"
              initial="initial"
              whileHover="hover"
              variants={tagVariants}
              transition={{ type: "spring", stiffness: 500 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
        
        <div className="flex justify-between">
          <motion.a 
            href={project.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="font-doodle text-primary dark:text-blue-400 hover:text-primary/80 dark:hover:text-blue-300 flex items-center transition-colors"
            initial="initial"
            whileHover="hover"
          >
            <Github className="w-4 h-4 mr-2" /> 
            <motion.span variants={linkVariants}>View Code</motion.span>
          </motion.a>

          <motion.a 
            href={project.liveUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="font-doodle text-primary dark:text-blue-400 hover:text-primary/80 dark:hover:text-blue-300 flex items-center transition-colors"
            initial="initial"
            whileHover="hover"
          >
            <motion.span variants={linkVariants}>Live Demo</motion.span>
            <ExternalLink className="w-4 h-4 ml-2" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}
