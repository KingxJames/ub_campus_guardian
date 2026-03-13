import UBEmergencyCallButton from "@/components/EmergencyCallButton/EmergencyCallButton";
import UBEmergencyButton from "@/components/UBEmergencyButton/UBEmergencyButton";
import React from "react";
import { Image, Text, View } from "react-native";
import { useTheme } from "../../components/ThemeProvider/ThemeProvider";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";

const PlaceholderImage = require("../../assets/images/publicSafetyLogo White Transparent background.png");

export default function Index() {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background, // uses theme background
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 20,
          paddingBottom: 20,
          paddingHorizontal: 20,
          // borderBottomWidth: 1,
          // borderBottomColor: colors.background === "#121212" ? "#333" : "#ddd", // theme-aware border
          backgroundColor: colors.card, // theme-aware header background
        }}
      >
        {/* Logo + Text */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={PlaceholderImage}
            style={{
              width: 50,
              height: 50,
              marginRight: 10,
            }}
          />

          <View>
            <Text
              style={{ fontSize: 15, fontWeight: "bold", color: colors.text }}
            >
              CampusSafe
            </Text>
            <Text style={{ fontSize: 10, color: colors.text }}>
              Student Safety App
            </Text>
          </View>
        </View>

        {/* Theme Toggle */}
        <ThemeToggle />
      </View>

      {/* Rest of screen */}
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <UBEmergencyButton />
      </View>

      <View>
        <UBEmergencyCallButton />
      </View>
    </View>
  );
}
