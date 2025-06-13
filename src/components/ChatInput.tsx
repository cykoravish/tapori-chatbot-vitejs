// src/components/ChatInput.tsx

import { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface ChatInputProps {
  input: string;
  setInput: (input: string) => void;
  handleSend: () => void;
  isTyping: boolean;
  isDarkMode: boolean;
}

export default function ChatInput({
  input,
  setInput,
  handleSend,
  isTyping,
  isDarkMode,
}: ChatInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={clsx(
        "sticky bottom-0 pt-2",
        isDarkMode
          ? "bg-gray-900/70 backdrop-blur-md"
          : "bg-gradient-to-b from-transparent to-white/50 backdrop-blur-sm"
      )}
    >
      <div className="flex gap-2 items-end">
        <div
          className={clsx(
            "flex-1 relative transition-all duration-200",
            isFocused
              ? isDarkMode
                ? "ring-2 ring-cyan-500"
                : "ring-2 ring-blue-500"
              : "ring-0"
          )}
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Kuch bhi puch le bhai..."
            rows={1}
            className={clsx(
              "w-full px-4 py-3 rounded-xl resize-none outline-none transition-colors",
              "focus:outline-none focus:ring-offset-2",
              isDarkMode
                ? "bg-gray-800 text-white border border-gray-700 placeholder-gray-400"
                : "bg-white text-gray-900 border border-gray-200 placeholder-gray-500"
            )}
            style={{
              minHeight: "50px",
              maxHeight: "150px",
            }}
          />
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          onClick={handleSend}
          disabled={isTyping || !input.trim()}
          className={clsx(
            "px-5 py-3 font-bold rounded-xl transition-all text-lg",
            isTyping || !input.trim()
              ? "bg-gray-400 cursor-not-allowed text-gray-200"
              : isDarkMode
              ? "bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-700 hover:opacity-90 text-white"
              : "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:opacity-90 text-white"
          )}
        >
          <span role="img" aria-label="Send">
            🚀
          </span>
        </motion.button>
      </div>
      <div className="text-xs text-center mt-1 opacity-70">
        {isDarkMode ? "made with ❤️ by Ravish" : "made with ❤️ by Ravish"}
      </div>
    </div>
  );
}
