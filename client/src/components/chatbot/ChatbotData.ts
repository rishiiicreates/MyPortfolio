// Predefined answers for common questions
interface ChatAnswer {
  keywords: string[];
  answer: string;
}

export const chatbotAnswers: ChatAnswer[] = [
  {
    keywords: ["hello", "hi", "hey", "greetings"],
    answer: "Hey there! I'm Hrishikesh's AI assistant. How can I help you today? You can ask me about Hrishikesh's skills, experience, or projects!"
  },
  {
    keywords: ["name", "who are you", "what's your name"],
    answer: "I'm Hrishikesh's AI assistant. I'm here to help answer questions about Hrishikesh, his skills, and his services!"
  },
  {
    keywords: ["contact", "email", "reach", "hire"],
    answer: "You can contact Hrishikesh via email at rishiiicreates@gmail.com or through any of the social media platforms listed in the Contact section."
  },
  {
    keywords: ["skills", "expertise", "what can you do", "capabilities", "languages"],
    answer: "Hrishikesh is passionate about Web 3.0, AI, and app development. He's skilled in JavaScript, TypeScript, React, Next.js, Node.js, and Data Structures and Algorithms (DSA). As he says, 'AI is cool I guess.'"
  },
  {
    keywords: ["projects", "portfolio", "work", "experience"],
    answer: "Hrishikesh has worked on various projects showcased in the Projects section. Each project highlights different skills and technologies. Feel free to check them out for a better understanding of his work!"
  },
  {
    keywords: ["services", "offer", "provide", "help with"],
    answer: "Hrishikesh offers web development services, UI/UX design, and full-stack development. Whether you need a new website, a redesign, or help with a specific technical challenge, he can assist!"
  },
  {
    keywords: ["react", "frontend", "javascript", "html", "css"],
    answer: "Hrishikesh is an excellent frontend developer with strong skills in React, HTML/CSS, and JavaScript. He creates responsive and interactive user interfaces with clean, maintainable code."
  },
  {
    keywords: ["design", "ui", "ux", "figma", "interface"],
    answer: "Hrishikesh has a keen eye for design and creates beautiful, user-friendly interfaces. He's proficient with Figma and focuses on creating intuitive user experiences with engaging animations."
  },
  {
    keywords: ["backend", "server", "database", "api", "node"],
    answer: "On the backend, Hrishikesh works with Node.js, designs robust APIs, and has experience with various database technologies to create complete, full-stack applications."
  },
  {
    keywords: ["education", "background", "learn", "study", "student"],
    answer: "Hrishikesh is currently a student who is passionate about web development. He's continuously learning and improving his skills through practical projects, online courses, and keeping up with the latest trends in technology."
  },
  {
    keywords: ["process", "workflow", "approach", "methodology"],
    answer: "Hrishikesh follows a collaborative approach to projects. He begins with understanding requirements, creates designs, develops the solution iteratively with client feedback, and provides ongoing support."
  },
  {
    keywords: ["availability", "timeline", "schedule", "when"],
    answer: "For information about Hrishikesh's current availability and project timelines, please contact him directly through the Contact section."
  },
  {
    keywords: ["price", "cost", "rates", "charge", "quote", "pricing"],
    answer: "Pricing varies based on project scope, complexity, and timeline. For a personalized quote, please reach out to Hrishikesh directly with details about your project."
  },
  {
    keywords: ["one piece", "straw hat", "luffy", "pirate", "anime"],
    answer: "Ah, I see you've noticed the One Piece Easter eggs in the portfolio! Hrishikesh is a big fan of the adventure and determination shown in the series. Just like Luffy, he's passionate about his journey in web development!"
  },
  {
    keywords: ["web 3.0", "web3", "blockchain", "crypto", "nft"],
    answer: "Hrishikesh is passionate about Web 3.0 technologies. He's exploring blockchain applications, decentralized apps, and the future of the internet. Ask him about his projects in this exciting space!"
  },
  {
    keywords: ["ai", "artificial intelligence", "machine learning", "ml"],
    answer: "AI is a major interest for Hrishikesh. As he puts it, 'AI is cool I guess.' He's exploring AI applications in web development and building tools that leverage machine learning capabilities."
  },
  {
    keywords: ["app", "application", "mobile", "development", "software"],
    answer: "App development is one of Hrishikesh's core skills. He creates seamless, user-friendly applications with modern tech stacks and focuses on delivering exceptional user experiences across platforms."
  },
  {
    keywords: ["thank", "thanks", "appreciate", "helpful"],
    answer: "You're welcome! If you have any more questions or want to discuss a project with Hrishikesh, feel free to reach out through the contact information provided. Have a great day!"
  }
];

// Function to find the best matching answer
export function findAnswer(question: string): string {
  // Default answer if no keywords match
  const defaultAnswer = "I don't have specific information about that. Please contact Hrishikesh directly for more detailed information, or try asking something about his skills, projects, or services!";
  
  // Convert input to lowercase for case-insensitive matching
  const lowerQuestion = question.toLowerCase();
  
  // Find the most relevant answer based on keyword matches
  let bestMatch = { answer: defaultAnswer, matchCount: 0 };
  
  chatbotAnswers.forEach(qa => {
    // Count how many keywords match in the question
    const matches = qa.keywords.filter(keyword => lowerQuestion.includes(keyword)).length;
    
    // Update best match if this answer has more matching keywords
    if (matches > 0 && matches > bestMatch.matchCount) {
      bestMatch = { answer: qa.answer, matchCount: matches };
    }
  });
  
  return bestMatch.answer;
}