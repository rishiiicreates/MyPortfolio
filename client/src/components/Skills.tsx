import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import DoodlePath from "@/components/ui/DoodlePath";
import PaperCard from "@/components/ui/PaperCard";
import SkillBar from "@/components/ui/SkillBar";
import { Code, Brush, Server, Database, Globe, Sparkles } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { theme } = useTheme();

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-doodle font-bold text-center mb-16 text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="relative z-10">
            My Skills
            <DoodlePath color={theme === 'dark' ? "#70efdd" : "#4ECDC4"} />
          </span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Frontend */}
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="transform transition-all duration-300"
          >
            <div className="paper rounded-lg overflow-hidden h-full shadow-lg transform transition-all duration-300 bg-white dark:bg-gray-800 border-2 border-orange-100 dark:border-orange-900/30">
              <div className="bg-gradient-to-r from-amber-400 to-yellow-400 dark:from-amber-500 dark:to-yellow-500 p-6 text-center border-b-4 border-amber-300 dark:border-amber-600">
                <h3 className="font-doodle text-2xl font-bold text-[#333333] dark:text-gray-900">WANTED</h3>
                <p className="font-doodle text-lg text-[#333333] dark:text-gray-900">FOR CREATING MINDS THAT LEARN</p>
              </div>
              
              <div className="p-6">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-violet-500 dark:from-blue-400 dark:to-violet-400 rounded-full flex items-center justify-center mb-6 shadow-lg border-4 border-white dark:border-gray-700">
                  <Code className="text-white text-3xl" />
                </div>
                
                <h4 className="font-doodle text-xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">Machine Learning</h4>
                
                {/* Skills */}
                <div className="space-y-5">
                  <SkillBar name="Python" percentage={90} />
                  <SkillBar name="Machne Training & Tuning" percentage={86} />
                  <SkillBar name="Data Wrangling" percentage={92} />
                </div>
                
                <div className="mt-8 text-center">
                  <div className="inline-block bg-gradient-to-r from-amber-400 to-yellow-400 dark:from-amber-500 dark:to-yellow-500 py-2 px-6 rounded-full font-doodle text-sm font-bold text-gray-800 dark:text-gray-900 shadow-md transform transition-transform hover:scale-105">
                    Bounty: 1M XP
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Design */}
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.03 }}
            className="transform transition-all duration-300"
          >
            <div className="paper rounded-lg overflow-hidden h-full shadow-lg transform transition-all duration-300 bg-white dark:bg-gray-800 border-2 border-purple-100 dark:border-purple-900/30">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 p-6 text-center border-b-4 border-purple-400 dark:border-purple-700">
                <h3 className="font-doodle text-2xl font-bold text-white">WANTED</h3>
                <p className="font-doodle text-lg text-white">FOR CREATIVE DESIGN</p>
              </div>
              
              <div className="p-6">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-pink-500 to-rose-500 dark:from-pink-400 dark:to-rose-400 rounded-full flex items-center justify-center mb-6 shadow-lg border-4 border-white dark:border-gray-700">
                  <Brush className="text-white text-3xl" />
                </div>
                
                <h4 className="font-doodle text-xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">Design</h4>
                
                {/* Skills */}
                <div className="space-y-5">
                  <SkillBar name="UI/UX" percentage={85} />
                  <SkillBar name="Figma" percentage={90} />
                  <SkillBar name="Animation" percentage={80} />
                </div>
                
                <div className="mt-8 text-center">
                  <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 py-2 px-6 rounded-full font-doodle text-sm font-bold text-white shadow-md transform transition-transform hover:scale-105">
                    Bounty: 950K XP
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Backend */}
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.03 }}
            className="transform transition-all duration-300"
          >
            <div className="paper rounded-lg overflow-hidden h-full shadow-lg transform transition-all duration-300 bg-white dark:bg-gray-800 border-2 border-teal-100 dark:border-teal-900/30">
              <div className="bg-gradient-to-r from-teal-500 to-emerald-500 dark:from-teal-600 dark:to-emerald-600 p-6 text-center border-b-4 border-teal-400 dark:border-teal-700">
                <h3 className="font-doodle text-2xl font-bold text-white">WANTED</h3>
                <p className="font-doodle text-lg text-white">FOR SYSTEM DESIGN</p>
              </div>
              
              <div className="p-6">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-emerald-500 to-green-600 dark:from-emerald-400 dark:to-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg border-4 border-white dark:border-gray-700">
                  <Server className="text-white text-3xl" />
                </div>
                
                <h4 className="font-doodle text-xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">AI Product Development</h4>
                
                {/* Skills */}
                <div className="space-y-5">
                  <SkillBar name="Model Deployment" percentage={80} />
                  <SkillBar name="Real-time Predictions" percentage={75} />
                  <SkillBar name="Scalability" percentage={85} />
                </div>
                
                <div className="mt-8 text-center">
                  <div className="inline-block bg-gradient-to-r from-teal-500 to-emerald-500 dark:from-teal-600 dark:to-emerald-600 py-2 px-6 rounded-full font-doodle text-sm font-bold text-white shadow-md transform transition-transform hover:scale-105">
                    Bounty: 850K XP
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
