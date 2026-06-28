import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10)
});

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const contactData = contactSchema.parse(req.body);
    console.log('Contact form submission:', contactData);
    return res.status(200).json({ success: true, message: 'Message received successfully' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, message: 'Invalid form data', errors: error.errors });
    }
    return res.status(500).json({ success: false, message: 'Failed to process contact form submission' });
  }
}
