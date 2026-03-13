import { EmergencyState } from "../features/emergencySlice";
import { baseAPI } from "./baseAPI";

export const emergencySlice = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    initializeEmergency: builder.mutation({
      query: (body: Partial<EmergencyState>) => ({
        url: "public/initialize/emergency",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Emergency"],
    }),
    fetchEmergency: builder.query({
      query: () => ({
        url: "public/emergency",
        method: "GET",
      }),
      providesTags: ["Emergency"],
    }),
    createEmergency: builder.mutation({
      query: (body: Partial<EmergencyState>) => ({
        url: "public/emergency",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Emergency"],
    }),
    updateEmergency: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `public/emergency/${id}`,
        method: "PUT",
        body: { id, ...patch },
      }),
      invalidatesTags: ["Emergency"],
    }),
    deleteEmergency: builder.mutation<void, string>({
      query: (id) => ({
        url: `public/emergency/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Emergency"],
    }),
    unreadEmergency: builder.mutation({
      query: (id: string) => ({
        url: `public/unreadEmergency/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Emergency"],
    }),
    readEmergency: builder.mutation({
      query: (id: string) => ({
        url: `public/readEmergency/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Emergency"],
    }),
  }),
});

export const {
  useInitializeEmergencyMutation,
  useFetchEmergencyQuery,
  useCreateEmergencyMutation,
  useUpdateEmergencyMutation,
  useDeleteEmergencyMutation,
} = emergencySlice;
