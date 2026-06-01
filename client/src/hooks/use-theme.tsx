import { createContext, useContext, useLayoutEffect, useState, useEffect, ReactNode } from "react";

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getSystemTheme = (): Theme => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

const getStoredTheme = (): Theme | null => {
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }
  return null;
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Initialize with system preference but give priority to stored preference
  const [theme, setTheme] = useState<Theme>('light');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Use useLayoutEffect to prevent flash of wrong theme
  useLayoutEffect(() => {
    const storedTheme = getStoredTheme();
    const initialTheme = storedTheme || getSystemTheme();
    setTheme(initialTheme);
    setIsInitialized(true);
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (!isInitialized) return;

    // Apply theme to HTML element
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Store theme preference
    localStorage.setItem('theme', theme);
  }, [theme, isInitialized]);

  // Toggle theme with transition effect
  const toggleTheme = () => {
    setIsTransitioning(true);
    
    setTheme(current => {
      const newTheme = current === 'light' ? 'dark' : 'light';
      return newTheme;
    });
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      // Only update if user hasn't set a preference
      if (!getStoredTheme()) {
        setTheme(getSystemTheme());
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}