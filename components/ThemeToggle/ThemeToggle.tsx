import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable } from "react-native";
import { useTheme } from "../ThemeProvider/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme, colors } = useTheme();
  const isDark = theme === "dark";

  return (
    <Pressable
      onPress={toggleTheme}
      hitSlop={8}
      style={({ pressed }) => ({
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: colors.card,
        justifyContent: "center",
        alignItems: "center",
        opacity: pressed ? 0.7 : 1,

        // subtle shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
      })}
    >
      <Ionicons
        name={isDark ? "moon" : "sunny"}
        size={20}
        color={isDark ? "#cbd5f5" : "#f59e0b"}
      />
    </Pressable>
  );
}
