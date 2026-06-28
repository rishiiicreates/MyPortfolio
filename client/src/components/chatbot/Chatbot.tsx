import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, Bot } from "lucide-react";
import profilePhotoPath from "@/assets/images/profile-photo.jpeg";
import { apiRequest } from "@/lib/queryClient";

interface Message {
  id: string;
  type: "user" | "bot";
  text: string;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      type: "bot",
      text: "Hello! I'm Rishii's AI assistant powered by Gemini. Ask me anything about his projects, skills, or experience!",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Create portal container
  useEffect(() => {
    let container = document.getElementById('chatbot-portal');
    if (!container) {
      container = document.createElement('div');
      container.id = 'chatbot-portal';
      document.body.appendChild(container);
    }
    setPortalContainer(container);
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

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
      const response = await apiRequest<{ success: boolean, message: string }>("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text }),
      });

      if (response && response.success) {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          text: response.message,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botResponse]);
      } else {
        throw new Error("API failure");
      }
    } catch (error) {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        text: "I'm having trouble connecting to the server. Please try again later.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    } finally {
      setIsTyping(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") void handleSendMessage();
  };

  const chatbotContent = (
    <>
      {!isOpen && (
        <motion.button
          className="fixed bottom-16 right-6 z-[9999] w-14 h-14 rounded-full bg-foreground text-background shadow-xl flex items-center justify-center border border-border/20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
        >
          <Sparkles size={24} className="text-accent" />
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-16 right-6 z-[9998] w-[90vw] sm:w-[400px] h-[600px] bg-background/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-transparent p-4 flex items-center justify-between border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-background font-bold font-display">
                  AI
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm uppercase tracking-wider">Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    <p className="text-[10px] font-mono uppercase text-foreground/50">Online</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-foreground/40 hover:text-foreground transition-colors rounded-full hover:bg-foreground/5"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-4 text-sm font-sans leading-relaxed ${message.type === "user"
                      ? "bg-foreground text-background rounded-2xl rounded-tr-sm"
                      : "bg-secondary/50 border border-border text-foreground rounded-2xl rounded-tl-sm backdrop-blur-sm"
                      }`}
                  >
                    <p>{message.text}</p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-secondary/50 border border-border p-4 rounded-2xl rounded-tl-sm flex gap-1.5 backdrop-blur-sm">
                    <span className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '-0.3s' }}></span>
                    <span className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '-0.15s' }}></span>
                    <span className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-transparent">
              {/* Suggestions */}
              {messages.length === 1 && (
                <div className="flex gap-2 overflow-x-auto pb-4 mb-2 no-scrollbar">
                  {["Tell me about your projects", "What are your top skills?", "How can I contact you?"].map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => { setInputValue(q); setTimeout(() => handleSendMessage(), 100); }}
                      className="whitespace-nowrap text-xs px-4 py-2 bg-secondary/30 border border-border rounded-full hover:border-accent hover:text-accent font-mono uppercase tracking-wider transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              <form
                onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                className="flex gap-2"
              >
                <input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="ASK ME ANYTHING..."
                  className="flex-1 bg-secondary/30 border border-border rounded-xl px-4 py-2 text-sm font-mono focus:outline-none focus:border-accent transition-colors placeholder:text-foreground/40"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="p-3 bg-accent text-background rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  return portalContainer ? createPortal(chatbotContent, portalContainer) : null;
};

export default Chatbot;