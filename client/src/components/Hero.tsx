import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { floatingVariants, wobbleVariants, buttonVariants } from "@/lib/animations";
import profilePhotoPath from "@/assets/images/profile-photo.jpeg";
import { ArrowRight, Code, Sparkles, Zap } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export default function Hero() {
  const isMobile = useIsMobile();
  const { theme } = useTheme();

  // Animation variants for the skills tag cloud
  const skillTagVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.3 + (i * 0.05),
        duration: 0.5,
        type: "spring",
        stiffness: 200
      }
    }),
    hover: {
      scale: 1.1,
      color: "rgb(37, 99, 235)",
      backgroundColor: "rgba(59, 130, 246, 0.15)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  // List of skills with icons
  const skills = [
    { name: "ML", icon: <Sparkles className="w-3 h-3 mr-1" /> },
    { name: "AI", icon: <Zap className="w-3 h-3 mr-1" /> },
    { name: "UI", icon: <Code className="w-3 h-3 mr-1" /> },
    { name: "Python", icon: <div className="w-3 h-3 mr-1 bg-yellow-500 rounded-sm"></div> },
    { name: "TensorFlow", icon: <div className="w-3 h-3 mr-1 bg-blue-500 rounded-sm"></div> },
    { name: "React", icon: <div className="w-3 h-3 mr-1 text-blue-400 rounded-full flex items-center justify-center" style={{ transform: 'scale(1.2)' }}>⚛</div> },
    { name: "NumPy", icon: <div className="w-3 h-3 mr-1 bg-black dark:bg-white rounded-full"></div> },
    { name: "Pandas", icon: <div className="w-3 h-3 mr-1 bg-green-500 rounded-sm"></div> },
    { name: "DSA", icon: <div className="w-3 h-3 mr-1 flex items-center justify-center">🔍</div> },
    { name: "AI is cool I guess", icon: <Zap className="w-3 h-3 mr-1" /> }
  ];

  return (
    <section id="hero" className="min-h-screen pt-24 md:pt-28 lg:pt-24 pb-12 flex items-center justify-center relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          {/* Enhanced background layers with more vibrant colors - light/dark mode aware */}
          <path 
            d="M0,50 Q250,150 500,50 T1000,50 V1000 H0 Z" 
            className="fill-blue-500/[0.08] dark:fill-blue-400/[0.05]" 
          />
          <path 
            d="M0,150 Q250,250 500,150 T1000,150 V1000 H0 Z" 
            className="fill-teal-500/[0.06] dark:fill-teal-400/[0.05]" 
          />
          <path 
            d="M0,250 Q250,350 500,250 T1000,250 V1000 H0 Z" 
            className="fill-amber-400/[0.06] dark:fill-amber-300/[0.04]" 
          />
          <path 
            d="M0,350 Q250,450 500,350 T1000,350 V1000 H0 Z" 
            className="fill-purple-500/[0.05] dark:fill-purple-400/[0.04]" 
          />
        </svg>
      </div>
      
      {/* Vibrant Decorative Shapes with improved animation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Main floating large circle */}
        <motion.div 
          className="absolute w-40 h-40 rounded-full bg-blue-500/20 blur-lg"
          style={{ top: '15%', left: '5%' }}
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          custom={{ 
            yOffset: 30, 
            duration: 8, 
            scaleOffset: 0.2 
          }}
        />
        
        {/* Rotating triangle shape */}
        <motion.div 
          className="absolute"
          style={{ top: '60%', right: '10%' }}
          animate={{ 
            rotate: [0, 360],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 15,
            ease: "linear" 
          }}
        >
          <div className="w-0 h-0 
            border-l-[70px] border-l-transparent
            border-b-[120px] border-b-amber-400/40
            border-r-[70px] border-r-transparent
            filter blur-[1px]"
          />
        </motion.div>
        
        {/* Wobbling blue square */}
        <motion.div 
          className="absolute w-28 h-28 rounded-lg bg-teal-500/20 backdrop-blur-sm border border-teal-500/30"
          style={{ top: '20%', right: '15%' }}
          variants={wobbleVariants}
          initial="initial"
          animate="animate"
          custom={{ angle: 20, duration: 10 }}
        />
        
        {/* Morphing blob */}
        <motion.div 
          className="absolute w-56 h-56 bg-purple-500/10 backdrop-blur-sm rounded-[40%_60%_70%_30%/40%_50%_60%_50%]"
          style={{ bottom: '10%', left: '15%' }}
          animate={{ 
            borderRadius: [
              '40% 60% 70% 30% / 40% 50% 60% 50%',
              '70% 30% 50% 50% / 30% 30% 70% 70%',
              '40% 60% 70% 30% / 40% 50% 60% 50%'
            ]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 8,
            ease: "easeInOut" 
          }}
        />
        
        {/* Adding more variety to the small floating dots */}
        {[...Array(15)].map((_, index) => {
          const colors = [
            "rgba(59, 130, 246, 0.7)",  // blue
            "rgba(20, 184, 166, 0.7)",  // teal
            "rgba(234, 179, 8, 0.7)",   // yellow 
            "rgba(168, 85, 247, 0.7)",  // purple
            "rgba(239, 68, 68, 0.7)"    // red
          ];
          
          // More randomized positions
          const positions = [
            { top: `${5 + (index * 6)}%`, left: `${75 + (index % 4) * 5}%` },
            { top: `${15 + (index * 5)}%`, right: `${5 + (index % 3) * 7}%` },
            { top: `${60 + (index % 4) * 8}%`, left: `${10 + (index % 5) * 6}%` },
            { bottom: `${10 + (index % 3) * 10}%`, right: `${20 + (index % 4) * 8}%` }
          ];
          
          const position = positions[index % positions.length];
          const size = 2 + (index % 3); // Varying sizes
          
          return (
            <motion.div 
              key={index}
              className={`absolute w-${size} h-${size} rounded-full`}
              style={{ 
                ...position,
                backgroundColor: colors[index % colors.length]
              }}
              animate={{ 
                y: [0, -15 - (index % 20), 0],
                x: [0, index % 2 === 0 ? 10 + (index % 10) : -10 - (index % 10), 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2 + (index % 4),
                delay: index * 0.1,
                ease: "easeInOut"
              }}
            />
          );
        })}
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            className="md:w-1/2 mb-12 md:mb-0 text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-doodle text-5xl md:text-7xl font-bold mb-6">
              <motion.span 
                className="block inline-block text-primary relative"
                animate={{ 
                  rotate: [0, -2, 2, 0],
                  y: [0, -5, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3, 
                  ease: "easeInOut" 
                }}
              >
                Hello!
                <motion.div
                  className="absolute -bottom-1 left-0 h-2 w-full bg-blue-200/70 -z-10 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                />
              </motion.span>
              <span className="block mt-2">
                I'm <motion.span 
                  className="text-primary"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: [0.8, 1.2, 1],
                  }}
                  transition={{ 
                    delay: 0.2, 
                    duration: 0.8,
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  Rishii
                </motion.span>
              </span>
            </h1>
            
            <motion.p 
              className="text-xl md:text-2xl font-doodle mb-6"
              animate={{ 
                y: [-3, 3, -3],
                x: [0, 1, 0, -1, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 3, 
                ease: "easeInOut" 
              }}
            >
              <span className="bg-gradient-to-r from-blue-500 via-teal-500 to-indigo-500 text-transparent bg-clip-text">
                I bend data, Machine obey.
              </span>
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-8 p-5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-md border-dashed border-2 border-gray-200 dark:border-gray-700 transform transition-all hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-500"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-base font-medium mb-4 text-gray-800 dark:text-gray-200">
                Brains for AI, eyes for design, and emotions for Machine. Whether it's neural nets, UI kits, or instincts-I stay winning.
              </p>
              <div className="flex flex-wrap gap-2 mb-1">
                {skills.map((skill, index) => (
                  <motion.span 
                    key={index} 
                    className="inline-flex items-center bg-blue-50 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium"
                    variants={skillTagVariants}
                    custom={index}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                  >
                    {skill.icon && skill.icon}
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-5">
              <motion.a 
                href="#projects" 
                className="bg-primary text-white font-doodle py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform transition duration-300 inline-flex items-center"
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                custom={{ delay: 0.6, yOffset: 5 }}
              >
                <span>See My Work</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.a>
              
              <motion.a 
                href="https://gig-ep35.onrender.com" 
                className="bg-white dark:bg-gray-800 text-primary dark:text-primary-foreground border-2 border-primary font-doodle py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:bg-primary/5 dark:hover:bg-primary/10 transform transition-all duration-300"
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                custom={{ delay: 0.7, yOffset: 5 }}
              >
                Let's Connect
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.4,
              type: "spring",
              stiffness: 100
            }}
          >
            {/* Profile photo with doodle frame */}
            <motion.div 
              className="paper relative rounded-full w-72 h-72 md:w-96 md:h-96 flex items-center justify-center p-3 bg-white dark:bg-gray-800 shadow-xl border-4 border-dashed border-blue-200 dark:border-blue-500/30"
              animate={{ 
                y: [-8, 8, -8],
                rotate: [0, 1, 0, -1, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 5, 
                ease: "easeInOut" 
              }}
            >
              {/* Decorative elements around profile picture */}
              <motion.div
                className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400/80 dark:bg-yellow-500/50 rounded-full z-10"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <motion.div
                className="absolute top-1/2 -right-5 w-8 h-8 bg-teal-400/80 dark:bg-teal-500/50 rounded-full z-10"
                animate={{ scale: [1, 0.8, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
              />
              <motion.div
                className="absolute -bottom-4 right-1/3 w-10 h-10 bg-blue-400/80 dark:bg-blue-500/50 rounded-full z-10"
                animate={{ scale: [1, 1.1, 0.9, 1] }}
                transition={{ repeat: Infinity, duration: 4 }}
              />
              <motion.div
                className="absolute -left-5 top-1/3 w-9 h-9 bg-purple-400/80 dark:bg-purple-500/50 rounded-full z-10"
                animate={{ scale: [1, 0.9, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 3.5 }}
              />
              
              {/* Actual profile image */}
              <div className="rounded-full w-full h-full overflow-hidden flex items-center justify-center border-8 border-white dark:border-gray-700 shadow-inner">
                <motion.div
                  className="w-full h-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                >
                  <img 
                    src={profilePhotoPath} 
                    alt="Rishii's Profile" 
                    className="w-full h-full object-cover object-center"
                  />
                </motion.div>
              </div>
              
              {/* Doodle elements overlaid on the profile picture frame */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 200 200">
                <motion.path 
                  d="M100,0 C155,0 200,45 200,100 C200,155 155,200 100,200 C45,200 0,155 0,100 C0,45 45,0 100,0 Z" 
                  fill="none" 
                  stroke="#3B82F6" 
                  strokeWidth="1" 
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, delay: 1 }}
                />
                
                {/* Stars and doodles around the profile */}
                {[0, 1, 2, 3, 4].map(i => {
                  const angle = (i * 72) * (Math.PI / 180);
                  const x = 100 + 105 * Math.cos(angle);
                  const y = 100 + 105 * Math.sin(angle);
                  
                  return (
                    <motion.path 
                      key={i}
                      d={`M${x},${y} l2,5 l5,-2 l-4,4 l4,4 l-5,-2 l-2,5 l-2,-5 l-5,2 l4,-4 l-4,-4 l5,2 z`}
                      fill="#FFD166"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.5 + (i * 0.1), duration: 0.5 }}
                    />
                  );
                })}
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
