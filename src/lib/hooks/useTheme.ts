import { useState, useEffect } from 'react';
import { getTheme, setTheme } from '../storage/localStorage';

/**
 * Custom hook for theme management
 * Manages dark/light theme state and syncs with localStorage and DOM
 */
export function useTheme() {
  const [isDark, setIsDarkState] = useState(() => {
    const savedTheme = getTheme();
    return savedTheme === 'dark' || savedTheme === null;
  });

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.setAttribute('data-theme', 'dark');
      setTheme('dark');
    } else {
      html.removeAttribute('data-theme');
      setTheme('light');
    }
  }, [isDark]);

  const setIsDark = (value: boolean) => {
    setIsDarkState(value);
  };

  return { isDark, setIsDark };
}
