// src/types/index.ts

export interface Message {
    id: string;
    sender: "you" | "bot";
    text: string;
    timestamp: string;
  }
  
  export type ThemeMode = "light" | "dark" | "system";