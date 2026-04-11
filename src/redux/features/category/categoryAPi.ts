import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addCategory: builder.mutation({
      query: ({ body }) => {
        return {
          url: "/category/create",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: [tagTypes.category],
    }),
    getCategory: builder.query({
      query: ({ page, limit }) => {
        return {
          url: "/category",
          method: "GET",
          params: {
            page,
            limit,
          },
        };
      },
      providesTags: [tagTypes.category],
    }),
    deleteCategory: builder.mutation({
      query: (req) => {
        return {
          url: `/category/${req.params}`,
          method: "DELETE",
          body: { role: req.body },
        };
      },
      invalidatesTags: [tagTypes.category],
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useGetCategoryQuery,
  useDeleteCategoryMutation,
} = categoryApi;
