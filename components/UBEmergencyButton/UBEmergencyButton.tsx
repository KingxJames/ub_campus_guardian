import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, Pressable, Text, View } from "react-native";
import SOSAlert from "../SOSAlert/SOSAlert";
import SOSSent from "../SOSSent/SOSSent";
import { useTheme } from "../ThemeProvider/ThemeProvider";

export default function UBEmergencyButton() {
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const { colors } = useTheme();

  const [showSOSAlert, setShowSOSAlert] = useState(false);
  const [showSOSSent, setShowSOSSent] = useState(false);

  // Pulse animation
  useEffect(() => {
    const pulse = () => {
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1800,
          useNativeDriver: true,
          easing: Easing.in(Easing.ease),
        }),
      ]).start(() => pulse());
    };

    pulse();
  }, []);

  const scale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.6],
  });

  const opacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 0],
  });

  // Open SOS alert
  const handleSOSAlert = () => setShowSOSAlert(true);

  // Cancel SOS alert
  const handleCancel = () => setShowSOSAlert(false);

  // Confirm SOS
  const handleConfirm = () => {
    setShowSOSAlert(false); // close alert
    setShowSOSSent(true); // show "SOS Sent" component

    // Show SOS Sent for 2 seconds
    setTimeout(() => {
      setShowSOSSent(false); // hide it
    }, 5000);

    // 🚨 Trigger your emergency API here
    console.log("SOS Confirmed, send to backend...");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        backgroundColor: colors.background,
      }}
    >
      {/* Animated Pulse + SOS Button */}
      {!showSOSSent && (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Animated.View
            style={{
              position: "absolute",
              width: 220,
              height: 220,
              borderRadius: 110,
              backgroundColor: "#e53935",
              opacity,
              transform: [{ scale }],
            }}
          />

          <Text
            style={{
              fontSize: 24,
              color: colors.text,
              fontWeight: "600",
              marginBottom: 15,
              textAlign: "center",
            }}
          >
            Press For Emergency
          </Text>

          <Pressable
            style={{
              width: 220,
              height: 220,
              borderRadius: 110,
              backgroundColor: "#e53935",
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#000",
              shadowOpacity: 0.25,
              shadowRadius: 12,
              shadowOffset: { width: 0, height: 5 },
              elevation: 10,
            }}
            onPress={handleSOSAlert}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 60,
                letterSpacing: 3,
              }}
            >
              SOS
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 14,
                marginTop: 6,
                letterSpacing: 1,
              }}
            >
              PRESS TO ALERT
            </Text>
          </Pressable>
        </View>
      )}

      {/* Description */}
      {!showSOSSent && (
        <Text
          style={{
            fontSize: 16,
            marginTop: 30,
            textAlign: "center",
            color: colors.text,
            lineHeight: 24,
            maxWidth: 280,
          }}
        >
          Immediately alerts campus security and shares your live location for
          faster assistance.
        </Text>
      )}

      {/* SOS Alert Modal */}
      {showSOSAlert && (
        <SOSAlert
          visible={showSOSAlert}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}

      {/* SOS Sent Screen */}
      {showSOSSent && <SOSSent />}
    </View>
  );
}
