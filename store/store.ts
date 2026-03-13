import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import anonymousReportReducer from "./features/anonymousReportSlice";
import buildingReducer from "./features/buildingSlice";
import emergencyReducer from "./features/emergencySlice";
import { baseAPI } from "./services/baseAPI";

const anonymousReportPersistConfig = {
  key: "anonymousReport",
  storage,
  whitelist: ["category", "reports", "location", "formSubmitted"],
};

const emergencyPersistConfig = {
  key: "emergency",
  storage,
  whitelist: [
    "longitude",
    "latitude",
    "accuracy",
    "isRead",
    "timestamp",
    "formSubbmitted",
  ],
};

const rootReducer = combineReducers({
  anonymousReport: persistReducer(
    anonymousReportPersistConfig,
    anonymousReportReducer,
  ),
  emergency: persistReducer(emergencyPersistConfig, emergencyReducer),
  buildings: buildingReducer,
  [baseAPI.reducerPath]: baseAPI.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseAPI.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
