// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";
import { z } from "zod";

// server/gemini-service.ts
import { GoogleGenAI } from "@google/genai";
import * as dotenv from "dotenv";
dotenv.config();
var API_KEY = process.env.GEMINI_API_KEY;
var ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY.trim() }) : void 0;
console.log("Gemini API key status:", API_KEY ? "Present" : "Missing");
var systemContext = `
You are Hrishikesh Yadav's AI assistant, embedded in his personal portfolio website. 
Your role is to help visitors understand Hrishikesh's background, skills, work experience, and projects.

About Hrishikesh Yadav:
- **Contact**: +91 8960548709 | rishiicreates@gmail.com | https://rishiicreaetes.vercel.app/ | https://github.com/rishiiicreates
- **Education**: 
  - SRM Institute of Science and Technology: B.Tech in Computer Science and Technology (2025-2029)
  - Indian Institute of Technology, Guwahati: BS in Artificial Intelligence and Machine Learning (2025-2027)
- **Key Skills**: 
    - Languages: C++, Python, JavaScript/TypeScript, SQL.
    - Frameworks & Libraries: React, Next.js, Node.js, TensorFlow, Scikit-Learn, Matplotlib, MatLab.
    - Tools & Cloud: AWS, Firebase, Vercel, Render, Git/GitHub, Docker, Kubernetes.

- **Work Experience**:
    - IBM | AI Automation Intern (May 2026 - Present): Developing automated workflows connecting systems with AI models, eliminating manual data entry bottlenecks.
    - IBM | AI Strategy and Business Intelligence Intern (Dec 2025 - Apr 2026): Trained XGBoost classifier (87% F1-score), deployed scalable inference APIs (FastAPI, Docker, Render), engineered automated data pipelines with LLMs & TensorFlow.
    - Wildish & Co. | Generative AI Engineer (Freelance) (Oct 2024 - Aug 2025): Developed AI-driven automated debugging pipeline, fine-tuned transformer models for anomaly detection.

- **Key Projects**:
    - RAWFY: Universal web perception skill for AI agents \u2014 converts any URL into structured, agent-readable content. (Python, AI, Web Scraping)
    - DOUBT SOLVER: Local RAG pipeline using LangChain and Ollama for academic queries across a vector knowledge base. (Python, LangChain, ChromaDB, Ollama, Streamlit)
    - EMAIL TRIAGE AGENT: OpenEnv-compliant benchmarking API to evaluate LLM agents on reasoning and routing. (Python, FastAPI, Docker, Hugging Face)
    - DASHMETRICS: SaaS social media analytics platform processing 50k+ events/sec. (Next.js, TypeScript, Python, AWS)
    - HOUSEL: Adaptive smart home control interface powered by on-device AI. (React Native, TensorFlow Lite, Node.js)
    - NEURALFLUX: Node-based generative art platform using stable diffusion pipelines. (WebGL, Three.js, Python Fast API)
    - 3D SOLAR SYSTEM: Interactive 3D solar system simulation with planetary orbits and realistic textures. (Three.js, WebGL, Vite)

- **Certifications**: Data Science Certification (IBM), AI & Machine Learning Fundamentals (DeepLearning.AI), SURE Trust Shortlist (Generative AI & VLSI Design), MSME & Skill India Certification, Google Cloud Study Jam.

**Tone & Style**:
- Professional, confident, yet approachable.
- Concise and direct.
- Knowledgeable about AI and engineering.
- "Quietly futuristic" - smart, helpful, not gimmicky.

**Instructions**:
- Answer questions based ONLY on the provided context or general knowledge about tech stacks mentioned.
- If asked about something unrelated (e.g., world history), politely steer back to Hrishikesh's work.
- If you don't know the answer, suggest they contact Hrishikesh directly.
- Do NOT mention "ChatGPT" or "OpenAI".
`;
async function generateChatbotResponse(userMessage) {
  if (!ai) {
    console.warn("Gemini API not initialized (missing key).");
    return "I'm currently in offline mode (API key missing). I can tell you that Hrishikesh is an AI-focused Product Engineer. Please check out his Resume or Contact section!";
  }
  try {
    console.log("Generating Gemini response for:", userMessage);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: `System Context:
${systemContext}

User Question:
${userMessage}`
    });
    return response.text || "";
  } catch (error) {
    console.error("Error generating Gemini response:", JSON.stringify(error, null, 2));
    if (error instanceof Error) console.error(error.message);
    return "I'm having a brief connection issue. Hrishikesh is an AI Product Engineer - feel free to email him directly!";
  }
}

// server/routes.ts
var contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10)
});
var chatbotSchema = z.object({
  message: z.string().min(1)
});
async function registerRoutes(app2) {
  app2.post("/api/contact", async (req, res) => {
    try {
      const contactData = contactSchema.parse(req.body);
      console.log("Contact form submission:", contactData);
      res.status(200).json({ success: true, message: "Message received successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, message: "Invalid form data", errors: error.errors });
      }
      res.status(500).json({ success: false, message: "Failed to process contact form submission" });
    }
  });
  app2.post("/api/chat", async (req, res) => {
    try {
      const chatData = chatbotSchema.parse(req.body);
      try {
        const response = await generateChatbotResponse(chatData.message);
        res.status(200).json({ success: true, message: response });
      } catch (aiError) {
        console.error("Gemini service error:", aiError);
        res.status(200).json({
          success: true,
          message: "I'm having a brief connection issue. Please try again later or contact Hrishikesh directly."
        });
      }
    } catch (error) {
      console.error("Error in chat endpoint:", error);
      res.status(400).json({ success: false, message: "Invalid request" });
    }
  });
  app2.post("/api/chatbot", async (req, res) => {
    res.redirect(307, "/api/chat");
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2, { dirname as dirname2 } from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets")
    }
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = dirname2(__filename2);
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        __dirname2,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname2, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
import dotenv2 from "dotenv";
dotenv2.config();
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5001;
  server.listen({
    port,
    host: "0.0.0.0"
  }, () => {
    log(`serving on port ${port}`);
  });
})();
