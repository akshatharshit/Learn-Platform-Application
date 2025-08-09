import React, { useState } from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/gemini-ai.json";
import { useChatbotStore } from "../../store/useChatbotStore";
import { Bot, SendHorizonal } from "lucide-react"; // Optional: icon support

export default function GeminiChatbotCTA() {
  const [input, setInput] = useState("");
  const { sendMessageToGemini, messages } = useChatbotStore();

  const handleSend = () => {
    if (input.trim()) {
      sendMessageToGemini(input);
      setInput("");
    }
  };

  const lastBotReply = [...messages].reverse().find((msg) => msg.role === "bot")?.text;

  return (
    <div className="mb-20 bg-base-200 p-8 md:p-12 rounded-3xl shadow-xl mt-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Section */}
        <div className="md:w-1/2 space-y-6">
          <div className="space-y-3">
            <h2 className="text-4xl font-bold text-primary">
              🚀 Gemini AI: The Future of Conversations
            </h2>
            <p className="text-base-content text-lg">
              Meet your smart chat companion powered by Google’s advanced <strong>Gemini AI</strong>. Whether you're writing, learning, or just curious—Gemini is here to help!
            </p>
            <ul className="list-disc list-inside text-base text-base-content/80 pl-2">
              <li>Understands complex context</li>
              <li>Creative writing & suggestions</li>
              <li>Natural, fluent dialogue</li>
            </ul>
          </div>
        </div>

        {/* Lottie Animation */}
        <div className="w-64 md:w-72 shrink-0">
          <Lottie animationData={animationData} loop autoplay />
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 space-y-5 text-center md:text-left">
          <h3 className="text-2xl font-semibold text-secondary">
            ✨ Why Choose Gemini AI?
          </h3>
          <p className="text-base-content text-lg leading-relaxed">
            Gemini is fast, multilingual, and intuitive. It adapts to your tone and context, and works seamlessly across platforms.
          </p>

          {/* Chat Input + Response */}
          <div className="space-y-3 mt-6">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask Gemini something..."
                className="input input-bordered input-primary w-full"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button onClick={handleSend} className="btn btn-primary px-4">
                <SendHorizonal className="w-4 h-4" />
              </button>
            </div>

            {lastBotReply && (
              <div className="flex items-start gap-3 p-4 bg-base-100 border border-base-300 rounded-xl shadow-md">
                <Bot className="w-5 h-5 text-primary mt-1" />
                <p className="text-base-content">{lastBotReply}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
