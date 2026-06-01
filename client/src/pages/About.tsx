import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Magnetic from "@/components/Magnetic";
import Header from "@/components/Header";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Footer from "@/components/Footer";

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
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 50 }
    }
};

const timeline = [
    {
        title: "Started Coding",
        desc: "Found out the web listens when you speak its language."
    },
    {
        title: "Studied Design",
        desc: "Learned that function without form is only half the story."
    },
    {
        title: "Dove into AI/ML",
        desc: "Discovered how wild it is to teach machines to learn like we do—and sometimes, better."
    },
    {
        title: "Present Day",
        desc: "Balancing both worlds—building for intelligence, designing for emotion, and forever learning."
    }
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <Header />

            {/* Hero banner with mountain image */}
            <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
                <img
                    src="/mountain-summit.jpg"
                    alt="Mountain summit landscape"
                    className="absolute inset-0 w-full h-full object-cover filter grayscale"
                />
                <div className="absolute inset-0 bg-background/60" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

                {/* Overlay text */}
                <div className="absolute inset-0 flex flex-col items-start justify-end px-6 md:px-12 pb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/50 mb-4"
                    >
                        / About Me
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="font-display font-bold text-5xl md:text-7xl leading-[0.9] text-foreground"
                    >
                        Hey there! 👋 <br />
                        <span className="text-foreground/80">I'm Hrishikesh.</span>
                    </motion.h1>
                </div>
            </div>

            {/* Narrative section (merged from AboutMe) */}
            <section className="py-20 px-6 md:px-12">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-col gap-12 mb-24"
                    >
                        <motion.div variants={itemVariants} className="space-y-6 text-xl md:text-2xl font-sans font-light leading-relaxed text-foreground/90 max-w-3xl">
                            <p>
                                The guy who teaches machines to think, designs systems that speak, and turns raw data into digital sorcery.
                            </p>
                            <p>
                                I build for <span className="text-accent font-medium">reactions</span> rather than screens. Whether it's an interface or a machine learning model, I craft with intention—where every detail has a role, and every line of code tells the system something new.
                            </p>
                            <p className="text-lg md:text-xl text-foreground/70">
                                When I'm not coding, you might find me sketching, watching One Piece, or exploring the outdoors for inspiration.
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Timeline */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="border-l border-foreground/20 pl-8 md:pl-12 space-y-16"
                    >
                        {timeline.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative group"
                            >
                                <div className="absolute -left-[39px] md:-left-[55px] top-2 w-3 h-3 rounded-full bg-background border-2 border-foreground/30 group-hover:border-accent group-hover:scale-125 transition-all duration-300" />

                                <h3 className="font-display font-bold text-2xl uppercase mb-2 group-hover:text-accent transition-colors">
                                    {item.title}
                                </h3>
                                <p className="font-sans text-lg text-foreground/70 max-w-xl">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Sunset silhouette image divider */}
            <div className="relative w-full h-[30vh] md:h-[40vh] overflow-hidden my-8">
                <img
                    src="/sunset-silhouette.jpg"
                    alt="Sunset silhouette on mountain"
                    className="absolute inset-0 w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-accent/5 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
            </div>

            {/* Existing section components */}
            <About />
            <Skills />
            <Education />

            {/* Back button */}
            <div className="py-16 px-6 md:px-12">
                <div className="max-w-4xl mx-auto">
                    <Magnetic>
                        <a href="/" className="inline-flex items-center gap-2 group">
                            <div className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/5 transition-colors">
                                <ArrowLeft className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </div>
                            <span className="font-mono text-xs uppercase tracking-widest text-foreground/60 group-hover:text-foreground transition-colors">Back Home</span>
                        </a>
                    </Magnetic>
                </div>
            </div>

            <Footer />
        </div>
    );
}
