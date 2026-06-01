import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Magnetic from "@/components/Magnetic";
import Header from "@/components/Header";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <Header />

            {/* Atmospheric banner with lake reflection image */}
            <div className="relative w-full h-[45vh] md:h-[55vh] overflow-hidden">
                <img
                    src="/lake-reflection.jpg"
                    alt="Mountain lake reflection"
                    className="absolute inset-0 w-full h-full object-cover filter grayscale"
                />
                <div className="absolute inset-0 bg-background/50" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

                {/* Overlay text */}
                <div className="absolute inset-0 flex flex-col items-start justify-end px-6 md:px-12 pb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/50 mb-4"
                    >
                        / Get In Touch
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="font-display font-bold text-5xl md:text-7xl leading-[0.9] text-foreground uppercase"
                    >
                        Let's <br />
                        <span className="text-accent">Connect</span>
                    </motion.h1>
                </div>
            </div>

            {/* Contact section component */}
            <Contact />

            {/* Back button */}
            <div className="py-16 px-6 md:px-12 bg-accent">
                <div className="max-w-4xl mx-auto">
                    <Magnetic>
                        <a href="/" className="inline-flex items-center gap-2 group">
                            <div className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center group-hover:border-background group-hover:bg-background/5 transition-colors">
                                <ArrowLeft className="w-4 h-4 text-background group-hover:scale-110 transition-transform" />
                            </div>
                            <span className="font-mono text-xs uppercase tracking-widest text-background/60 group-hover:text-background transition-colors">Back Home</span>
                        </a>
                    </Magnetic>
                </div>
            </div>

            <Footer />
        </div>
    );
}
