import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, ArrowRight } from "lucide-react";
import { findAnswer } from "./ChatbotData";
import profilePhotoPath from "@/assets/images/profile-photo.jpeg";
import { useTheme } from "@/hooks/use-theme";
import { apiRequest } from "@/lib/queryClient";

// Flag to control whether to use OpenAI first or local matching first
const USE_OPENAI_FIRST = true;

interface Message {
  id: string;
  type: "user" | "bot";
  text: string;
  timestamp: Date;
}

// ChatbotPortal component for the actual rendering
const Chatbot = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      type: "bot",
      text: "Hey there! I'm Hrishikesh's AI assistant. How can I help you today? You can ask me about Hrishikesh's skills, experience, or projects!",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);
  
  // Close the chat when scrolling significantly
  useEffect(() => {
    if (!isOpen) return;
    
    // Record the initial scroll position when opening the chat
    const initialScrollY = window.scrollY;
    let lastCheckedY = initialScrollY;
    let scrollThreshold = 70; // More sensitive: Close after smaller scroll amount
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Check absolute difference from initial position
      const totalScrollChange = Math.abs(currentScrollY - initialScrollY);
      
      // Also track incremental changes to detect fast scrolling
      const incrementalChange = Math.abs(currentScrollY - lastCheckedY);
      
      // More sensitive scrolling conditions
      // Close if:
      // 1. Total scroll passes threshold (smaller threshold)
      // 2. User is scrolling quickly (even a small rapid scroll)
      // 3. User has scrolled a significant distance in any direction
      if (
        totalScrollChange > scrollThreshold || 
        incrementalChange > 40 ||
        Math.abs(currentScrollY - initialScrollY) > 150
      ) {
        setIsOpen(false);
        // Reset the input and typing state when closing
        setInputValue("");
        setIsTyping(false);
      }
      
      // Update last checked position to detect rapid scrolling
      lastCheckedY = currentScrollY;
    };
    
    // Use passive: true for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  // Create portal container on mount
  useEffect(() => {
    let container = document.getElementById('chatbot-portal');
    
    if (!container) {
      container = document.createElement('div');
      container.id = 'chatbot-portal';
      document.body.appendChild(container);
    }
    
    setPortalContainer(container);
    
    return () => {
      // We don't remove the container to prevent flashing on remount
    };
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      text: inputValue.trim(),
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      // Always send the question to our backend API first, which will use OpenAI for undefined questions
      // The server will determine whether to use a predefined answer or OpenAI response
      // This approach ensures AI integration without changing the user experience
      
      // Use a timeout to ensure we don't wait too long for a response
      const timeoutPromise = new Promise<{ success: boolean, message: string }>((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), 15000) // Extend timeout for OpenAI calls
      );
      
      // Try to get response from the API
      const fetchPromise = apiRequest<{ success: boolean, message: string }>("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage.text }),
      });
      
      // Race the fetch against a timeout
      const response = await Promise.race([fetchPromise, timeoutPromise]);
      
      // If we got a response from the server, display it regardless of whether it came from OpenAI or local matching
      if (response && response.success) {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          text: response.message,
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, botResponse]);
      } else {
        console.warn("API responded with failure");
        // In the unlikely case the API responds with success:false, show a friendly error
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          text: "I'm having trouble processing your request right now. Please try asking something about Hrishikesh's skills or projects instead.",
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, botResponse]);
      }
    } catch (error) {
      console.error("Error getting chatbot response:", error);
      
      // Only use local fallback as a last resort if the server is completely unreachable
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        text: "I'm having trouble connecting to my knowledge base. Please check your internet connection and try again, or ask something about Hrishikesh's projects or skills.",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botResponse]);
    } finally {
      setIsTyping(false);
      
      // Make sure we focus the input after sending
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      void handleSendMessage();
    }
  };
  
  // Chatbot content to render in the portal
  const chatbotContent = (
    <>
      {/* Chat Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full bg-primary dark:bg-blue-600 text-white shadow-lg flex items-center justify-center transition-colors duration-300"
        whileHover={{ scale: 1.1, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        aria-label="Open chat"
        style={{ position: 'fixed', bottom: '24px', right: '24px' }}
      >
        <MessageCircle size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300,
              mass: 0.8
            }}
            className="fixed bottom-6 right-6 z-[9998] w-full sm:w-[400px] h-[520px] paper rounded-2xl overflow-hidden shadow-xl flex flex-col bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 transition-colors duration-300"
            style={{ position: 'fixed', bottom: '24px', right: '24px' }}
          >
            {/* Chat Header */}
            <div className="bg-primary dark:bg-blue-700 text-white p-4 flex items-center justify-between shadow-md transition-colors duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-blue-200 shadow-md">
                  <img 
                    src={profilePhotoPath} 
                    alt="Hrishikesh" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-doodle font-semibold">Ask Hrishikesh</h3>
                  <p className="text-xs opacity-80">Ask me about skills, experience, or projects</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="rounded-full h-8 w-8 flex items-center justify-center hover:bg-white/20 dark:hover:bg-blue-500 transition-colors"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-slate-50/80 dark:bg-gray-800/80 transition-colors duration-300">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      type: "spring", 
                      damping: 20, 
                      stiffness: 300
                    }}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div 
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.type === "user" 
                          ? "bg-primary dark:bg-blue-600 text-white rounded-tr-none shadow-md transition-colors duration-300" 
                          : "bg-white dark:bg-gray-700 shadow-md rounded-tl-none dark:text-gray-100 transition-colors duration-300"
                      }`}
                    >
                      <p>{message.text}</p>
                      <p className={`text-xs mt-1 text-right ${message.type === "user" ? "opacity-70" : "opacity-70 dark:opacity-50"}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                ))}
                
                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      type: "spring", 
                      damping: 20, 
                      stiffness: 300
                    }}
                    className="flex justify-start"
                  >
                    <div className="max-w-[80%] p-3 rounded-2xl bg-white dark:bg-gray-700 shadow-md rounded-tl-none transition-colors duration-300">
                      <div className="flex space-x-1 items-center justify-center h-6">
                        <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce delay-500"></div>
                        <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce delay-150"></div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors duration-300">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Ask me anything..."
                  className="flex-1 p-3 rounded-full border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-300"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => void handleSendMessage()}
                  disabled={!inputValue.trim()}
                  className={`p-3 rounded-full bg-primary dark:bg-blue-600 hover:bg-primary/90 dark:hover:bg-blue-700 text-white shadow-md ${
                    !inputValue.trim() ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  aria-label="Send message"
                >
                  <Send size={18} />
                </motion.button>
              </div>
              
              {/* Suggested Questions */}
              <div className="mt-3 flex flex-wrap gap-2">
                <button 
                  onClick={() => {
                    setInputValue("Tell me about Web 3.0");
                    setTimeout(() => void handleSendMessage(), 100);
                  }}
                  className="text-xs py-1 px-3 rounded-full border border-primary dark:border-blue-500 text-primary dark:text-blue-400 hover:bg-primary hover:text-white dark:hover:bg-blue-600 transition-colors flex items-center gap-1"
                >
                  <span>Web 3.0</span>
                  <ArrowRight size={10} />
                </button>
                <button 
                  onClick={() => {
                    setInputValue("What do you think about AI?");
                    setTimeout(() => void handleSendMessage(), 100);
                  }}
                  className="text-xs py-1 px-3 rounded-full border border-primary dark:border-blue-500 text-primary dark:text-blue-400 hover:bg-primary hover:text-white dark:hover:bg-blue-600 transition-colors flex items-center gap-1"
                >
                  <span>AI</span>
                  <ArrowRight size={10} />
                </button>
                <button 
                  onClick={() => {
                    setInputValue("Tell me about your app development");
                    setTimeout(() => void handleSendMessage(), 100);
                  }}
                  className="text-xs py-1 px-3 rounded-full border border-primary dark:border-blue-500 text-primary dark:text-blue-400 hover:bg-primary hover:text-white dark:hover:bg-blue-600 transition-colors flex items-center gap-1"
                >
                  <span>App Dev</span>
                  <ArrowRight size={10} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
  
  // Render portal if container is available
  return portalContainer ? createPortal(chatbotContent, portalContainer) : null;
};

export default Chatbot;