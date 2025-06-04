import { instance as axiosInstance } from "./axiosInstance";

// Function to create a base axios query
export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: process.env.NEXT_PUBLIC_API_URL }) =>
  // Async function to execute the axios query
  async ({ url, method, data, params, headers, contentType }) => {
    try {
      // console.log("params", params);
      // Execute the axios instance with provided parameters
      const result = await axiosInstance({
        // Concatenate baseUrl with provided url
        url: baseUrl + url,

        // HTTP method (GET, POST, PUT, DELETE, etc.)
        method,
        // Data to be sent with the request
        data,
        // URL parameters
        params,

        //headers
        headers: {
          ...headers,
          // Set Content-Type header, defaulting to "application/json" if not provided
          "Content-Type":
            contentType || "application/json" || "multipart/form-data",
        },
        withCredentials: true,
        // meta use pagination limit ,pageNumber,totalData
      });

      // Ensure to return only the data property
      return { data: result.data };
    } catch (axiosError) {
      console.log("axiosError", axiosError);
      const err = axiosError;
      if (Array.isArray(err?.message)) {
        err.message = err.message[0];
      }
      // Return error response
      return {
        error: {
          // Extract status code from error response
          status: err.statusCode,
          // Extract error data from error response or use error message
          message: err.message,
        },
      };
    }
  };
