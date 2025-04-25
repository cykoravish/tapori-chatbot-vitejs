// src/components/Header.tsx

import { motion } from "framer-motion";
import clsx from "clsx";
import { ThemeMode } from "../types";

interface HeaderProps {
  theme: ThemeMode;
  isDarkMode: boolean;
  cycleTheme: () => void;
  isMuted: boolean;
  toggleMute: () => void;
  clearChat: () => void;
}

export default function Header({
  theme,
  isDarkMode,
  cycleTheme,
  isMuted,
  toggleMute,
  clearChat
}: HeaderProps) {
  const getThemeIcon = () => {
    if (theme === 'light') return '🌙';
    if (theme === 'dark') return '🌞';
    return isDarkMode ? '🌞' : '🌙';
  };

  return (
    <header className={clsx(
      "flex items-center justify-between p-4 sticky top-0 z-10 backdrop-blur-md", 
      isDarkMode ? "bg-gray-900/70" : "bg-white/30"
    )}>
      <div className="flex items-center">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={clsx(
            "text-3xl font-extrabold tracking-wide",
            isDarkMode ? "text-cyan-400 drop-shadow-lg" : "text-pink-600"
          )}
        >
          🕺 Tapori AI 💬
        </motion.h1>
      </div>
      <div className="flex space-x-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMute}
          className={clsx(
            "p-2 rounded-full transition",
            isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white/70 hover:bg-white"
          )}
          aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
        >
          {isMuted ? "🔇" : "🔊"}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={cycleTheme}
          className={clsx(
            "p-2 rounded-full transition",
            isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white/70 hover:bg-white"
          )}
          aria-label="Change theme"
        >
          {getThemeIcon()}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={clearChat}
          className={clsx(
            "p-2 rounded-full transition",
            isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white/70 hover:bg-white"
          )}
          aria-label="Clear chat history"
        >
          🧹
        </motion.button>
      </div>
    </header>
  );
}