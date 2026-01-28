import { motion } from "framer-motion";
import { ArrowLeft, Anchor, Map, Ship, Skull } from "lucide-react";
import Magnetic from "@/components/Magnetic";

const journeyMap = [
    {
        title: "The Call to Adventure",
        subtitle: "Started Coding",
        desc: "Found the Devil Fruit of Logic. Realized lines of code could warp reality.",
        icon: <Ship className="w-6 h-6" />
    },
    {
        title: "Navigating the Blue",
        subtitle: "Studied Design",
        desc: "Learned to read the winds of User Experience. Function needs Form to sail.",
        icon: <Map className="w-6 h-6" />
    },
    {
        title: "Entering the Grand Line",
        subtitle: "Dove into AI/ML",
        desc: "Taming sea kings made of Neural Networks. Teaching silicon to dream.",
        icon: <Skull className="w-6 h-6" />
    },
    {
        title: "New World Captain",
        subtitle: "Present Day",
        desc: "Sailing the edge of innovation. Building systems that defy the World Government of boring apps.",
        icon: <Anchor className="w-6 h-6" />
    }
];

export default function Journey() {
    return (
        <section className="min-h-screen bg-[#E0F4FF] text-[#1a1a1a] font-sans selection:bg-[#FFD700] selection:text-black overflow-hidden relative">

            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none"
                style={{ backgroundImage: "radial-gradient(#87CEEB 2px, transparent 2px)", backgroundSize: "40px 40px" }} />

            {/* Floating Elements (Clouds) */}
            <motion.div
                animate={{ x: [0, 100, 0] }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute top-20 left-10 opacity-60"
            >
                <img src="https://cdn-icons-png.flaticon.com/512/1163/1163624.png" className="w-32" alt="cloud" />
            </motion.div>

            <div className="container mx-auto px-6 md:px-12 py-12 relative z-10">

                {/* Back Home */}
                <Magnetic>
                    <a href="/about" className="inline-flex items-center gap-2 group mb-12 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200">
                        <ArrowLeft className="w-5 h-5 text-blue-600 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-bold uppercase tracking-wider text-sm text-blue-900">Return to Port</span>
                    </a>
                </Magnetic>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Visual Side */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ type: "spring", bounce: 0.5 }}
                        className="relative"
                    >
                        <div className="border-[12px] border-white shadow-2xl rounded-sm transform rotate-2 bg-white p-2 pb-12">
                            <img
                                src="/journey_one_piece_adventure.png"
                                alt="Anime Style Journey"
                                className="w-full h-auto border-4 border-[#1a1a1a]"
                            />
                            <h1 className="font-display font-black text-4xl mt-4 text-center uppercase tracking-tighter text-[#1a1a1a] drop-shadow-sm">
                                The Pirate Log
                            </h1>
                        </div>

                        {/* Wanted Poster Badge */}
                        <motion.div
                            animate={{ rotate: [0, 10, 0] }}
                            transition={{ duration: 5, repeat: Infinity }}
                            className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-400 rounded-full flex items-center justify-center border-4 border-black border-dashed shadow-lg"
                        >
                            <span className="font-black text-center leading-none text-xs transform -rotate-12">
                                BOUNTY<br /><span className="text-2xl">∞</span><br />BERRIES
                            </span>
                        </motion.div>
                    </motion.div>

                    {/* Timeline Side */}
                    <div className="space-y-12">
                        {journeyMap.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                className="flex gap-6 group"
                            >
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 bg-white border-4 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:translate-y-1 group-hover:shadow-none transition-all">
                                        {item.icon}
                                    </div>
                                    {i !== journeyMap.length - 1 && <div className="w-1 h-full bg-black/20 my-2 border-l-2 border-dashed border-black/30" />}
                                </div>

                                <div className="bg-white p-6 border-2 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(255,26,0,0.8)] w-full group-hover:shadow-[4px_4px_0px_0px_rgba(255,26,0,0.8)] group-hover:translate-x-1 group-hover:translate-y-1 transition-all">
                                    <span className="font-mono text-xs font-bold text-red-600 uppercase tracking-widest bg-red-100 px-2 py-1 rounded inline-block mb-2">
                                        {item.subtitle}
                                    </span>
                                    <h3 className="font-display font-black text-2xl uppercase mb-2 text-[#1a1a1a]">
                                        {item.title}
                                    </h3>
                                    <p className="font-sans font-medium text-gray-700 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>

            </div>
        </section>
    );
}
