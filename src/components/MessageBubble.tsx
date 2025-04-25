// src/components/MessageBubble.tsx

import { motion } from "framer-motion";
import clsx from "clsx";
import { Message } from "../types";

interface MessageBubbleProps {
  message: Message;
  isDarkMode: boolean;
}

export default function MessageBubble({ message, isDarkMode }: MessageBubbleProps) {
  const bubbleVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 } 
    },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  return (
    <motion.div
      variants={bubbleVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={clsx(
        "flex items-end mb-4",
        message.sender === "you" ? "justify-end" : "justify-start"
      )}
    >
      {message.sender === "bot" && (
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-700 text-white rounded-full flex items-center justify-center mr-2 shadow-lg">
          <span className="text-lg">🤖</span>
        </div>
      )}
      
      <div
        className={clsx(
          "p-3 rounded-2xl max-w-xs md:max-w-md break-words shadow-lg",
          message.sender === "you"
            ? isDarkMode 
              ? "bg-blue-700 text-white" 
              : "bg-blue-600 text-white"
            : isDarkMode
              ? "bg-green-500 text-gray-900"
              : "bg-gradient-to-r from-green-400 to-emerald-500 text-gray-900"
        )}
      >
        <div className="whitespace-pre-line">{message.text}</div>
        <div 
          className={clsx(
            "text-xs mt-1 text-right",
            message.sender === "you" 
              ? "text-blue-200" 
              : "text-gray-700"
          )}
        >
          {message.timestamp}
        </div>
      </div>
      
      {message.sender === "you" && (
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-700 text-white rounded-full flex items-center justify-center ml-2 shadow-lg">
          <span className="text-lg">👤</span>
        </div>
      )}
    </motion.div>
  );
}