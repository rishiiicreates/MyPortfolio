import { motion } from "framer-motion";
import profileImg from "@/assets/images/profile-photo.jpeg";
import Magnetic from "@/components/Magnetic";

export default function About() {
  return (
    <section id="about" className="py-32 bg-background">
      <div className="container mx-auto px-6 md:px-8">

        <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
          <div className="md:w-5/12 relative">
            <div className="sticky top-24 pt-12 pl-6">
              {/* Team Background */}
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-secondary/10">
                <img
                  src="/team-working.jpg"
                  alt="Team Working"
                  className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply filter grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-accent/10 mix-blend-overlay"></div>
              </div>

              {/* Profile Photo Cutout */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="absolute -bottom-12 -right-6 w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-background shadow-xl"
              >
                <img
                  src={profileImg}
                  alt="Hrishikesh Yadav"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Section Header */}
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="font-display font-bold text-6xl md:text-8xl uppercase text-foreground absolute -top-12 -left-8 break-words w-full mix-blend-difference text-white/90 z-20 pointer-events-none"
              >
                The <br /><span className="text-accent">Process</span>
              </motion.h2>
            </div>
          </div>

          <div className="md:w-7/12 flex flex-col gap-12 pt-12 md:pt-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-mono text-sm uppercase tracking-widest text-foreground/60 mb-6">/ Who I Am</h3>
              <p className="font-sans text-xl md:text-2xl leading-relaxed text-foreground font-light">
                I am an <span className="font-medium">AI Product Engineer</span> obsessed with the intersection of <span className="border-b-2 border-accent">human intent</span> and <span className="border-b-2 border-accent">machine intelligence</span>.
                My work moves beyond simple automation—I build adaptive systems that learn, evolve, and augment human capability.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="font-mono text-sm uppercase tracking-widest text-foreground/60 mb-6">/ My Approach</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-display font-bold text-xl uppercase mb-2">Architectural precision</h4>
                  <p className="font-sans text-foreground/70">
                    Clean code is not just a preference; it's a structural necessity for scalable AI systems.
                  </p>
                </div>
                <div>
                  <h4 className="font-display font-bold text-xl uppercase mb-2">User-Centric AI</h4>
                  <p className="font-sans text-foreground/70">
                    Models mean nothing if they don't solve real user problems with intuitive interfaces.
                  </p>
                </div>
              </div>


            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
