import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const UsersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: ({ page, searchTerm, limit, role }) => ({
        url: "/users/all-users",
        method: "GET",
        params: {
          page,
          searchTerm,
          limit,
          role,
        },
      }),
      transformResponse: (response: any) => {
        try {
          if (response && response.data && Array.isArray(response.data)) {
            const mapped = response.data.map((u: any) => {
              // Normalize role field: prefer `role`, fallback to `userType`, or first item of `roles` array
              const roleVal = u.role ?? u.userType ?? (Array.isArray(u.roles) ? u.roles[0] : undefined) ?? "user";
              return { ...u, role: roleVal };
            });
            return { ...response, data: mapped };
          }
        } catch (e) {
          // ignore and return original
          console.error("getAllUsers transformResponse error", e);
        }
        return response;
      },
      providesTags: [tagTypes.user],
    }),

    createStaff: builder.mutation({
      query: (req) => ({
        url: "/users/create-staff",
        method: "POST",
        body: req?.body ?? req,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/delete-staff/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.user],
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
  useCreateStaffMutation,
  useDeleteUserMutation,
  useBlockUserMutation,
  useUnBlockUserMutation,
  useChangeRoleMutation,
} = UsersApi;
