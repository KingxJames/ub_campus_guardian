import { IBuilding, setBuilding } from "../features/buildingSlice";
import { baseAPI } from "./baseAPI";

export const buildingsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    fetchBuildings: builder.query<IBuilding[], void>({
      query: () => "/public/buildings",
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setBuilding(data));
        } catch (error) {
          console.error("Failed to fetch buildings:", error);
        }
      },
      providesTags: ["Buildings"],
    }),
    fetchBuildingById: builder.query<IBuilding, string>({
      query: (id) => ({
        url: `/buildings/${id}`,
        method: "GET",
      }),
    }),
    createBuildings: builder.mutation({
      query: (body: Partial<IBuilding>) => ({
        url: "/buildings",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Buildings"],
    }),
    updateBuildings: builder.mutation<
      IBuilding,
      {
        id: string;
        name: string;
        location: string;
        longitude?: number | null;
        latitude?: number | null;
      }
    >({
      query: ({ id, name, location, longitude, latitude }) => ({
        url: `/buildings/${id}`,
        method: "PUT",
        body: {
          name,
          location,
          longitude,
          latitude,
        },
      }),
      invalidatesTags: ["Buildings"],
    }),
    deleteBuildings: builder.mutation<void, string>({
      query: (id) => ({
        url: `/buildings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Buildings"],
    }),
  }),
});

export const {
  useFetchBuildingsQuery,
  useFetchBuildingByIdQuery,
  useCreateBuildingsMutation,
  useUpdateBuildingsMutation,
  useDeleteBuildingsMutation,
} = buildingsAPI;
