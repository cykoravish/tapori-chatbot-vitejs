// src/services/storage.ts

import { Message } from '../types';

const STORAGE_KEY = 'tapori_chat_history';

export function saveMessages(messages: Message[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch (error) {
    console.error('Failed to save messages to localStorage:', error);
  }
}

export function loadMessages(): Message[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to load messages from localStorage:', error);
    return [];
  }
}

export function clearMessages(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear messages from localStorage:', error);
  }
}