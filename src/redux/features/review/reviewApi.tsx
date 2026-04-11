import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReview: builder.query({
      query: ({ page, limit }) => {
        return {
          url: "/review",
          method: "GET",
          params: {
            page,
            limit,
          },
        };
      },
      providesTags: [tagTypes.review],
    }),

    deleteReview: builder.mutation({
      query: (req) => {
        return {
          url: `/review/${req.params}`,
          method: "DELETE",
          body: { role: req.body },
        };
      },
      invalidatesTags: [tagTypes.review],
    }),
  }),
});

export const { useGetReviewQuery, useDeleteReviewMutation } = reviewApi;
