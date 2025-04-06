import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    GetKpisResponse,
    GetProductsResponse,
    GetTransactionsResponse,
    CreateProductRequest,
    UpdateProductRequest,
    CreateTransactionRequest,
    UpdateTransactionRequest,
} from "./types";

// Creating the API
export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    reducerPath: "main",
    tagTypes: ["Kpis", "Products", "Transactions"], // here we save the informations

    // Defining the endpoints
    endpoints: (build) => ({
        // GETS
        getKpis: build.query<Array<GetKpisResponse>, void>({
            query: () => "kpi/kpis/",
            providesTags: ["Kpis"],
        }),

        getProducts: build.query<Array<GetProductsResponse>, void>({
            query: () => "product/products/",
            providesTags: ["Products"],
        }),

        getTransactions: build.query<Array<GetTransactionsResponse>, void>({
            query: () => "transaction/transactions/",
            providesTags: ["Transactions"],
        }),

        // POST PRODUCT
        createProduct: build.mutation<GetProductsResponse, CreateProductRequest>({
            query: (body) => ({
                url: `product/products`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Products"],
        }),

        // DELETE PRODUCT
        deleteProduct: build.mutation<{ success: boolean; id: string }, string> ({
            query: (id) => ({
                url: `product/products/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Products"],
        }),

        // UPDATE PRODUCT
        updateProduct: build.mutation<GetProductsResponse, { id: string; body: UpdateProductRequest }> ({
            query: ({id, body}) => ({
                url: `product/products/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Products"],
        }),

        // POST TRANSACTION
        createTransaction: build.mutation<GetTransactionsResponse, CreateTransactionRequest>({
            query: (body) => ({
                url: `transaction/transactions`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Transactions"],
        }),

        // DELETE TRANSACTION
        deleteTransaction: build.mutation<{ success: boolean; id: string }, string> ({
            query: (id) => ({
                url: `transaction/transactions/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Transactions"],
        }),

        // UPDATE TRANSACTION
        updateTransaction: build.mutation<GetTransactionsResponse, { id: string; body: UpdateTransactionRequest }> ({
            query: ({id, body}) => ({
                url: `transaction/transactions/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Transactions"],
        }),

    }),
});

// Export the hooks for the new endpoints
export const {
    useGetKpisQuery,
    useGetProductsQuery,
    useGetTransactionsQuery,

    useCreateProductMutation,
    useDeleteProductMutation,
    useUpdateProductMutation,

    useCreateTransactionMutation,
    useDeleteTransactionMutation,
    useUpdateTransactionMutation,
} = api;