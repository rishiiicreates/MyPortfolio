import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { generateChatbotResponse } from "./gemini-service";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10)
});

const chatbotSchema = z.object({
  message: z.string().min(1)
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form endpoint
  app.post('/api/contact', async (req, res) => {
    try {
      const contactData = contactSchema.parse(req.body);
      console.log('Contact form submission:', contactData);
      res.status(200).json({ success: true, message: 'Message received successfully' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, message: 'Invalid form data', errors: error.errors });
      }
      res.status(500).json({ success: false, message: 'Failed to process contact form submission' });
    }
  });

  // Chatbot endpoints
  app.post('/api/chat', async (req, res) => {
    try {
      const chatData = chatbotSchema.parse(req.body);

      try {
        const response = await generateChatbotResponse(chatData.message);
        res.status(200).json({ success: true, message: response });
      } catch (aiError) {
        console.error('Gemini service error:', aiError);
        res.status(200).json({
          success: true,
          message: "I'm having a brief connection issue. Please try again later or contact Hrishikesh directly."
        });
      }

    } catch (error) {
      console.error('Error in chat endpoint:', error);
      res.status(400).json({ success: false, message: 'Invalid request' });
    }
  });

  // Legacy support
  app.post('/api/chatbot', async (req, res) => {
    res.redirect(307, '/api/chat');
  });

  const httpServer = createServer(app);
  return httpServer;
}

