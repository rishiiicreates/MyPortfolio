import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Gemini API
const API_KEY = process.env.GEMINI_API_KEY;
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY.trim()) : undefined;
const model = genAI ? genAI.getGenerativeModel({ model: "gemini-2.5-flash" }) : undefined;

// Log initialization status
console.log("Gemini API key status:", API_KEY ? "Present" : "Missing");

const systemContext = `
You are Hrishikesh's AI assistant, embedded in his personal portfolio website. 
Your role is to help visitors understand Hrishikesh's background, skills, and projects.

About Hrishikesh:
- **Profile**: AI-focused Product Engineer & Machine Learning Practitioner.
- **Education**: Computer Science with Minor in AI/ML.
- **Key Skills**: 
    - AI/ML: Neural Networks, RAG Pipelines, GenAI Agents, TensorFlow, PyTorch.
    - Engineering: Scalable SaaS Architecture, Python, Next.js, TypeScript.
    - Design: Clean UI/UX, Design Systems.

- **Key Projects**:
    - **DashMetrics**: Social media analytics SaaS (Real-time events).
    - **Housel**: AI-powered adaptive smart home app.
    - **DocMind**: Enterprise RAG system for intelligent document processing.
    - **NeuralFlux**: Generative art engine using stable diffusion pipelines.
    - **AI Agentic**: Autonomous LLM agent framework.

**Tone & Style**:
- Professional, confident, yet approachable.
- Concise and direct.
- Knowledgeable about AI and engineering.
- "Quietly futuristic" - smart, helpful, not gimmicky.

**Instructions**:
- Answer questions based ONLY on the provided context or general knowledge about tech stacks mentioned.
- If asked about something unrelated (e.g., world history), politely steer back to Hrishikesh's work.
- If you don't know the answer, suggest they contact Hrishikesh directly.
- Do NOT mention "ChatGPT" or "OpenAI". You are powered by Google Gemini.
`;

export async function generateChatbotResponse(userMessage: string): Promise<string> {
  if (!model) {
    console.warn("Gemini API not initialized (missing key).");
    return "I'm currently in offline mode (API key missing). I can tell you that Hrishikesh is an AI-focused Product Engineer. Please check out his Resume or Contact section!";
  }

  try {
    console.log("Generating Gemini response for:", userMessage);

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemContext }],
        },
        {
          role: "model",
          parts: [{ text: "Understood. I am ready to answer questions about Hrishikesh as his AI assistant." }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 300,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(userMessage);
    const response = result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("Error generating Gemini response:", JSON.stringify(error, null, 2));
    if (error instanceof Error) console.error(error.message);
    return "I'm having a brief connection issue. Hrishikesh is a Machine Learning Practitioner and Product Engineer - feel free to email him directly!";
  }
}
