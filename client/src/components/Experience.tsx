import { motion } from "framer-motion";

const experiences = [
    {
        role: "Founder & Lead Engineer",
        company: "DashMetrics",
        period: "2024 - Present",
        description: "Architecting a SaaS analytics machine for creator economy. Built real-time ingestion pipelines processing 50k+ events/sec using Python and AWS.",
        tech: ["Next.js", "Python", "AWS", "Redis"]
    },
    {
        role: "AI & ML Intern",
        company: "TechCorp Inc.",
        period: "2023 - 2024",
        description: "Developed RAG-based internal knowledge agents reducing support ticket resolution time by 30%. Fine-tuned LLaMA-2 on proprietary datasets.",
        tech: ["PyTorch", "LangChain", "Docker"]
    },
    {
        role: "Full Stack Developer",
        company: "Housel",
        period: "2022 - 2023",
        description: "Led the frontend migration from React Native CLI to Expo, improving build times by 40%. Implemented offline-first architecture for the smart home controls.",
        tech: ["React Native", "Firebase", "Node.js"]
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 50, damping: 20 }
    }
};

export default function Experience() {
    return (
        <section id="experience" className="py-32 bg-background">
            <div className="container mx-auto px-6 md:px-8">

                <div className="flex flex-col md:flex-row gap-12 md:gap-24">

                    {/* Left Column: Sticky Image & Header */}
                    <div className="md:w-5/12 relative">
                        <div className="sticky top-24">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="font-display font-bold text-5xl md:text-6xl uppercase text-foreground mb-12"
                            >
                                Experience
                            </motion.h2>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="relative aspect-[4/5] w-full overflow-hidden rounded-sm"
                            >
                                <img
                                    src="/experience_workspace.png"
                                    alt="Engineering Workspace"
                                    className="object-cover w-full h-full filter grayscale hover:grayscale-0 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-accent/5 mix-blend-overlay" />
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Column: Experience List */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="md:w-7/12 flex flex-col pt-12"
                    >
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="flex flex-col py-12 border-b border-border group hover:bg-muted/5 transition-colors pl-6 border-l-2 border-transparent hover:border-accent"
                            >
                                <div className="mb-4">
                                    <span className="font-mono text-sm uppercase tracking-widest text-accent/80 mb-2 block">
                                        {exp.period}
                                    </span>
                                    <h3 className="font-display font-bold text-2xl md:text-3xl uppercase text-foreground">
                                        {exp.role}
                                    </h3>
                                    <span className="font-sans text-lg text-foreground/60">
                                        {exp.company}
                                    </span>
                                </div>

                                <p className="font-sans text-lg text-foreground/80 leading-relaxed max-w-2xl mb-6">
                                    {exp.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {exp.tech.map((t, i) => (
                                        <span key={i} className="px-2 py-1 bg-secondary/50 border border-border text-[10px] md:text-xs font-mono text-foreground/60 uppercase tracking-wider rounded">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                </div>

            </div>
        </section>
    );
}
