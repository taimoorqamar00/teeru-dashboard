import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const earningApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEarning: builder.query({
      query: ({ page, limit }) => {
        return {
          url: "/earnings",
          method: "GET",
          params: {
            page,
            limit,
          },
        };
      },
      providesTags: [tagTypes.earning],
    }),
  }),
});

export const { useGetAllEarningQuery } = earningApi;
