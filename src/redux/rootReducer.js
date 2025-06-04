import { persistReducer } from "redux-persist";
import authSlice from "./features/authSlice";
import otpSlice from "./features/otpSlice";
import adminSiteBerSlice from "./features/adminSiteBerSlice";
import storage from "redux-persist/lib/storage";
import { baseApi } from "./api/baseApi";
import saleCartReducer from "./features/saleCartSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedAdminSideBarTree = persistReducer(
  persistConfig,
  adminSiteBerSlice
);
const persistedAuth = persistReducer(persistConfig, authSlice);
const persistedOtp = persistReducer(persistConfig, otpSlice);

const persistedSaleCartReducer = persistReducer(persistConfig, saleCartReducer);

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,

  saleCart: persistedSaleCartReducer,
  auth: persistedAuth,
  otpTree: persistedOtp,
  adminTree: persistedAdminSideBarTree,
};
