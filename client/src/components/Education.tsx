import { motion } from "framer-motion";

const education = [
    {
        degree: "B.Tech in Computer Science and Technology",
        institution: "SRM Institute of Science and Technology",
        period: "2025 - 2029",
        coursework: "Data Structures & Algorithms, Object-Oriented Programming (C/C++), Database Management Systems, Discrete Mathematics.",
    },
    {
        degree: "Bachelor of Science (BS) in Artificial Intelligence and Machine Learning",
        institution: "Indian Institute of Technology, Guwahati (Remote)",
        period: "2025 - 2027",
        coursework: "Neural Networks, Deep Learning, Statistical Data Analysis, Linear Algebra, Scikit-Learn.",
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

export default function Education() {
    return (
        <section id="education" className="py-32 bg-background">
            <div className="container mx-auto px-6 md:px-8">

                <div className="flex flex-col md:flex-row gap-12 md:gap-24">

                    {/* Left Column: Sticky Header */}
                    <div className="md:w-5/12 relative">
                        <div className="sticky top-24">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="font-display font-bold text-5xl md:text-6xl uppercase text-foreground mb-12"
                            >
                                Education
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="font-sans text-lg text-foreground/60 max-w-sm leading-relaxed"
                            >
                                Building a strong foundation in computer science and artificial intelligence through rigorous academic programs.
                            </motion.p>
                        </div>
                    </div>

                    {/* Right Column: Education List */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="md:w-7/12 flex flex-col pt-12"
                    >
                        {education.map((edu, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="flex flex-col py-12 border-b border-border group hover:bg-muted/5 transition-colors pl-6 border-l-2 border-transparent hover:border-accent"
                            >
                                <div className="mb-4">
                                    <span className="font-mono text-sm uppercase tracking-widest text-accent/80 mb-2 block">
                                        {edu.period}
                                    </span>
                                    <h3 className="font-display font-bold text-2xl md:text-3xl uppercase text-foreground">
                                        {edu.degree}
                                    </h3>
                                    <span className="font-sans text-lg text-foreground/60">
                                        {edu.institution}
                                    </span>
                                </div>

                                <p className="font-sans text-foreground/80 leading-relaxed max-w-2xl">
                                    <span className="font-mono text-xs uppercase tracking-widest text-foreground/50 mr-2">Coursework:</span>
                                    {edu.coursework}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>

                </div>

            </div>
        </section>
    );
}
