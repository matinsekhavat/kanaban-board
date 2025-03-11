"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { type ThemeContextValue, type ThemeLiteral } from "../../types/types";

// Default values prevent unnecessary null checks when consuming context
const defaultThemeContext: ThemeContextValue = {
  theme: "light",
  setTheme: () => {},
  toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeContextValue>(defaultThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeLiteral>("light");

  useEffect(() => {
    const loadTheme = () => {
      try {
        const storedTheme = localStorage.getItem("theme");
        return isValidTheme(storedTheme) ? storedTheme : "light";
      } catch (error) {
        console.warn("Could not access localStorage:", error);
        return "light";
      }
    };

    setTheme(loadTheme());
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const isDark = theme === "dark";

    root.classList.toggle("dark", isDark); // second argument if isDark is true then add the class dark to the root element
    root.classList.toggle("light", !isDark); // second argument if isDark is false then add the class light to the root element
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    try {
      localStorage.setItem("theme", newTheme);
    } catch (error) {
      console.warn("Could not save theme to localStorage:", error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function isValidTheme(value: string | null): value is ThemeLiteral {
  return value === "dark" || value === "light";
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (process.env.NODE_ENV !== "production") {
    // Only throw in development for better debugging
    if (context === defaultThemeContext) {
      throw new Error("useTheme must be used within a ThemeProvider");
    }
  }

  return context;
}
