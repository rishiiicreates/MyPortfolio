import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import DoodlePath from "@/components/ui/DoodlePath";
import PaperCard from "@/components/ui/PaperCard";
import { Mail, Github, Twitter, Linkedin, Instagram } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/contact", data);
      setIsSuccess(true);
      toast({
        title: "Message sent!",
        description: "I'll get back to you soon.",
        variant: "default",
      });
      setTimeout(() => {
        setIsSuccess(false);
        reset();
      }, 5000);
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later or contact me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-doodle font-bold text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="relative z-10">
            Let's Connect
            <DoodlePath color="#4ECDC4" />
          </span>
        </motion.h2>
        
        <div className="flex flex-col md:flex-row gap-10">
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <PaperCard>
              <h3 className="font-doodle text-2xl font-bold mb-6 text-primary">Send Me a Message</h3>
              
              {!isSuccess ? (
                <form onSubmit={handleSubmit(onSubmit)} className={`contact-form ${isSubmitting ? 'send-plane' : ''}`}>
                  <div className="mb-6">
                    <label htmlFor="name" className="block font-doodle mb-2">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full p-3 bg-transparent border-b-2 border-dashed border-[#4ECDC4] font-doodle focus:outline-none" 
                      placeholder="John Doe"
                      {...register("name")} 
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1 font-doodle">{errors.name.message}</p>}
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="email" className="block font-doodle mb-2">Your Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full p-3 bg-transparent border-b-2 border-dashed border-[#4ECDC4] font-doodle focus:outline-none" 
                      placeholder="john@example.com"
                      {...register("email")}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1 font-doodle">{errors.email.message}</p>}
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block font-doodle mb-2">Your Message</label>
                    <textarea 
                      id="message" 
                      rows={5} 
                      className="w-full p-3 bg-transparent border-b-2 border-dashed border-[#4ECDC4] font-doodle focus:outline-none" 
                      placeholder="I'd like to discuss a project..."
                      {...register("message")}
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1 font-doodle">{errors.message.message}</p>}
                  </div>
                  
                  <motion.button 
                    type="submit" 
                    className="bg-primary text-white font-doodle py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300 w-full flex items-center justify-center"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'} 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </motion.button>
                </form>
              ) : (
                <div className="text-center p-8">
                  <motion.div 
                    className="text-5xl text-primary mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: [0, -10, 0, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </motion.div>
                  <p className="font-doodle text-lg">Message sent! I'll get back to you soon.</p>
                </div>
              )}
            </PaperCard>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <PaperCard customClass="h-full">
              <h3 className="font-doodle text-2xl font-bold mb-6 text-[#4ECDC4]">Connect With Me</h3>
              
              <div className="space-y-6">
                <motion.div 
                  className="flex items-center"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="w-12 h-12 rounded-full bg-[#4ECDC4] flex items-center justify-center text-white mr-4">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-doodle font-bold">Email</h4>
                    <a href="mailto:rishiicreates@gmail.com" className="font-doodle text-primary hover:underline">rishiicreates@gmail.com</a>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white mr-4">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-doodle font-bold">GitHub</h4>
                    <a href="https://github.com/rishiiicreates" target="_blank" rel="noopener noreferrer" className="font-doodle text-primary hover:underline">github.com/rishiiicreates</a>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="w-12 h-12 rounded-full bg-[#FFD166] flex items-center justify-center text-[#333333] mr-4">
                    <Twitter className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-doodle font-bold">Twitter</h4>
                    <a href="https://x.com/rishiicreates?s=21" target="_blank" rel="noopener noreferrer" className="font-doodle text-primary hover:underline">@rishiicreates</a>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="w-12 h-12 rounded-full bg-[#0077B5] flex items-center justify-center text-white mr-4">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-doodle font-bold">LinkedIn</h4>
                    <a href="https://www.linkedin.com/in/rishii-creates-627a58301?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer" className="font-doodle text-primary hover:underline">Rishii Creates</a>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="w-12 h-12 rounded-full bg-[#E1306C] flex items-center justify-center text-white mr-4">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-doodle font-bold">Instagram</h4>
                    <a href="https://www.instagram.com/rishiicreatess/profilecard/?igsh=MWc0eW1senduNnVocQ==" target="_blank" rel="noopener noreferrer" className="font-doodle text-primary hover:underline">@rishiicreatess</a>
                  </div>
                </motion.div>
              </div>
            </PaperCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
