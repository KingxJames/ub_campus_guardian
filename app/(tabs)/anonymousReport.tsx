import { useCreateAnonymousReportMutation } from "@/store/services/anonymousAPI";
import { useNavigation } from "expo-router";
import React from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
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
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const anonymousReport = useSelector(selectAnonymousReport);
  const selectedCategory = useSelector(selectAnonymousReportCategory);

  const [errors, setErrors] = React.useState<{ [key: string]: boolean }>({});
  const [submittedId, setSubmittedId] = React.useState<string | null>(null);
  const [submittedCaseNumber, setSubmittedCaseNumber] = React.useState<
    string | null
  >(null);

  const [createAnonymousReport] = useCreateAnonymousReportMutation();

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
        contentContainerStyle={{ padding: 20, paddingBottom: 20 }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 25,
          }}
        >
          <Pressable onPress={handleBackButton} hitSlop={10}>
            <Image
              source={PlaceholderImage}
              style={{
                width: 24,
                height: 24,
                marginRight: 12,
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
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            color: colors.text,
            marginBottom: 12,
          }}
        >
          Category
        </Text>
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
                      ? "#eaeaea"
                      : colors.card,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: isSelected ? "#e53935" : "#ddd",
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

        {/* Location Section */}
        <View style={{ marginTop: 25 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: colors.text,
              marginBottom: 8,
            }}
          >
            Location
          </Text>
          <TextInput
            style={{
              borderColor: colors.text + "22",
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
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: colors.text,
              marginBottom: 8,
            }}
          >
            Report Details
          </Text>
          <TextInput
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            style={{
              borderColor: colors.text + "22",
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
            backgroundColor: "#fff3cd",
            borderLeftWidth: 4,
            borderLeftColor: "#ffeeba",
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#856404", fontSize: 14, lineHeight: 20 }}>
            ⚠️ Please take this seriously. This report is not a joke and can
            impact someone's life. Provide accurate and truthful information.
          </Text>
        </View>
      </View>

      {/* Submit Button */}
      <View style={{ padding: 20, backgroundColor: colors.background }}>
        <Pressable
          onPress={handleSubmit}
          style={{
            backgroundColor: "#e53935",
            paddingVertical: 16,
            borderRadius: 12,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
            Submit Report
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
