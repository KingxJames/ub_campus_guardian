import { useCreateAnonymousReportMutation } from "@/store/services/anonymousAPI";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../components/ThemeProvider/ThemeProvider";
import {
  initialState,
  selectAnonymousReport,
  selectAnonymousReportCategory,
  setAnonymousReport,
  setCategory,
  setLocation,
  setReports,
} from "../../store/features/anonymousReportSlice";

const PlaceholderImage = require("../../assets/images/left-arrow.png");

const categories = [
  "Suspicious Activity",
  "Harassment",
  "Theft",
  "Drug Activity",
  "Vandalism",
  "Other",
];

export default function AnonymousReport() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const anonymousReport = useSelector(selectAnonymousReport);
  const selectedCategory = useSelector(selectAnonymousReportCategory);

  const [errors, setErrors] = React.useState<{ [key: string]: boolean }>({});
  const [submittedId, setSubmittedId] = React.useState<string | null>(null);
  const [submittedCaseNumber, setSubmittedCaseNumber] = React.useState<
    string | null
  >(null);

  const [createAnonymousReport, { isLoading: isSubmitting }] =
    useCreateAnonymousReportMutation();

  const handleBackButton = () => navigation.goBack();

  const validateForm = () => {
    const requiredFields = ["category", "reports", "location"];
    const newErrors: { [key: string]: boolean } = {};
    const missingFields: string[] = [];

    requiredFields.forEach((field) => {
      if (!anonymousReport[field as keyof typeof anonymousReport]) {
        newErrors[field] = true;
        missingFields.push(field);
      }
    });

    setErrors(newErrors);

    if (missingFields.length > 0) {
      alert(
        `Please fill in the following required field${
          missingFields.length > 1 ? "s" : ""
        }: ${missingFields.join(", ")}`,
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    if (!validateForm()) return;

    try {
      const result = await createAnonymousReport({
        category: anonymousReport.category,
        location: anonymousReport.location,
        reports: anonymousReport.reports,
        formSubmitted: true,
      }).unwrap();

      setSubmittedId(result.data.id);
      setSubmittedCaseNumber(result.data.caseNumber);

      alert(`Report submitted successfully!\nID: ${result.data.id}`);

      // Reset form
      dispatch(setAnonymousReport(initialState));
    } catch (err) {
      console.error("Failed to submit anonymous report:", err);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 20,
          paddingTop: insets.top + 20,
          paddingBottom: 20,
        }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 25,
          }}
        >
          <Pressable
            onPress={handleBackButton}
            hitSlop={10}
            style={({ pressed }) => ({
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: colors.card,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 14,
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Image
              source={PlaceholderImage}
              style={{
                width: 18,
                height: 18,
                tintColor: colors.text,
              }}
            />
          </Pressable>
          <View>
            <Text
              style={{ fontSize: 22, fontWeight: "700", color: colors.text }}
            >
              Anonymous Report
            </Text>
            <Text style={{ fontSize: 13, color: colors.text + "99" }}>
              Your identity is fully protected
            </Text>

            {submittedId && (
              <Text
                style={{
                  fontSize: 12,
                  color: colors.text + "66",
                  marginTop: 4,
                }}
              >
                Last Report ID: {submittedId}
              </Text>
            )}
            {submittedCaseNumber && (
              <Text
                style={{
                  fontSize: 12,
                  color: colors.text + "66",
                  marginTop: 4,
                }}
              >
                Case Number: {submittedCaseNumber}
              </Text>
            )}
          </View>
        </View>

        {/* Category Section */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <Ionicons
            name="pricetag-outline"
            size={16}
            color={colors.text}
            style={{ marginRight: 8 }}
          />
          <Text style={{ fontSize: 18, fontWeight: "600", color: colors.text }}>
            Category
          </Text>
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <Pressable
                key={category}
                onPress={() => dispatch(setCategory(category))}
                style={({ pressed }) => ({
                  paddingVertical: 10,
                  paddingHorizontal: 14,
                  backgroundColor: isSelected
                    ? "#e53935"
                    : pressed
                      ? colors.text + "11"
                      : colors.card,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: isSelected
                    ? "#e53935"
                    : errors.category
                      ? "#e5393588"
                      : colors.text + "22",
                  marginRight: 10,
                  marginBottom: 10,
                })}
              >
                <Text
                  style={{
                    color: isSelected ? "white" : colors.text,
                    fontSize: 14,
                  }}
                >
                  {category}
                </Text>
              </Pressable>
            );
          })}
        </View>
        {errors.category && (
          <Text style={{ color: "#e53935", fontSize: 12, marginTop: -4, marginBottom: 8 }}>
            Please select a category
          </Text>
        )}

        {/* Location Section */}
        <View style={{ marginTop: 25 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <Ionicons
              name="location-outline"
              size={16}
              color={colors.text}
              style={{ marginRight: 8 }}
            />
            <Text style={{ fontSize: 18, fontWeight: "600", color: colors.text }}>
              Location
            </Text>
          </View>
          <TextInput
            style={{
              borderColor: errors.location ? "#e5393588" : colors.text + "22",
              borderWidth: 1,
              padding: 14,
              borderRadius: 12,
              backgroundColor: colors.card,
              color: colors.text,
            }}
            placeholder="Where did this happen?"
            placeholderTextColor={colors.text + "66"}
            value={anonymousReport.location}
            onChangeText={(text) => dispatch(setLocation(text))}
          />
        </View>

        {/* Report Details Section */}
        <View style={{ marginTop: 25 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <Ionicons
              name="document-text-outline"
              size={16}
              color={colors.text}
              style={{ marginRight: 8 }}
            />
            <Text style={{ fontSize: 18, fontWeight: "600", color: colors.text }}>
              Report Details
            </Text>
          </View>
          <TextInput
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            style={{
              borderColor: errors.reports ? "#e5393588" : colors.text + "22",
              borderWidth: 1,
              padding: 14,
              borderRadius: 12,
              backgroundColor: colors.card,
              minHeight: 120,
              color: colors.text,
            }}
            placeholder="Describe what you witnessed..."
            placeholderTextColor={colors.text + "66"}
            value={anonymousReport.reports}
            onChangeText={(text) => dispatch(setReports(text))}
          />
        </View>
      </ScrollView>

      {/* Warning Message */}
      <View style={{ paddingHorizontal: 20 }}>
        <View
          style={{
            marginTop: 20,
            padding: 15,
            flexDirection: "row",
            backgroundColor: "#f5a62322",
            borderLeftWidth: 4,
            borderLeftColor: "#f5a623",
            borderRadius: 8,
          }}
        >
          <Ionicons
            name="warning"
            size={18}
            color="#f5a623"
            style={{ marginRight: 10, marginTop: 2 }}
          />
          <Text
            style={{
              color: colors.text,
              fontSize: 14,
              lineHeight: 20,
              flex: 1,
            }}
          >
            Please take this seriously. This report is not a joke and can
            impact someone's life. Provide accurate and truthful information.
          </Text>
        </View>
      </View>

      {/* Submit Button */}
      <View
        style={{
          padding: 20,
          paddingBottom: insets.bottom + 20,
          backgroundColor: colors.background,
        }}
      >
        <Pressable
          onPress={handleSubmit}
          disabled={isSubmitting}
          style={{
            flexDirection: "row",
            backgroundColor: "#e53935",
            paddingVertical: 16,
            borderRadius: 22,
            justifyContent: "center",
            alignItems: "center",
            opacity: isSubmitting ? 0.7 : 1,
          }}
        >
          {isSubmitting ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Ionicons
                name="paper-plane-outline"
                size={18}
                color="white"
                style={{ marginRight: 8 }}
              />
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "600" }}
              >
                Submit Anonymous Report
              </Text>
            </>
          )}
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
