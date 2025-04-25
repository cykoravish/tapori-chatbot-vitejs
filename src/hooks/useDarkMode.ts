// src/hooks/useDarkMode.ts

import { useState, useEffect } from 'react';
import { ThemeMode } from '../types';

export function useDarkMode() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const savedTheme = localStorage.getItem('tapori_theme');
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system')) {
      return savedTheme as ThemeMode;
    }
    return 'system';
  });

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Save theme preference
    localStorage.setItem('tapori_theme', theme);
    
    // Apply theme
    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
      
      // Listen for system theme changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
      mediaQuery.addEventListener('change', handleChange);
      
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      setIsDarkMode(theme === 'dark');
    }
  }, [theme]);

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  return { theme, isDarkMode, cycleTheme };
}