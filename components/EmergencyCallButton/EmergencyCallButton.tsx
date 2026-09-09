import { Ionicons } from "@expo/vector-icons";
import { Alert, Linking, Pressable, Text } from "react-native";
import { useTheme } from "../ThemeProvider/ThemeProvider";

interface EmergencyCallButtonProps {
  phoneNumber?: string;
  label?: string;
}

export default function EmergencyCallButton({
  phoneNumber = "999",
  label = "Call 999 (UB Public Safety Hotline)",
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
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.text + "22",
        paddingVertical: 16,
        paddingHorizontal: 18,
        borderRadius: 30,
        marginTop: 12,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <Ionicons name="call" size={18} color="#e53935" />
      <Text
        style={{
          color: colors.text,
          fontSize: 15,
          fontWeight: "700",
          marginLeft: 10,
          textAlign: "center",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
