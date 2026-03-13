import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface AnonymousReportState {
  id: string;
  category: string;
  reports: string;
  location: string;
  formSubmitted: boolean;
}

export const initialState: AnonymousReportState = {
  id: "",
  category: "",
  reports: "",
  location: "",
  formSubmitted: false,
};

export const anonymousReportSlice = createSlice({
  name: "anonymousReport",
  initialState,
  reducers: {
    setAnonymousReport: (
      state,
      action: PayloadAction<AnonymousReportState>,
    ) => {
      state = action.payload;
      return state;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
      return state;
    },
    setReports: (state, action: PayloadAction<string>) => {
      state.reports = action.payload;
      return state;
    },
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
      return state;
    },
    setFormSubmitted: (state, action: PayloadAction<boolean>) => {
      state.formSubmitted = action.payload;
      return state;
    },
  },
});

export const {
  setAnonymousReport,
  setCategory,
  setReports,
  setLocation,
  setFormSubmitted,
} = anonymousReportSlice.actions;

export const selectAnonymousReport = (state: RootState) =>
  state.anonymousReport;
export const selectAnonymousReportCategory = (state: RootState) =>
  state.anonymousReport.category;
export const selectAnonymousReportReports = (state: RootState) =>
  state.anonymousReport.reports;
export const selectAnonymousReportLocation = (state: RootState) =>
  state.anonymousReport.location;
export const selectAnonymousReportFormSubmitted = (state: RootState) =>
  state.anonymousReport.formSubmitted;

export default anonymousReportSlice.reducer;
