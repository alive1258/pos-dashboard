import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { baseApi } from "./api/baseApi";
import { reducer } from "./rootReducer";

// Check if window is defined (client-side)
const isClient = typeof window !== "undefined";

// Configure store
export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "faqsApi/executeMutation/pending",
          "faqsApi/executeMutation/fulfilled",
          "faqsApi/executeMutation/rejected",
        ],
        ignoredActionPaths: ["meta.arg", "register"],
        ignoredPaths: ["meta.arg.originalArgs", "register"],
      },
    }).concat(baseApi.middleware),
});

// Create a persistor only on the client-side to avoid SSR issues
export const persistor = isClient ? persistStore(store) : null;
