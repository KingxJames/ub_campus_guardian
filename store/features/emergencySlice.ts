import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface EmergencyState {
  id: string;
  longitude: number | null;
  latitude: number | null;
  accuracy: number | null;
  isRead: boolean;
  timestamp: string;
  emergencyReportStatus: string;
  formSubmitted: boolean;
}

export const initialState: EmergencyState = {
  id: "",
  longitude: null,
  latitude: null,
  accuracy: null,
  isRead: false,
  timestamp: "",
  emergencyReportStatus: "Active",
  formSubmitted: false,
};

export const emergencySlice = createSlice({
  name: "emergency",
  initialState,
  reducers: {
    setEmergency: (state, action: PayloadAction<EmergencyState>) => {
      Object.assign(state, action.payload);
    },
    setEmergencyId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
      return state;
    },
    setLongitude: (state, action: PayloadAction<number | null>) => {
      state.longitude = action.payload;
      return state;
    },
    setLatitude: (state, action: PayloadAction<number | null>) => {
      state.latitude = action.payload;
      return state;
    },
    setAccuracy: (state, action: PayloadAction<number | null>) => {
      state.accuracy = action.payload;
      return state;
    },

    setEmergencyRead: (state, action: PayloadAction<boolean>) => {
      state.isRead = action.payload;
      return state;
    },
    setEmergencyTimestamp: (state, action: PayloadAction<string>) => {
      state.timestamp = action.payload;
      return state;
    },

    setEmergencyReportStatus: (state, action: PayloadAction<string>) => {
      state.emergencyReportStatus = action.payload;
      return state;
    },

    setEmergencyFormSubmitted: (state, action: PayloadAction<boolean>) => {
      state.formSubmitted = action.payload;
      return state;
    },
  },
});

export const {
  setEmergencyId,
  setEmergency,
  setLongitude,
  setLatitude,
  setAccuracy,
  setEmergencyRead,
  setEmergencyTimestamp,
  setEmergencyReportStatus,
  setEmergencyFormSubmitted,
} = emergencySlice.actions;

export const selectEmergency = (state: RootState) => state.emergency;
export const selectEmergencyId = (state: RootState) => state.emergency.id;
export const selectEmergencyLongitude = (state: RootState) =>
  state.emergency.longitude;
export const selectEmergencyLatitude = (state: RootState) =>
  state.emergency.latitude;
export const selectEmergencyAccuracy = (state: RootState) =>
  state.emergency.accuracy;
export const selectEmergencyRead = (state: RootState) => state.emergency.isRead;
export const selectEmergencyTimestamp = (state: RootState) =>
  state.emergency.timestamp;
export const selectEmergencyFormSubmitted = (state: RootState) =>
  state.emergency.formSubmitted;
export const selectEmergencyReportStatus = (state: RootState) =>
  state.emergency.emergencyReportStatus;

export default emergencySlice.reducer;
