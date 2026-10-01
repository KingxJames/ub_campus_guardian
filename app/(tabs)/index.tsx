import UBEmergencyCallButton from "@/components/EmergencyCallButton/EmergencyCallButton";
import UBEmergencyButton from "@/components/UBEmergencyButton/UBEmergencyButton";
import { Image, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../components/ThemeProvider/ThemeProvider";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";

const PlaceholderImage = require("../../assets/images/publicSafetyLogo White Transparent background.png");

export default function Index() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

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
          paddingTop: insets.top + 12,
          paddingBottom: 20,
          paddingHorizontal: 20,
          // borderBottomWidth: 1,
          // borderBottomColor: colors.background === "#121212" ? "#333" : "#ddd", // theme-aware border
          backgroundColor: colors.background, // match body background for a seamless header
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
              Campus Safety
            </Text>
            <Text style={{ fontSize: 10, color: colors.text }}>
              Public Safety App
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
