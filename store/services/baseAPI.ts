import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../services/config/api";

const baseUrl = API_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: undefined,
  prepareHeaders: async (headers, { getState }: any) => {
    // const token = getState().auth.token;
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");
    return headers;
  },
});

const basequeryWithReauth = async (args: any, api: any, extraOptions: any) => {
  return await baseQuery(args, api, extraOptions);
};

export const baseAPI = createApi({
  baseQuery: basequeryWithReauth,
  reducerPath: "baseAPI",
  tagTypes: ["AnonymousReport", "Buildings", "Emergency"],
  endpoints: (_) => ({}),
});
