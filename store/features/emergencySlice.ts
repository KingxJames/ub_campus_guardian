import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface EmergencyState {
  id: string;
  longitude: number | null;
  latitude: number | null;
  accuracy: number | null;
  isRead: boolean;
  timestamp: string;
  formSubmitted: boolean;
}

export const initialState: EmergencyState = {
  id: "",
  longitude: null,
  latitude: null,
  accuracy: null,
  isRead: false,
  timestamp: "",
  formSubmitted: false,
};

export const emergencySlice = createSlice({
  name: "emergency",
  initialState,
  reducers: {
    setEmergency: (state, action: PayloadAction<EmergencyState>) => {
      state = action.payload;
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
    setEmergencyFormSubmitted: (state, action: PayloadAction<boolean>) => {
      state.formSubmitted = action.payload;
      return state;
    },
  },
});

export const {
  setEmergency,
  setLongitude,
  setLatitude,
  setAccuracy,
  setEmergencyRead,
  setEmergencyTimestamp,
  setEmergencyFormSubmitted,
} = emergencySlice.actions;

export const selectEmergency = (state: RootState) => state.emergency;
export const selectEmergencyLongitude = (state: RootState) =>
  state.emergency.longitude;
export const selectEmergencyLatitude = (state: RootState) =>
  state.emergency.latitude;
export const selectEmergencyAccuracy = (state: RootState) =>
  state.emergency.accuracy;
export const selectEmergencyReady = (state: RootState) =>
  state.emergency.isRead;
export const selectEmergencyTimestamp = (state: RootState) =>
  state.emergency.timestamp;
export const selectEmergencyFormSubmitted = (state: RootState) =>
  state.emergency.formSubmitted;

export default emergencySlice.reducer;
