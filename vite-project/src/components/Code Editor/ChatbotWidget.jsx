import React, { useEffect, useRef, useState } from "react";
import { Bot, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useChatbotStore } from "../../store/useChatbotStore";
import { useAuthStore } from "../../store/useAuthStore";
import toast from "react-hot-toast";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");

  const messages = useChatbotStore((state) => state.messages);
  const sendMessageToGemini = useChatbotStore((state) => state.sendMessageToGemini);
  const clearMessages = useChatbotStore((state) => state.clearMessages);

  const user = useAuthStore((state) => state.user);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (user) {
      clearMessages(); // Clear messages on refresh or user switch
    }
  }, [user]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setInput("");
    if (!isOpen) setTimeout(() => inputRef.current?.focus(), 200);
  };

  const handleSend = async () => {
    if (!input.trim()) return toast.error("Message cannot be empty!");
    try {
      await sendMessageToGemini(input.trim());
      setInput("");
    } catch {
      toast.error("Failed to send message");
    }
  };

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  return (
    <>
      {/* Floating Bot Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <button
          className="btn btn-circle btn-primary shadow-md hover:scale-105 transition-transform"
          onClick={toggleChat}
        >
          {isOpen ? <X size={22} /> : <Bot size={22} />}
        </button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 w-[320px] max-w-[90vw] h-[400px] bg-base-100 rounded-xl shadow-xl border border-base-300 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="bg-primary text-white p-4 rounded-t-xl flex justify-between items-center">
              <span className="font-semibold tracking-wide flex items-center gap-2 ">
                <Bot size={18} /> Chatbot Assistant
              </span>
              <button onClick={toggleChat} className="hover:text-gray-200">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin scrollbar-thumb-base-300">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                  className={`chat ${msg.role === "user" ? "chat-end" : "chat-start"}`}
                >
                  <div
                    className={`chat-bubble max-w-xs text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-base-300 bg-base-200 flex gap-2">
              <input
                ref={inputRef}
                type="text"
                className="input input-sm input-bordered w-full"
                placeholder="Ask something..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                className="btn btn-sm btn-primary"
                title="Send"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
