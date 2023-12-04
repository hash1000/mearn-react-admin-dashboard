import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001" }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Products",
    "Customer",
    "Transactions",
    "Geography",
    "Sales",
    "Admin",
    "Perfomance",
    "Dashboard",
    "Status"
  ],
  endpoints: (build) => ({
    getAllUsers: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getProducts: build.query({
      query: () => `client/porduct`,
      providesTags: ["Products"],
    }),
    getCustomers: build.query({
      query: () => `client/customer`,
      providesTags: ["Customer"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transaction",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: build.query({
      query: () => `client/geography`,
      providesTags: ["Geography"],
    }),
    getSales: build.query({
      query: () => `sales/sales`,
      providesTags: ["Sales"],
    }),
    
    getadmin: build.query({
      query: () => `management/admin`,
      providesTags: ["Admin"],
    }),
    
    getPerfomance: build.query({
      query: (id) => `management/perfomance/${id}`,
      providesTags: ["Perfomance"],
    }),
    
    getDashboard: build.query({
      query: (id) => `general/dashboard`,
      providesTags: ["Dashboard"],
    }),
    get: build.query({
      query: () => `/`,
      providesTags: ["Status"],
    })
  }),
});

export const {
  useGetAllUsersQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetadminQuery,
  useGetPerfomanceQuery,
  useGetDashboardQuery,
  useGetQuery
  
} = api;
