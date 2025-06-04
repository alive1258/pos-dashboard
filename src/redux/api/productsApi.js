import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const PRODUCT_URL = "/products";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  products
    createProducts: build.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.products],
    }),

    // Query for fetching all products
    getAllProducts: build.query({
      query: (arg) => ({
        url: `${PRODUCT_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.products],
    }),

    // Query for fetching a single products by its ID
    getSingleProduct: build.query({
      query: (id) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.products],
    }),

    // Mutation for updating a single products by its ID
    updateProduct: build.mutation({
      query: ({ id, data }) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: [tagTypes.products],
    }),

    // Mutation for deleting a products by its ID
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.products],
    }),
  }),
});

export const {
  useCreateProductsMutation,
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
