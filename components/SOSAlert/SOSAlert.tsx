import {
  selectEmergency,
  setAccuracy,
  setEmergencyFormSubmitted,
  setEmergencyId,
  setEmergencyReportStatus,
  setEmergencyTimestamp,
  setLatitude,
  setLongitude,
} from "@/store/features/emergencySlice";
import { useCreateEmergencyMutation } from "@/store/services/emergencyAPI";
import * as Crypto from "expo-crypto";
import * as Location from "expo-location";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../ThemeProvider/ThemeProvider";

const PlaceholderImage = require("../../assets/images/publicSafetyLogo White Transparent background.png");

interface SOSAlertProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function SOSAlert({
  visible,
  onConfirm,
  onCancel,
}: SOSAlertProps) {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const emergency = useSelector(selectEmergency);
  const [createEmergency] = useCreateEmergencyMutation();
  const [isSending, setIsSending] = useState(false);

  // High-accuracy GPS fixes can take a long time (or never resolve) indoors.
  // Race it against a timeout and fall back to the last known location.
  const getLocationWithTimeout = async (timeoutMs = 8000) => {
    try {
      return await Promise.race([
        Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        }),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("location-timeout")), timeoutMs)
        ),
      ]);
    } catch {
      const lastKnown = await Location.getLastKnownPositionAsync();
      if (lastKnown) return lastKnown;
      throw new Error("Unable to get your location.");
    }
  };

  const handleConfirm = async () => {
    if (isSending) return;
    setIsSending(true);
    try {
      // Request location permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Location permission is required for SOS.");
        return;
      }

      // Get current location
      const location = await getLocationWithTimeout();
      const { latitude, longitude, accuracy } = location.coords;

      // Generate timestamp and unique ID
      const timestamp = new Date().toISOString(); // HH:MM:SS
      const id = Crypto.randomUUID();

      // Save in Redux
      dispatch(setEmergencyId(id));
      dispatch(setLatitude(latitude));
      dispatch(setLongitude(longitude));
      dispatch(setAccuracy(accuracy));
      dispatch(setEmergencyTimestamp(timestamp)); // if using timestamp field
      dispatch(setEmergencyFormSubmitted(true));
      dispatch(setEmergencyReportStatus("Active")); // if using status field
      // dispatch(setEmergency({ ...emergency, id })); // ❌ remove this line

      // Send to backend
      await createEmergency({
        id,
        latitude,
        longitude,
        accuracy,
        timestamp,
        emergencyReportStatus: "Active", // if using status field
        isRead: false,
        formSubmitted: true,
      }).unwrap();

      console.log("Emergency successfully created with ID:", id);
      onConfirm();
    } catch (error) {
      console.error("Failed to create emergency:", error);
      alert("Failed to send SOS. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      {/* Overlay background */}
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.6)",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
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
            Send SOS Alert
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
            This will immediately alert campus security with your location. Only
            use this feature during a real emergency.
          </Text>

          {/* Buttons */}
          <View style={{ flexDirection: "row", width: "100%" }}>
            <Pressable
              onPress={onCancel}
              disabled={isSending}
              style={{
                flex: 1,
                paddingVertical: 14,
                marginRight: 10,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "#ccc",
                alignItems: "center",
                opacity: isSending ? 0.5 : 1,
              }}
            >
              <Text style={{ color: colors.text, fontWeight: "600" }}>
                Cancel
              </Text>
            </Pressable>

            <Pressable
              onPress={handleConfirm}
              disabled={isSending}
              style={{
                flex: 1,
                paddingVertical: 14,
                marginLeft: 10,
                borderRadius: 12,
                backgroundColor: "#e53935",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                opacity: isSending ? 0.7 : 1,
              }}
            >
              {isSending && (
                <ActivityIndicator
                  size="small"
                  color="white"
                  style={{ marginRight: 8 }}
                />
              )}
              <Text style={{ color: "white", fontWeight: "700" }}>
                {isSending ? "Sending..." : "Confirm SOS"}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
