import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const UsersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: ({ page, searchTerm, limit }) => ({
        url: "/users/all-users",
        method: "GET",
        params: {
          page,
          searchTerm,
          limit,
        },
      }),
      providesTags: [tagTypes.user],
    }),

    blockUser: builder.mutation({
      query: (req) => ({
        url: `/users/block/${req.params}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.user],
    }),

    unBlockUser: builder.mutation({
      query: (req) => {
        return {
          url: `/users/unblock/${req.params}`,
          method: "PATCH",
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
    changeRole: builder.mutation({
      query: (req) => {
        return {
          url: `/users/changeRole/${req.params}`,
          method: "PATCH",
          body: req.body,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useBlockUserMutation,
  useUnBlockUserMutation,
  useChangeRoleMutation,
} = UsersApi;
