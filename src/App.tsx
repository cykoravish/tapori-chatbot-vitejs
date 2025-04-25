// src/App.tsx

import { useEffect } from "react";
import clsx from "clsx";
import Header from "./components/Header";
import MessageList from "./components/MessageList";
import ChatInput from "./components/ChatInput";
import { useChat } from "./hooks/useChat";
import { useDarkMode } from "./hooks/useDarkMode";
import { useSound } from "./hooks/useSound";

// Add global styles for scrollbars
import "./index.css";

function App() {
  const { messages, input, setInput, isTyping, handleSend, clearChat } = useChat();
  const { theme, isDarkMode, cycleTheme } = useDarkMode();
  const { isMuted, toggleMute } = useSound();

  // Apply dark mode to body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div
      className={clsx(
        "min-h-screen transition-colors duration-500 flex flex-col font-sans",
        isDarkMode
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-br from-pink-200 via-yellow-100 to-blue-200 text-gray-900"
      )}
    >
      <Header 
        theme={theme}
        isDarkMode={isDarkMode}
        cycleTheme={cycleTheme}
        isMuted={isMuted}
        toggleMute={toggleMute}
        clearChat={clearChat}
      />

      <main className="flex-1 flex flex-col max-w-2xl w-full mx-auto p-4 space-y-4">
        <MessageList 
          messages={messages} 
          isTyping={isTyping} 
          isDarkMode={isDarkMode}
        />

        <ChatInput
          input={input}
          setInput={setInput}
          handleSend={handleSend}
          isTyping={isTyping}
          isDarkMode={isDarkMode}
        />
      </main>
    </div>
  );
}

export default App;