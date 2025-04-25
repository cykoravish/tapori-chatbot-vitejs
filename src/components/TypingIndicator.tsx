// src/components/TypingIndicator.tsx

import { motion } from "framer-motion";
import clsx from "clsx";

interface TypingIndicatorProps {
  isDarkMode: boolean;
}

export default function TypingIndicator({ isDarkMode }: TypingIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex items-start mb-4"
    >
      <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-700 text-white rounded-full flex items-center justify-center mr-2 shadow-lg">
        <span className="text-lg">🤖</span>
      </div>
      
      <div
        className={clsx(
          "py-3 px-4 rounded-2xl shadow-md",
          isDarkMode ? "bg-gray-700" : "bg-gray-200"
        )}
      >
        <div className="flex space-x-2">
          <motion.div
            className={clsx(
              "w-3 h-3 rounded-full",
              isDarkMode ? "bg-cyan-500" : "bg-cyan-600"
            )}
            animate={{
              y: ["0%", "-50%", "0%"]
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: 0
            }}
          />
          <motion.div
            className={clsx(
              "w-3 h-3 rounded-full",
              isDarkMode ? "bg-cyan-500" : "bg-cyan-600"
            )}
            animate={{
              y: ["0%", "-50%", "0%"]
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: 0.15
            }}
          />
          <motion.div
            className={clsx(
              "w-3 h-3 rounded-full",
              isDarkMode ? "bg-cyan-500" : "bg-cyan-600"
            )}
            animate={{
              y: ["0%", "-50%", "0%"]
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: 0.3
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}