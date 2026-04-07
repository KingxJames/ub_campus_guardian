import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface AnonymousReportState {
  id: string;
  caseNumber: string;
  category: string;
  location: string;
  reports: string;
  isRead: boolean;
  uploadedBy: string;
  formSubmitted: boolean;
}

export const initialState: AnonymousReportState = {
  id: "",
  caseNumber: "",
  category: "",
  reports: "",
  location: "",
  isRead: false,
  uploadedBy: "",
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
    setCaseNumber: (state, action: PayloadAction<string>) => {
      state.caseNumber = action.payload;
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
    setUploadedBy: (state, action: PayloadAction<string>) => {
      state.uploadedBy = action.payload;
      return state;
    },
    setIsRead: (state, action: PayloadAction<boolean>) => {
      state.isRead = action.payload;
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
  setCaseNumber,
  setCategory,
  setReports,
  setLocation,
  setIsRead,
  setUploadedBy,
  setFormSubmitted,
} = anonymousReportSlice.actions;

export const selectAnonymousReport = (state: RootState) =>
  state.anonymousReport;
export const selectAnonymousReportId = (state: RootState) =>
  state.anonymousReport.id;
export const selectAnonymousReportCaseNumber = (state: RootState) =>
  state.anonymousReport.caseNumber;
export const selectAnonymousReportCategory = (state: RootState) =>
  state.anonymousReport.category;
export const selectAnonymousReportReports = (state: RootState) =>
  state.anonymousReport.reports;
export const selectAnonymousReportLocation = (state: RootState) =>
  state.anonymousReport.location;
export const selectAnonymousReportIsRead = (state: RootState) =>
  state.anonymousReport.isRead;
export const selectAnonymousReportUploadedBy = (state: RootState) =>
  state.anonymousReport.uploadedBy;
export const selectAnonymousReportFormSubmitted = (state: RootState) =>
  state.anonymousReport.formSubmitted;

export default anonymousReportSlice.reducer;
