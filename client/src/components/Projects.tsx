import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

const projects = [
  {
    id: "01",
    title: "RAWFY",
    category: "AI Web Perception",
    image: "/rawfy.jpeg",
    description: "Universal web perception skill for AI agents — converts any URL into structured, agent-readable content with described images, transcribed video, and interactive element maps.",
    tech: ["Python", "AI", "Web Scraping"],
    link: "https://github.com/rishiiicreates/rawfy",
    colSpan: "col-span-1 md:col-span-8",
    parallaxSpeed: 0.1
  },
  {
    id: "02",
    title: "DOUBT SOLVER",
    category: "RAG-Powered Academic Assistant",
    image: "/docmind.png",
    description: "A local Retrieval-Augmented Generation (RAG) pipeline using LangChain and Ollama to process academic queries across a 229-unit vector knowledge base. Features semantic search with ChromaDB, cosine similarity thresholding, and real-time streaming chat interface.",
    tech: ["Python", "LangChain", "ChromaDB", "Ollama", "Streamlit"],
    link: "https://github.com/rishiiicreates/srm-doubt-solver",
    colSpan: "col-span-1 md:col-span-4",
    parallaxSpeed: 0.2
  },
  {
    id: "03",
    title: "EMAIL TRIAGE AGENT",
    category: "AI Agent Benchmarking",
    image: "/email-triage-agent.jpeg",
    description: "An OpenEnv-compliant benchmarking API using FastAPI and Docker to evaluate LLM agents on multi-step reasoning, semantic routing, and PII detection. Features dense step-reward function and deterministic synthetic data pipeline.",
    tech: ["Python", "FastAPI", "Docker", "Hugging Face"],
    link: "https://github.com/rishiiicreates/email-triage-env",
    colSpan: "col-span-1 md:col-span-8",
    parallaxSpeed: 0.1
  },
  {
    id: "04",
    title: "DASHMETRICS",
    category: "SaaS Analytics Platform",
    image: "/dashmetrics.png",
    description: "A comprehensive social media analytics dashboard for creators and brands. Real-time ingestion pipelines processing 50k+ events/sec using Python and AWS.",
    tech: ["Next.js", "TypeScript", "Python", "AWS"],
    link: "https://github.com/rishiiicreates",
    colSpan: "col-span-1 md:col-span-4",
    parallaxSpeed: 0.1
  },
  {
    id: "05",
    title: "HOUSEL",
    category: "AI Smart Home App",
    image: "/housel.png",
    description: "An adaptive smart home control interface powered by on-device AI. learns user habits to automate climate and lighting.",
    tech: ["React Native", "TensorFlow Lite", "Node.js"],
    link: "https://github.com/rishiiicreates",
    colSpan: "col-span-1 md:col-span-8",
    parallaxSpeed: 0.2
  },
  {
    id: "06",
    title: "NEURALFLUX",
    category: "Generative Art Engine",
    image: "/neuralflux.png",
    description: "A node-based generative art platform using stable diffusion pipelines. Allows real-time parameter tweaking for digital artists.",
    tech: ["WebGL", "Three.js", "Python Fast API"],
    link: "https://github.com/rishiiicreates",
    colSpan: "col-span-1 md:col-span-4",
    parallaxSpeed: 0.05
  },
  {
    id: "07",
    title: "3D SOLAR SYSTEM",
    category: "Interactive 3D Web Experience",
    image: "/webgl.png",
    description: "A 3D solar system simulation featuring planetary orbits, interactive controls, and realistic textures.",
    tech: ["Three.js", "WebGL", "Vite"],
    link: "https://the-pro-astronauts.vercel.app/",
    colSpan: "col-span-1 md:col-span-12",
    parallaxSpeed: 0
  }
];

function ParallaxProject({ project, index }: { project: any, index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    x.set(xPct * 10); // Tilt amount
    y.set(yPct * 10);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  // Calculate parallax offset based on speed
  const parallaxY = useTransform(scrollYProgress, [0, 1], [50 * project.parallaxSpeed, -50 * project.parallaxSpeed]);

  return (
    <motion.div
      ref={ref}
      style={{ y: parallaxY }}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
      className={`group relative ${project.colSpan} perspective-1000`}
    >
      <motion.a
        href={project.link}
        className="block cursor-none-hover"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: mouseY.get() * -1, // Invert for natural feel
          rotateY: mouseX,
          transformStyle: "preserve-3d"
        }}
      >
        {/* Image Container */}
        <div className="relative overflow-hidden w-full aspect-[16/10] mb-6 border border-border/50 bg-secondary/5" style={{ transform: "translateZ(0)" }}>
          <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-500 z-10" />
          <motion.img
            src={project.image}
            alt={project.title}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full h-full object-cover filter grayscale-[10%] group-hover:grayscale-0"
          />

          {/* Floating Action Button - 3D Pop */}
          <div className="absolute top-4 right-4 w-12 h-12 bg-background rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 z-20 shadow-lg border border-border"
            style={{ transform: "translateZ(20px)" }}
          >
            <ArrowUpRight className="w-5 h-5 text-accent" />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2 relative z-20" style={{ transform: "translateZ(10px)" }}>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-accent font-bold">
              ({project.id})
            </span>
            <span className="font-mono text-xs text-foreground/60 uppercase tracking-widest">
              {project.category}
            </span>
          </div>

          <h3 className="font-display font-bold text-3xl md:text-5xl text-foreground group-hover:text-accent transition-colors">
            {project.title}
          </h3>

          <p className="font-sans text-foreground/70 max-w-xl text-lg mt-2 line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {project.tech.map((t: string, i: number) => (
              <span key={i} className="px-3 py-1 border border-border text-[10px] uppercase tracking-wider font-mono text-foreground/60 bg-background/50">
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.a>
    </motion.div>
  );
}

export default function Work() {
  return (
    <section id="projects" className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-32 border-b border-muted pb-8">
          <h2 className="font-display font-bold text-6xl md:text-8xl uppercase text-foreground leading-[0.85] tracking-tighter">
            Selected <br /> <span className="text-accent">Work</span>
          </h2>
          <span className="font-mono text-sm text-foreground/60 uppercase tracking-widest mt-6 md:mt-0">
            (2024 - 2026)
          </span>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-y-32">
          {projects.map((project, index) => (
            <ParallaxProject key={project.id} project={project} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
