import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addEvent: builder.mutation({
      query: ({ body }) => {
        return {
          url: "/event/create",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: [tagTypes.event],
    }),
    getEvent: builder.query({
      query: ({ page, limit }) => {
        return {
          url: "/event",
          method: "GET",
          params: {
            page,
            limit,
          },
        };
      },
      providesTags: [tagTypes.event],
    }),
    updateEvent: builder.mutation({
      query: (req) => {
        return {
          url: `/event/${req.params}`,
          method: "PATCH",
          body: req.body,
        };
      },
      invalidatesTags: [tagTypes.event],
    }),
    deleteEvent: builder.mutation({
      query: (req) => {
        return {
          url: `/event/${req.params}`,
          method: "DELETE",
          body: { role: req.body },
        };
      },
      invalidatesTags: [tagTypes.event],
    }),
  }),
});

export const {
  useAddEventMutation,
  useGetEventQuery,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventApi;
