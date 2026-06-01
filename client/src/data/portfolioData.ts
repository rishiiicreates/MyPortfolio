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

// Import project images
import dashmetricsImg from '@/assets/images/projects/dashmetrics.png';
import nftMarketplaceImg from '@/assets/images/projects/nft-marketplace.jpeg';
import aiContentGeneratorImg from '@/assets/images/projects/ai-content-generator.jpeg';
import defiDashboardImg from '@/assets/images/projects/defi-dashboard.jpeg';
import nudgeMarketImg from '@/assets/images/projects/nudge-market-app.webp';
import houselAppImg from '@/assets/images/projects/housel-app.jpeg';

export const portfolioProjects: Project[] = [
  {
    title: "DashMetrics",
    description: "A minimal and intuitive SaaS platform designed to centralize and simplify social media analytics. It helps users track their social accounts' performance, manage saved/bookmarked content, and gain deep insights—all in one place.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "API Integration"],
    githubUrl: "https://github.com/rishiiicreates/DashMetrics-final-.git",
    liveUrl: "#projects",
    image: dashmetricsImg
  },
  {
    title: "NFT Marketplace",
    description: "A decentralized marketplace for digital artists to mint, sell, and trade NFTs with Web 3.0 integration.",
    technologies: ["React", "Solidity", "Ethereum", "Web3.js"],
    githubUrl: "https://github.com/rishiiicreates",
    liveUrl: "#projects",
    image: nftMarketplaceImg
  },
  {
    title: "Nudge: Local Market App",
    description: "A walkthrough marketplace app for local vendors and businesses, similar to McDonald's app but focused on connecting consumers with nearby stores and products in real-time.",
    technologies: ["React Native", "Firebase", "Google Maps API", "Redux", "Payment Gateway Integration"],
    githubUrl: "https://github.com/rishiiicreates",
    liveUrl: "#projects",
    image: nudgeMarketImg
  },
  {
    title: "Housel: AI Reminder App",
    description: "An intelligent reminder application that learns user's daily routines and automatically adjusts notifications based on behavior patterns and schedule changes.",
    technologies: ["React", "TypeScript", "Machine Learning", "Node.js", "MongoDB", "OpenAI API"],
    githubUrl: "https://github.com/rishiiicreates",
    liveUrl: "#projects",
    image: houselAppImg
  },
  {
    title: "AI Content Generator",
    description: "An application leveraging AI to help creators generate unique content for blogs, social media, and marketing.",
    technologies: ["Next.js", "OpenAI API", "TypeScript", "Node.js"],
    githubUrl: "https://github.com/rishiiicreates",
    liveUrl: "#projects",
    image: aiContentGeneratorImg
  },
  {
    title: "DeFi Dashboard App",
    description: "A mobile app that tracks crypto portfolios, DeFi investments, and provides real-time market analysis.",
    technologies: ["React Native", "Web3", "Firebase", "Chart.js"],
    githubUrl: "https://github.com/rishiiicreates",
    liveUrl: "#projects",
    image: defiDashboardImg
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
