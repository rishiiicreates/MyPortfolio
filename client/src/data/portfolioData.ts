export interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  image?: string;
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
}

export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  description: string;
  skills: string[];
  image?: string;
}

export const portfolioProjects: Project[] = [
  {
    title: "RAWFY",
    description: "Universal web perception skill for AI agents — converts any URL into structured, agent-readable content with described images, transcribed video, and interactive element maps.",
    technologies: ["Python", "AI", "Web Scraping"],
    githubUrl: "https://github.com/rishiiicreates/rawfy",
    liveUrl: "https://github.com/rishiiicreates/rawfy",
    image: "/rawfy.jpeg"
  },
  {
    title: "DOUBT SOLVER",
    description: "A local Retrieval-Augmented Generation (RAG) pipeline using LangChain and Ollama to process academic queries across a 229-unit vector knowledge base.",
    technologies: ["Python", "LangChain", "ChromaDB", "Ollama", "Streamlit"],
    githubUrl: "https://github.com/rishiiicreates/srm-doubt-solver",
    liveUrl: "https://github.com/rishiiicreates/srm-doubt-solver",
    image: "/docmind.png"
  },
  {
    title: "EMAIL TRIAGE AGENT",
    description: "An OpenEnv-compliant benchmarking API using FastAPI and Docker to evaluate LLM agents on multi-step reasoning, semantic routing, and PII detection.",
    technologies: ["Python", "FastAPI", "Docker", "Hugging Face"],
    githubUrl: "https://github.com/rishiiicreates/email-triage-env",
    liveUrl: "https://github.com/rishiiicreates/email-triage-env",
    image: "/email-triage-agent.jpeg"
  },
  {
    title: "DASHMETRICS",
    description: "A comprehensive social media analytics dashboard for creators and brands. Real-time ingestion pipelines processing 50k+ events/sec using Python and AWS.",
    technologies: ["Next.js", "TypeScript", "Python", "AWS"],
    githubUrl: "https://github.com/rishiiicreates",
    liveUrl: "https://github.com/rishiiicreates",
    image: "/dashmetrics.png"
  },
  {
    title: "HOUSEL",
    description: "An adaptive smart home control interface powered by on-device AI. learns user habits to automate climate and lighting.",
    technologies: ["React Native", "TensorFlow Lite", "Node.js"],
    githubUrl: "https://github.com/rishiiicreates",
    liveUrl: "https://github.com/rishiiicreates",
    image: "/housel.png"
  },
  {
    title: "NEURALFLUX",
    description: "A node-based generative art platform using stable diffusion pipelines. Allows real-time parameter tweaking for digital artists.",
    technologies: ["WebGL", "Three.js", "Python Fast API"],
    githubUrl: "https://github.com/rishiiicreates",
    liveUrl: "https://github.com/rishiiicreates",
    image: "/neuralflux.png"
  },
  {
    title: "3D SOLAR SYSTEM",
    description: "A 3D solar system simulation featuring planetary orbits, interactive controls, and realistic textures.",
    technologies: ["Three.js", "WebGL", "Vite"],
    githubUrl: "https://github.com/rishiiicreates",
    liveUrl: "https://the-pro-astronauts.vercel.app/",
    image: "/webgl.png"
  }
];

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director, TechStart",
    text: "Hrishikesh has an incredible eye for detail. The website they built for us exceeded our expectations both visually and functionally!"
  },
  {
    name: "Alex Chen",
    role: "Product Owner, HealthApp",
    text: "Working with Hrishikesh was a breeze. They understood our vision immediately and delivered a product that our users absolutely love."
  },
  {
    name: "Maya Patel",
    role: "UX Lead, CreativeStudio",
    text: "The playful animations and interactions Hrishikesh added to our website have significantly increased user engagement and time on site."
  }
];

// Import certificate images
// Using placeholder URLs for certificate images until real assets are provided
import reactCertImg from '@/assets/images/projects/dashmetrics.png'; // Temporarily reusing project image
import awsCertImg from '@/assets/images/projects/nft-marketplace.jpeg'; // Temporarily reusing project image
import fullstackCertImg from '@/assets/images/projects/ai-content-generator.jpeg'; // Temporarily reusing project image
import aiCertImg from '@/assets/images/projects/defi-dashboard.jpeg'; // Temporarily reusing project image
import nudgeCertImg from '@/assets/images/projects/nudge-market-app.webp'; // Temporarily reusing project image

export const certificates: Certificate[] = [
  {
    title: "Data Science Certification",
    issuer: "IBM",
    date: "2025",
    description: "Professional certification in data science covering data analysis, machine learning, and data-driven decision making with industry-standard tools and frameworks.",
    skills: ["Data Science", "Python", "Machine Learning", "Data Analysis", "Statistical Modeling"],
    image: reactCertImg
  },
  {
    title: "AI & Machine Learning Fundamentals",
    issuer: "DeepLearning.AI",
    date: "2025",
    description: "Specialization covering machine learning, neural networks, and practical AI implementation with industry-standard frameworks.",
    skills: ["Machine Learning", "Python", "TensorFlow", "Neural Networks", "Deep Learning"],
    image: aiCertImg
  },
  {
    title: "SURE Trust Shortlist",
    issuer: "Generative AI & VLSI Design",
    date: "2025",
    description: "Shortlisted for the SURE Trust program focused on Generative AI and VLSI Design, demonstrating competency in cutting-edge AI technologies and hardware design.",
    skills: ["Generative AI", "VLSI Design", "AI Research", "Hardware Design"],
    image: awsCertImg
  },
  {
    title: "MSME & Skill India Certification",
    issuer: "Government of India",
    date: "January 2026",
    description: "Certification under the MSME & Skill India initiative, validating professional skills and entrepreneurial capabilities in the technology sector.",
    skills: ["Professional Development", "Skill Certification", "Technology", "Entrepreneurship"],
    image: fullstackCertImg
  },
  {
    title: "Google Cloud Study Jam",
    issuer: "Google Cloud",
    date: "October 2025",
    description: "Completed Google Cloud Study Jam program, gaining hands-on experience with Google Cloud Platform services, cloud infrastructure, and modern cloud-native development practices.",
    skills: ["Google Cloud", "Cloud Infrastructure", "Cloud Computing", "DevOps"],
    image: nudgeCertImg
  }
];
