import React from "react";
import { Pressable, Text } from "react-native";
import { useTheme } from "../ThemeProvider/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Pressable
      onPress={toggleTheme}
      style={{
        width: 50,
        height: 50,
        borderRadius: 10, // perfect circle
        backgroundColor: isDark ? "#3333337a" : "#f5f5f5",
        justifyContent: "center",
        alignItems: "center",

        // subtle shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
      }}
    >
      <Text style={{ fontSize: 24 }}>{isDark ? "🌙" : "🌞"}</Text>
    </Pressable>
  );
}
