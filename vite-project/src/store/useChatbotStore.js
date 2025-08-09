import { create } from "zustand";

const GEMINI_API_KEY = `${import.meta.env.VITE_GEMINI_API_KEY}`;
// "AIzaSyDuxAkM87rZyY48pHCAXzSNwKzY6ZmGxNc"
export const useChatbotStore = create((set, get) => ({
  apiKey: GEMINI_API_KEY || "",

  messages: JSON.parse(localStorage.getItem("chatMessages")) || [
    { role: "bot", text: "Hello! How can I help you today?" },
  ],

  addMessage: (message) => {
    const updated = [...get().messages, message];
    localStorage.setItem("chatMessages", JSON.stringify(updated));
    set({ messages: updated });
  },

  clearMessages: () => {
    localStorage.removeItem("chatMessages");
    set({
      messages: [{ role: "bot", text: "Hello! How can I help you today?" }],
    });
  },

  sendMessageToGemini: async (userText) => {
    const { apiKey, addMessage } = get();

    if (!userText.trim()) return;

    if (!apiKey) {
      console.warn("❌ Gemini API key is missing. Check your .env file.");
      addMessage({ role: "bot", text: "❌ API key missing. Please contact admin." });
      return;
    }

    // Add user message and loading message
    addMessage({ role: "user", text: userText });
    addMessage({ role: "bot", text: "⏳ Thinking..." });

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-goog-api-key": apiKey,
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: userText }],
              },
            ],
          }),
        }
      );

      const data = await response.json();

      // Remove loading message
      set((state) => ({
        messages: state.messages.filter((msg) => msg.text !== "⏳ Thinking..."),
      }));

      if (!response.ok) {
        console.error("Gemini API error:", data);
        addMessage({
          role: "bot",
          text: `❌ API Error: ${data?.error?.message || "Unknown error"}`,
        });
        return;
      }

      const botReply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "🤖 Sorry, I didn’t understand that.";

      addMessage({ role: "bot", text: botReply });
    } catch (error) {
      console.error("Gemini fetch error:", error);

      // Remove loading message
      set((state) => ({
        messages: state.messages.filter((msg) => msg.text !== "⏳ Thinking..."),
      }));

      addMessage({
        role: "bot",
        text: "❌ Gemini error: Could not fetch response. Try again later.",
      });
    }
  },
}));
