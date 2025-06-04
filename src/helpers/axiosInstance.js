import { getNewAccessToken } from "@/services/auth.services";
import axios from "axios";

// Create an instance of axios
const instance = axios.create({
  withCredentials: true, // Allow sending cookies with requests (for refresh tokens stored in cookies)
  timeout: 60000, // Set a global timeout (60 seconds) for all requests
});

// Flag to track refresh token request status and pending requests queue
let isRefreshing = false;

// Queue to hold pending requests while token is being refreshed
let pendingRequests = [];

/**
 * Response Interceptor
 *
 * Handles token expiration globally. If a request fails with 403 (Forbidden),
 * and the token hasn't already been refreshed, it attempts to refresh the token.
 * All other pending requests are queued and retried once the token is successfully refreshed.
 */
instance.interceptors.response.use(
  // On successful response, return it as-is
  function (response) {
    return response;
  },

  // On error response
  async function (error) {
    const config = error.config;

    // Check if error status is 400 (or another status your backend uses for token refresh)

    // and the retry flag `sent` is not yet set on the config object
    if (error.response?.status === 403 && !config.sent) {
      if (!isRefreshing) {
        isRefreshing = true;
        config.sent = true; // Avoid retrying same request multiple times

        try {
          // Attempt to refresh the access token
          await getNewAccessToken();

          // After refreshing, retry all pending requests
          pendingRequests.forEach((callback) => callback());
          pendingRequests = [];

          // Retry the original failed request
          return instance(config);
        } catch (refreshError) {
          // Token refresh failed; reject with the refresh error
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      // If a refresh is already in progress, queue the request until refresh completes
      return new Promise((resolve) => {
        pendingRequests.push(() => resolve(instance(config)));
      });
    } else {
      // For other errors, format and return a consistent error structure
      // Return a structured error response
      const responseObject = {
        statusCode: error?.response?.status || 500,
        message: error?.response?.data?.message || "Something went wrong!",
      };
      return Promise.reject(responseObject);
    }
  }
);

export { instance };
