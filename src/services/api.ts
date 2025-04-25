// src/services/api.ts

import { nanoid } from 'nanoid';
import { Message } from '../types';
import { addTaporiStyle } from '../utils/taporiResponses';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

interface ApiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
  error?: {
    message: string;
  };
}

export async function sendMessageToGemini(
  userMessage: string, 
  chatHistory: Message[]
): Promise<Message> {
  try {
    // Format chat history for context
    const historyFormatted = chatHistory
      .map(msg => `${msg.sender === 'you' ? 'User' : 'Tapori'}: ${msg.text}`)
      .join('\n');
    
    const contextPrompt = chatHistory.length ? 
      `Here's our conversation so far:\n${historyFormatted}\n\nNow respond to this message as an Indian tapori friend: ${userMessage}` :
      `Respond like an Indian tapori friend to: ${userMessage}`;
      
    const response = await fetch(
      `${API_URL}?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            { parts: [{ text: contextPrompt }] },
          ],
          generationConfig: {
            temperature: 0.8,
            topK: 40,
            topP: 0.95,
          }
        }),
      }
    );

    const data: ApiResponse = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }

    const rawReply = data.candidates?.[0]?.content?.parts?.[0]?.text || 
      "Arre kuch gadbad ho gayi bhai!";
    
    // Add extra tapori style to the response
    const enhancedReply = addTaporiStyle(rawReply);

    return {
      id: nanoid(),
      sender: "bot",
      text: enhancedReply,
      timestamp: new Date().toLocaleTimeString(),
    };
  } catch (error) {
    console.error("API error:", error);
    return {
      id: nanoid(),
      sender: "bot",
      text: "Network mein kaand ho gaya re bhai! Thoda time baad try kar!",
      timestamp: new Date().toLocaleTimeString(),
    };
  }
}