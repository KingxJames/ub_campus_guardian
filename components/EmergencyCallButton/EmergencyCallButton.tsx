import React from "react";
import { Alert, Linking, Pressable, Text } from "react-native";
import { useTheme } from "../ThemeProvider/ThemeProvider";

interface EmergencyCallButtonProps {
  phoneNumber?: string;
  label?: string;
}

export default function EmergencyCallButton({
  phoneNumber = "999",
  label = "🚨 Call 999 (UB Public Safety Hotline)",
}: EmergencyCallButtonProps) {
  const { colors } = useTheme();
  const callEmergency = () => {
    Alert.alert(
      "Emergency Call",
      `Are you sure you want to call ${phoneNumber}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Call",
          style: "destructive",
          onPress: () => Linking.openURL(`tel:${phoneNumber}`),
        },
      ],
    );
  };

  return (
    <Pressable
      onPress={callEmergency}
      style={{
        backgroundColor: colors.card,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
      }}
    >
      <Text style={{ color: colors.text, fontSize: 16, fontWeight: "700" }}>
        {label}
      </Text>
    </Pressable>
  );
}
