// src/components/MessageList.tsx

import { useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { Message } from "../types";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  isDarkMode: boolean;
}

export default function MessageList({ messages, isTyping, isDarkMode }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change or bot starts/stops typing
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  return (
    <div 
      className={clsx(
        "flex-1 overflow-y-auto rounded-lg p-4",
        isDarkMode 
          ? "bg-gray-800/90 backdrop-blur-md scrollbar-dark" 
          : "bg-white/60 backdrop-blur-md scrollbar-light"
      )}
    >
      <AnimatePresence>
        {messages.map((msg) => (
          <MessageBubble 
            key={msg.id} 
            message={msg} 
            isDarkMode={isDarkMode} 
          />
        ))}
        
        {isTyping && <TypingIndicator isDarkMode={isDarkMode} />}
      </AnimatePresence>
      <div ref={messagesEndRef} />
    </div>
  );
}