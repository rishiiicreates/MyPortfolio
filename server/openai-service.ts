import OpenAI from "openai";
import * as dotenv from 'dotenv';

// Load environment variables from .env file if present
dotenv.config();

// Log when initializing OpenAI (for debugging, will be removed in server logs)
console.log("OpenAI API key status:", process.env.OPENAI_API_KEY ? "Present" : "Missing");

// Initialize the OpenAI client with the API key from environment variables
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY,
});

// Define a system message that explains the chatbot's role
const systemMessage = `
You are Hrishikesh's AI assistant for his portfolio website. You should present yourself as an AI made by Hrishikesh to help visitors.

About Hrishikesh:
- He's passionate about Web 3.0 technologies
- Regarding AI, as he puts it, "AI is cool I guess"
- He enjoys app development and creating useful software
- He's skilled in JavaScript, TypeScript, React, Next.js, Node.js, and Data Structures and Algorithms (DSA)
- His email is rishiiicreates@gmail.com
- He offers web development services, UI/UX design, and full-stack development
- He creates responsive and interactive user interfaces with clean, maintainable code
- He has a keen eye for design and creates beautiful, user-friendly interfaces
- He's proficient with Figma and focuses on creating intuitive user experiences
- On the backend, he works with Node.js, designs robust APIs, and has experience with various database technologies
- He's currently a student who is passionate about web development
- He follows a collaborative approach to projects: understanding requirements, creating designs, developing iteratively, and providing ongoing support

Keep answers concise, friendly, and informative. If you don't know something, admit it and suggest contacting Hrishikesh directly. Don't make up information about Hrishikesh's specific projects or background details that weren't provided in this context.
`;

// Track API availability - if quota is exceeded, we'll use fallback responses
let openAIAvailable = true;

// Define predefined answers for common questions
const chatbotAnswers = [
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
    keywords: ["calculator", "math", "calculate"],
    answer: "Hrishikesh can certainly build a calculator application! His experience with JavaScript and interactive UIs makes creating calculators and other utility applications straightforward. He focuses on clean code and an intuitive user experience in all his projects."
  },
  {
    keywords: ["design", "ui", "ux", "user interface", "user experience", "figma"],
    answer: "Hrishikesh has a strong eye for design. He's proficient with Figma and creates intuitive, beautiful user interfaces. His UI/UX work combines aesthetic appeal with functionality, ensuring that applications are both visually appealing and easy to use."
  },
  {
    keywords: ["javascript", "js", "typescript", "ts"],
    answer: "JavaScript and TypeScript are among Hrishikesh's core skills. He uses these languages to create dynamic, interactive web applications with clean, maintainable code. His TypeScript expertise helps him build more robust applications with fewer bugs."
  },
  {
    keywords: ["react", "next.js", "nextjs", "frontend", "front-end"],
    answer: "Hrishikesh specializes in React and Next.js for frontend development. He creates responsive, interactive user interfaces with these technologies, leveraging their capabilities for efficient state management, routing, and performance optimization."
  },
  {
    keywords: ["node", "node.js", "nodejs", "backend", "back-end", "express", "server"],
    answer: "For backend development, Hrishikesh works with Node.js to create robust server-side applications. He designs efficient APIs, connects to databases, and implements secure authentication systems. His full-stack expertise enables him to build complete, cohesive applications."
  }
];

// Default answer if no keywords match
const defaultAnswer = "I don't have specific information about that. Please contact Hrishikesh directly for more detailed information, or try asking something about his skills, projects, or services!";

// Helper function to check keywords in a question
function checkKeywordMatches(question: string, keywords: string[]): number {
  const lowerQuestion = question.toLowerCase();
  return keywords.filter(keyword => lowerQuestion.includes(keyword)).length;
}

// Function to find the best matching answer based on keywords
export function findAnswer(question: string): string {
  // Convert input to lowercase for case-insensitive matching
  const lowerQuestion = question.toLowerCase();
  
  // Find the most relevant answer based on keyword matches
  let bestMatch = { answer: defaultAnswer, matchCount: 0 };
  
  for (const qa of chatbotAnswers) {
    // Count how many keywords match in the question
    const matches = checkKeywordMatches(question, qa.keywords);
    
    // Update best match if this answer has more matching keywords
    if (matches > 0 && matches > bestMatch.matchCount) {
      bestMatch = { answer: qa.answer, matchCount: matches };
    }
  }
  
  return bestMatch.answer;
}

/**
 * Generates a response using OpenAI's GPT model for the chatbot
 * @param userMessage - The message sent by the user
 * @returns A promise resolving to the AI-generated response
 */
export async function generateChatbotResponse(userMessage: string): Promise<string> {
  console.log("Generating chatbot response for:", userMessage);
  
  // First, check for exact matches in our predefined answers before using OpenAI
  const localAnswer = findAnswer(userMessage);
  
  // If we have an exact match that's not the default answer, return it immediately for efficiency
  if (localAnswer !== defaultAnswer) {
    console.log("Found exact predefined answer, using local response");
    return localAnswer;
  }
  
  // If OpenAI is not available, provide a more specific, helpful message
  if (!openAIAvailable) {
    console.log("OpenAI not available, using general fallback");
    return "I don't have specific information about that, but I'd be happy to tell you about Hrishikesh's skills, projects, or experience. Is there something specific about Hrishikesh that you'd like to know?";
  }

  try {
    console.log("No exact match found. Attempting to use OpenAI API...");
    
    // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Using a more economical model to avoid quota issues
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: userMessage }
      ],
      temperature: 0.7,
      max_tokens: 300, // Keep responses relatively concise
    });

    const responseText = response.choices[0].message.content || "I'm sorry, I couldn't generate a response. Please try again.";
    console.log("OpenAI response received successfully");
    return responseText;
  } catch (error: any) {
    console.error("Error generating OpenAI response:", error);
    
    // Check if this is a quota error
    if (
      error.status === 429 || 
      (error.error && error.error.type === "insufficient_quota") ||
      (error.message && error.message.includes("quota"))
    ) {
      console.log("OpenAI quota exceeded, switching to fallback mode");
      openAIAvailable = false;
    }
    
    // Provide a helpful error message that sounds natural
    return "I'm sorry, I'm not able to answer that specific question right now. I can tell you about Hrishikesh's skills, projects, or experience if you're interested in learning more about those topics.";
  }
}

// Legacy function for backward compatibility
export function getFallbackResponse(question: string): string {
  return findAnswer(question);
}