import { AnonymousReportState } from "../features/anonymousReportSlice";
import { baseAPI } from "./baseAPI";

export const anonymousReportSlice = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    initializeAnonymousReport: builder.mutation({
      query: (body: Partial<AnonymousReportState>) => ({
        url: "public/initialize/anonymousReports",
        method: "POST",
        body,
      }),
      invalidatesTags: ["AnonymousReport"],
    }),
    fetchAnonymousReport: builder.query({
      query: () => ({
        url: "public/anonymousReports",
        method: "GET",
      }),
      providesTags: ["AnonymousReport"],
    }),
    createAnonymousReport: builder.mutation({
      query: (body: Partial<AnonymousReportState>) => ({
        url: "public/anonymousReports",
        method: "POST",
        body,
      }),
      invalidatesTags: ["AnonymousReport"],
    }),
    updateAnonymousReport: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `public/anonymousReports/${id}`,
        method: "PUT",
        body: { id, ...patch },
      }),
      invalidatesTags: ["AnonymousReport"],
    }),
    deleteAnonymousReport: builder.mutation<void, string>({
      query: (id) => ({
        url: `public/anonymousReports/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AnonymousReport"],
    }),
    getUnsubmittedAnonymousReports: builder.query({
      query: (): { url: string; method: string } => ({
        url: "public/unsubmittedAnonymousReports",
        method: "GET",
      }),
      providesTags: ["AnonymousReport"],
    }),
    generateAnonymousReportPdf: builder.mutation({
      query: (id: string) => ({
        url: `public/generateAnonymousReportPdf/${id}`,
        method: "GET",
        responseHandler: (response: Response) => response.blob(),
        headers: {
          Accept: "application/pdf",
        },
      }),
      invalidatesTags: ["AnonymousReport"],
    }),
  }),
});

export const {
  useInitializeAnonymousReportMutation,
  useFetchAnonymousReportQuery,
  useCreateAnonymousReportMutation,
  useUpdateAnonymousReportMutation,
  useDeleteAnonymousReportMutation,
  useGetUnsubmittedAnonymousReportsQuery,
  useGenerateAnonymousReportPdfMutation,
} = anonymousReportSlice;
