import { useState } from "react";
import { motion } from "framer-motion";
import StrawHat from "@/assets/icons/StrawHat";

export default function Footer() {
  const [clickCount, setClickCount] = useState(0);
  const [showStrawHat, setShowStrawHat] = useState(false);

  const handleHeartClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    if (newCount >= 3) {
      setShowStrawHat(true);
      setTimeout(() => {
        setShowStrawHat(false);
        setClickCount(0);
      }, 5000);
    }
  };

  return (
    <footer id="footer" className="bg-[#333333] text-white py-8 relative overflow-hidden">
      {/* Hidden One Piece Easter Egg */}
      {showStrawHat && (
        <motion.div 
          className="absolute top-0 left-1/2 transform -translate-x-1/2 text-4xl cursor-pointer"
          initial={{ y: -100 }}
          animate={{ y: [0, 10, 0], rotate: [0, 5, -5, 0] }}
          transition={{ 
            y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
            rotate: { repeat: Infinity, duration: 2, ease: "easeInOut" }
          }}
        >
          <StrawHat className="w-16 h-16 text-[#FFD166]" />
        </motion.div>
      )}
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="font-doodle text-xl text-[#FFD166]">Rishii Creates</h3>
            <p className="font-doodle text-sm">Creative Developer & Designer</p>
          </div>
          
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="#hero" className="font-doodle text-sm hover:text-[#FFD166] transition duration-300">Home</a>
            <a href="#about" className="font-doodle text-sm hover:text-[#FFD166] transition duration-300">About</a>
            <a href="#skills" className="font-doodle text-sm hover:text-[#FFD166] transition duration-300">Skills</a>
            <a href="#projects" className="font-doodle text-sm hover:text-[#FFD166] transition duration-300">Projects</a>
            <a href="#contact" className="font-doodle text-sm hover:text-[#FFD166] transition duration-300">Contact</a>
          </div>
          
          <div className="text-center md:text-right">
            <p className="font-doodle text-sm">
              Made with <span id="footer-heart" className="text-primary cursor-pointer" onClick={handleHeartClick}>❤️</span> and a bit of magic
            </p>
            <p className="font-doodle text-xs">© {new Date().getFullYear()} Rishii Creates. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
