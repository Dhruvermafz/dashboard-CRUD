import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Backend API
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL || "http://localhost:5001",
  }), // Base URL
  reducerPath: "adminApi",
  // Tags for caching and refetching
  tagTypes: ["Users", "Roles", "Dashboard", "Tasks"],
  // Endpoints
  endpoints: (build) => ({
    getUser: build.query({
      query: () => "management/users", // Adjust the endpoint URL as needed
      providesTags: ["Users"],
    }),
    getRoles: build.query({
      query: () => "management/roles", // Adjust the endpoint URL as needed
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
      query: () => "management/admins",
      providesTags: ["Admins"],
    }),
    getCustomers: build.query({
      query: () => "client/customers",
      providesTags: ["Customers"],
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
} = api;
