"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { type ThemeContextValue, type ThemeLiteral } from "../types/types";

const defaultThemeContext: ThemeContextValue = {
  theme: "light",
  setTheme: () => {},
  toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeContextValue>(defaultThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeLiteral | null>(null);

  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem("theme");
      const validTheme: ThemeLiteral = isValidTheme(storedTheme)
        ? storedTheme
        : "light";

      setTheme(validTheme);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error getting theme from localStorage:", error.message);
      } else {
        console.error("Error getting theme from localStorage:", error);
      }
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme) {
      const root = document.documentElement;
      const isDark = theme === "dark";

      root.classList.toggle("dark", isDark);
      root.classList.toggle("light", !isDark);
    }
  }, [theme]);

  const toggleTheme = () => {
    if (!theme) return;

    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    try {
      localStorage.setItem("theme", newTheme);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error setting theme in localStorage:", error.message);
      } else {
        console.error("Error setting theme in localStorage:", error);
      }
    }
  };

  if (theme === null) {
    return null;
  }

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
    if (context === defaultThemeContext) {
      throw new Error("useTheme must be used within a ThemeProvider");
    }
  }

  return context;
}
