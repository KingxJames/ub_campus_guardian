import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(true);

  // Load saved theme on startup
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("app-theme");

        if (savedTheme) {
          setTheme(savedTheme);
        }
      } catch (error) {
        console.log("Failed to load theme", error);
      }

      setLoading(false);
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);

    try {
      await AsyncStorage.setItem("app-theme", newTheme);
    } catch (error) {
      console.log("Failed to save theme", error);
    }
  };

  const colors =
    theme === "light"
      ? {
          background: "#f8f9fb",
          background1: "#f8f9fb",
          text: "#111",
          card: "#ffffff",
        }
      : {
          background: "#000425",
          background1: "#252842",
          text: "#ffffff",
          card: "#3e3e3f98",
        };

  // Prevent UI flashing wrong theme
  if (loading) return null;

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
