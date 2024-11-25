import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Backend API
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dashboard-crud.onrender.com/api",
  }), // Base URL
  reducerPath: "adminApi",
  // Tags for caching and refetching
  tagTypes: ["Users", "Roles", "Dashboard", "Tasks", "Login"],
  // Endpoints
  endpoints: (build) => ({
    getUser: build.query({
      query: () => "users", // Adjust the endpoint URL as needed
      providesTags: ["Users"],
    }),
    getRoles: build.query({
      query: () => "roles", // Adjust the endpoint URL as needed
      providesTags: ["Roles"],
    }),
    getDashboard: build.query({
      query: () => "general/dashboard", // Adjust the endpoint URL as needed
      providesTags: ["Dashboard"],
    }),
    getTasks: build.query({
      query: () => "tasks", // Adjust the endpoint URL as needed
      providesTags: ["Tasks"],
    }),
    getAdmins: build.query({
      query: () => "admins",
      providesTags: ["Admins"],
    }),
    getCustomers: build.query({
      query: () => "customers",
      providesTags: ["Customers"],
    }),
    login: build.mutation({
      // Changed to mutation
      query: (credentials) => ({
        url: "auth/login", // Endpoint for login
        method: "POST",
        body: credentials, // Send credentials in the request body
      }),
      invalidatesTags: ["Login"], // Invalidate cache if necessary
    }),
  }),
});

// Export API hooks
export const {
  useGetUserQuery,
  useGetRolesQuery,
  useGetDashboardQuery,
  useGetTasksQuery,
  useGetAdminsQuery,
  useGetCustomersQuery,
  useLoginMutation, // Changed to mutation
} = api;
