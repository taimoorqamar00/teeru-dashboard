import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const settingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContactUs: builder.query({
      query: () => ({
        url: `/settings/contactUs`,
        method: "GET",
      }),
      providesTags: [tagTypes.setting],
    }),
    updateSetting: builder.mutation({
      query: (data) => {
        return {
          url: `/settings`,
          method: "PUT",
          body: data, // Passing the body from the request
        };
      },
      invalidatesTags: [tagTypes.setting],
    }),
    addPromotion: builder.mutation({
      query: (req) => {
        return {
          url: `/slidingText/add`,
          method: "POST",
          body: req.body, // Passing the body from the request
        };
      },
      invalidatesTags: [tagTypes.promotion],
    }),
    getPromotion: builder.query({
      query: () => ({
        url: `/slidingText`,
        method: "GET",
      }),
      providesTags: [tagTypes.promotion],
    }),
  }),
});

export const {
  useGetContactUsQuery,
  useUpdateSettingMutation,
  useAddPromotionMutation,
  useGetPromotionQuery,
} = settingApi;
