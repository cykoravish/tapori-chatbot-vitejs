// src/hooks/useSound.ts

import { useState, useEffect } from 'react';
import sendSound from '../assets/send.mp3';
import receiveSound from '../assets/receive.mp3';

export function useSound() {
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    const saved = localStorage.getItem('tapori_sound_muted');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('tapori_sound_muted', JSON.stringify(isMuted));
  }, [isMuted]);

  const playSound = (type: "send" | "receive") => {
    if (isMuted) return;
    
    const sound = new Audio(type === "send" ? sendSound : receiveSound);
    sound.volume = 0.5;
    
    try {
      sound.play().catch(err => {
        console.log("Sound play failed, likely due to user interaction policy:", err);
      });
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  return { playSound, isMuted, toggleMute };
}