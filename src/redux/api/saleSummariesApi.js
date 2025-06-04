import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const SALE_URL = "/sale-summaries";

export const saleSummariesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  sale-summaries
    createSaleSummaries: build.mutation({
      query: (data) => ({
        url: `${SALE_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.sale_summaries],
    }),

    // Query for fetching all sale-summaries
    getAllSaleReport: build.query({
      query: (arg) => ({
        url: `${SALE_URL}/sale-reports`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.sale_summaries],
    }),

    // Query for fetching a single sale-summaries by its ID
    getSingleSaleSummary: build.query({
      query: (id) => ({
        url: `${SALE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.sale_summaries],
    }),
    // Query for fetching a single /get-invoice by its invoice
    getInvoiceBySaleSummaries: build.query({
      query: (id) => ({
        url: `${SALE_URL}/get-invoice/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.sale_summaries],
    }),
  }),
});

export const {
  useCreateSaleSummariesMutation,
  useGetAllSaleReportQuery,
  useGetSingleSaleSummaryQuery,
  useGetInvoiceBySaleSummariesQuery,
} = saleSummariesApi;
