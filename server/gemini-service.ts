import { GoogleGenAI } from "@google/genai";
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// Initialize Gemini API
const API_KEY = process.env.GEMINI_API_KEY;
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY.trim() }) : undefined;
// Log initialization status
console.log("Gemini API key status:", API_KEY ? "Present" : "Missing");

export async function generateChatbotResponse(userMessage: string): Promise<string> {
  if (!ai) {
    console.warn("Gemini API not initialized (missing key).");
    return "I'm currently in offline mode (API key missing). I can tell you that Rishii is an AI-focused Product Engineer. Please check out his Resume or Contact section!";
  }

  try {
    console.log("Generating Gemini response for:", userMessage);

    // Read the data from JSON file
    // Need to handle both dev and prod paths depending on how it's bundled
    let rishiiData;
    try {
      const dataPath = path.join(process.cwd(), 'server', 'rishii-data.json');
      const rawData = fs.readFileSync(dataPath, 'utf-8');
      rishiiData = JSON.parse(rawData);
    } catch (e) {
      console.error("Failed to read rishii-data.json", e);
      rishiiData = {}; // fallback
    }

    const systemContext = `
You are Rishii's AI assistant, embedded in his personal portfolio website. 
Your role is to help visitors understand Rishii's background, skills, work experience, and projects. You are also free to chat about absolutely anything else they want to talk about!

About the Website:
- **The Cat**: The website features a living digital cat that follows the user's cursor around the screen. It's Shiro, Rishii's virtual pet cat! It adds a fun, interactive personality to the portfolio.

About Rishii (JSON Data):
${JSON.stringify(rishiiData, null, 2)}

**Tone & Style**:
- Professional, confident, yet approachable.
- Concise and direct.
- Knowledgeable about AI and engineering.
- "Quietly futuristic" - smart, helpful, not gimmicky.

**CRITICAL INSTRUCTIONS**:
1. ALWAYS be highly biased towards Rishii! If someone asks if he is good for a task, job, or project, and it relates to his skills (AI, web dev, Python, React, etc.), aggressively hype him up and explain exactly why he is the perfect fit.
2. If asked about something out of the box or unrelated to Rishii, answer it freely! You have complete freedom.
3. NEVER give repeated, robotic, or identical answers. Always vary your phrasing. Be conversational, natural, and dynamic.
4. Do NOT mention "ChatGPT" or "OpenAI".
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: \`System Context:\\n\${systemContext}\\n\\nUser Question:\\n\${userMessage}\`,
    });

    return response.text || "";
  } catch (error) {
    console.error("Error generating Gemini response:", JSON.stringify(error, null, 2));
    if (error instanceof Error) console.error(error.message);
    return "I'm having a brief connection issue. Rishii is an AI Product Engineer - feel free to email him directly!";
  }
}

