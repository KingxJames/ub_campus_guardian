import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useTheme } from "../../components/ThemeProvider/ThemeProvider";

export default function TabsLayout() {
  const { colors } = useTheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ff3254", // blue accent
        tabBarInactiveTintColor: "#888", // greyed out inactive
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.text + "22",
          height: 60,
          paddingBottom: 5,
        },
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 18,
          color: "#24262c",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Emergency",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="alert-circle-outline"
              size={size || 26}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="anonymousReport"
        options={{
          title: "Anonymous",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size || 26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
