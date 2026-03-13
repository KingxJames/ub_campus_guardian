import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { useTheme } from "../ThemeProvider/ThemeProvider";

const PlaceholderImage = require("../../assets/images/publicSafetyLogo White Transparent background.png");

export default function SOSSent() {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
      }}
    >
      {/* Alert Card */}
      <View
        style={{
          width: "100%",
          maxWidth: 360,
          backgroundColor: colors.background1,
          borderRadius: 20,
          padding: 25,
          alignItems: "center",
          shadowColor: "#000",
          shadowOpacity: 0.25,
          shadowRadius: 10,
          elevation: 10,
        }}
      >
        <Image
          source={PlaceholderImage}
          style={{ width: 60, height: 60, marginBottom: 20 }}
          resizeMode="contain"
        />

        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            color: colors.text,
            marginBottom: 10,
          }}
        >
          SOS Sent
        </Text>

        <Text
          style={{
            textAlign: "center",
            fontSize: 14,
            color: colors.text + "99",
            marginBottom: 25,
            lineHeight: 20,
          }}
        >
          Your SOS has been sent. Stay safe!
        </Text>

        {/* Buttons */}
        <View
          style={{
            flexDirection: "row",
            width: "100%",
          }}
        >
          <Pressable
            onPress={() => console.log("Pressed")}
            style={{
              flex: 1,
              paddingVertical: 14,
              marginRight: 10,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#ccc",
              alignItems: "center",
            }}
          >
            <Text style={{ color: colors.text, fontWeight: "600" }}>OK</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
