// src/hooks/useChat.ts

import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Message } from '../types';
import { sendMessageToGemini } from '../services/api';
import { saveMessages, loadMessages } from '../services/storage';
import { useSound } from './useSound';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const { playSound } = useSound();

  // Load saved messages on component mount
  useEffect(() => {
    const savedMessages = loadMessages();
    if (savedMessages.length) {
      setMessages(savedMessages);
    } else {
      // Initial greeting if no saved messages
      const initialMessage: Message = {
        id: nanoid(),
        sender: "bot",
        text: "Ae bhidu! Kya bolti public? Apun idhar hai tere liye, kuch bhi puch le!",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages([initialMessage]);
      saveMessages([initialMessage]);
    }
  }, []);

  // Save messages whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      saveMessages(messages);
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: nanoid(),
      sender: "you",
      text: input,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    playSound("send");
    setInput("");
    setIsTyping(true);

    try {
      // Simulate realistic typing delay based on message length
      const typingDelay = Math.min(1000 + Math.random() * 1500, 3500);
      await new Promise(resolve => setTimeout(resolve, typingDelay));
      
      const botMessage = await sendMessageToGemini(input, messages);
      setMessages((prev) => [...prev, botMessage]);
      playSound("receive");
    } catch (error) {
      console.error(error);
      const errorMsg: Message = {
        id: nanoid(),
        sender: "bot",
        text: "Network mein kaand ho gaya re bhai! Firse try kar!",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
      playSound("receive");
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    const welcomeMessage: Message = {
      id: nanoid(),
      sender: "bot",
      text: "Chat saaf kar diya re bhidu! Naya shuruwat karte hai!",
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages([welcomeMessage]);
    saveMessages([welcomeMessage]);
  };

  return {
    messages,
    input,
    setInput,
    isTyping,
    handleSend,
    clearChat
  };
}