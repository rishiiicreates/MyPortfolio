import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { generateChatbotResponse, getFallbackResponse } from "./openai-service";

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
      // Validate request body
      const contactData = contactSchema.parse(req.body);
      
      // In a real application, you would send an email here
      // For now, we'll just log the contact information
      console.log('Contact form submission:', contactData);
      
      // Return success response
      res.status(200).json({ 
        success: true, 
        message: 'Message received successfully' 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid form data', 
          errors: error.errors 
        });
      }
      
      res.status(500).json({ 
        success: false, 
        message: 'Failed to process contact form submission' 
      });
    }
  });

  // Chatbot endpoints - supporting both /api/chatbot and /api/chat paths
  app.post('/api/chat', async (req, res) => {
    try {
      // Validate request body
      const chatData = chatbotSchema.parse(req.body);
      const userMessage = chatData.message;
      
      // Log incoming messages (for debugging)
      console.log('Chat received message:', userMessage);
      
      try {
        // Generate response using OpenAI or fallback to predefined answers
        const response = await generateChatbotResponse(userMessage);
        
        // Return the generated response
        res.status(200).json({ 
          success: true, 
          message: response 
        });
      } catch (aiError) {
        // Log the specific OpenAI error
        console.error('OpenAI service error:', aiError);
        
        // If our main chatbot response function fails, try the direct fallback
        const fallbackResponse = getFallbackResponse(userMessage);
        
        // Still return a 200 response with the fallback message
        res.status(200).json({ 
          success: true, 
          message: fallbackResponse 
        });
      }
      
    } catch (error) {
      console.error('Error in chat endpoint:', error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid chat message', 
          errors: error.errors 
        });
      }
      
      // If we reach here, it's a server error, but still try to give a helpful response
      const fallbackResponse = "I'm having trouble processing your message. Please try again with a simpler question.";
      
      res.status(200).json({ 
        success: true, 
        message: fallbackResponse 
      });
    }
  });
  
  // Keep the original endpoint for backward compatibility
  app.post('/api/chatbot', async (req, res) => {
    try {
      // Validate request body
      const chatData = chatbotSchema.parse(req.body);
      const userMessage = chatData.message;
      
      // Log incoming messages (for debugging, can be removed in production)
      console.log('Chatbot received message:', userMessage);
      
      try {
        // Our updated generateChatbotResponse first checks if we have a predefined answer
        // If not, it will use OpenAI to generate a response
        // This approach ensures seamless integration of AI without changing the user experience
        const response = await generateChatbotResponse(userMessage);
        
        // Return the generated response
        res.status(200).json({ 
          success: true, 
          message: response 
        });
      } catch (aiError) {
        // Log the specific OpenAI error
        console.error('OpenAI service error:', aiError);
        
        // If our main chatbot response function fails, try the direct fallback
        // This shouldn't normally happen since generateChatbotResponse has its own error handling
        const fallbackResponse = getFallbackResponse(userMessage);
        
        // Still return a 200 response with the fallback message
        res.status(200).json({ 
          success: true, 
          message: fallbackResponse 
        });
      }
      
    } catch (error) {
      console.error('Error in chatbot endpoint:', error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid chatbot message', 
          errors: error.errors 
        });
      }
      
      // If we reach here, it's a server error, but still try to give a helpful response
      const fallbackResponse = "I'm having trouble processing your message. Please try again with a simpler question.";
      
      res.status(200).json({ 
        success: true, 
        message: fallbackResponse 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
