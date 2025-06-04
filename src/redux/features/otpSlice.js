import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  otpData: {},
};

const otpSlice = createSlice({
  name: "otpData",
  initialState,
  reducers: {
    storeOTPData: (state, action) => {
      state.otpData = action.payload;
    },
    removeOtpData: (state) => {
      state.otpData = null;
    },
  },
});

export const { storeOTPData, removeOtpData } = otpSlice.actions;
export default otpSlice.reducer;
