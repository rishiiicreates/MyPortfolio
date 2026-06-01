import { motion } from "framer-motion";

const skills = [
  { category: "Languages", items: ["C++", "Python", "JavaScript/TypeScript", "SQL"] },
  { category: "Frameworks & Libraries", items: ["React", "Next.js", "Node.js", "TensorFlow", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib", "MatLab", "LangChain"] },
  { category: "Tools & Cloud", items: ["AWS", "Firebase", "Vercel", "Render", "Git/GitHub", "Docker", "Kubernetes", "Hugging Face"] },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-background border-t border-muted">
      <div className="container mx-auto px-6 md:px-8">

        <div className="flex flex-col md:flex-row justify-between mb-16">
          <h2 className="font-display font-bold text-4xl md:text-5xl uppercase text-foreground">
            Technical <span className="text-accent">Arsenal</span>
          </h2>
          <p className="font-mono text-xs uppercase tracking-widest text-foreground/60 mt-4 md:mt-0 max-w-xs text-right hidden md:block">
            / Tools & Frameworks deployed in production environments
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {skills.map((skillGroup, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
              }}
              className="flex flex-col"
            >
              <h3 className="font-display font-bold text-lg uppercase mb-6 pb-2 border-b border-accent/20">
                {skillGroup.category}
              </h3>
              <ul className="space-y-3">
                {skillGroup.items.map((item, i) => (
                  <li key={i} className="font-sans text-foreground/80 hover:text-accent transition-colors cursor-default">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
