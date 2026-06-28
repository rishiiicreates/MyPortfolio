import { z } from "zod";
import { generateChatbotResponse } from "../server/gemini-service";

const chatbotSchema = z.object({
  message: z.string().min(1)
});

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const chatData = chatbotSchema.parse(req.body);

    try {
      const response = await generateChatbotResponse(chatData.message);
      return res.status(200).json({ success: true, message: response });
    } catch (aiError) {
      console.error('Gemini service error:', aiError);
      return res.status(200).json({
        success: true,
        message: "I'm having a brief connection issue. Please try again later or contact Hrishikesh directly."
      });
    }

  } catch (error) {
    console.error('Error in chat endpoint:', error);
    return res.status(400).json({ success: false, message: 'Invalid request' });
  }
}
