import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Twitter, Mail } from "lucide-react";
import Magnetic from "@/components/Magnetic";

export default function Contact() {
  return (
    <section id="contact" className="py-32 bg-accent text-background relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-8 relative z-10">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-6xl md:text-8xl w-full leading-[0.9] tracking-tighter uppercase"
          >
            Let's Build <br /> The Future
          </motion.h2>

          <Magnetic>
            <a href="mailto:rishiicreates@gmail.com" className="group flex items-center gap-4 mt-8 md:mt-0 w-fit">
              <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <ArrowUpRight className="w-8 h-8 text-accent" />
              </div>
              <span className="font-mono text-xl uppercase tracking-widest text-background/80 group-hover:text-background underline decoration-background/50 underline-offset-4">
                Start a Project
              </span>
            </a>
          </Magnetic>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-background/20 pt-12">
          <div>
            <h3 className="font-mono text-sm uppercase tracking-widest mb-6 opacity-70">Socials</h3>
            <div className="flex flex-col gap-4">
              {/* We want Magnetic on block elements so we use w-fit */}
              {[
                { name: "GitHub", href: "https://github.com/rishiiicreates", icon: Github },
                { name: "LinkedIn", href: "https://www.linkedin.com/in/hrishikesh-yadav-b4a736360/", icon: Linkedin },
                { name: "Twitter (X)", href: "https://x.com/rishiicreates", icon: Twitter },
                { name: "Instagram", href: "https://www.instagram.com/rishiicreatess/", icon: ArrowUpRight },
                { name: "Email", href: "mailto:rishiicreates@gmail.com", icon: Mail }
              ].map((social, i) => (
                <Magnetic key={i}>
                  <a href={social.href} className="flex items-center gap-4 text-2xl font-display uppercase hover:opacity-70 transition-opacity w-fit">
                    {social.name} <ArrowUpRight className="w-5 h-5 opacity-50" />
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-mono text-sm uppercase tracking-widest mb-6 opacity-70">Location</h3>
            <p className="text-2xl font-display uppercase">India, Global</p>
            <p className="text-2xl font-display uppercase mt-2">Available for Remote</p>
          </div>
        </div>

      </div>
    </section>
  );
}
