import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import Magnetic from "@/components/Magnetic";
import Header from "@/components/Header";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";

export default function ExperiencePage() {
    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <Header />

            {/* Hero banner with workspace whiteboard image */}
            <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
                <img
                    src="/workspace-whiteboard.jpg"
                    alt="Workspace with whiteboard diagrams"
                    className="absolute inset-0 w-full h-full object-cover filter grayscale"
                />
                <div className="absolute inset-0 bg-background/70" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

                {/* Overlay text */}
                <div className="absolute inset-0 flex flex-col items-start justify-end px-6 md:px-12 pb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/50 mb-4"
                    >
                        / Career
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="font-display font-bold text-5xl md:text-7xl leading-[0.9] text-foreground uppercase"
                    >
                        Professional <br />
                        <span className="text-accent">Experience</span>
                    </motion.h1>
                </div>
            </div>

            {/* Experience section component */}
            <Experience />

            {/* Back button */}
            <div className="py-16 px-6 md:px-12">
                <div className="max-w-4xl mx-auto">
                    <Magnetic>
                        <Link href="/" className="inline-flex items-center gap-2 group">
                            <div className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/5 transition-colors">
                                <ArrowLeft className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </div>
                            <span className="font-mono text-xs uppercase tracking-widest text-foreground/60 group-hover:text-foreground transition-colors">Back Home</span>
                        </Link>
                    </Magnetic>
                </div>
            </div>

            <Footer />
        </div>
    );
}
