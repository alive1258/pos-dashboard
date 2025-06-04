import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeUser(state, action) {
      state.user = action.payload;
    },
    logOut(state) {
      state.user = null;
    },
  },
});

export const { storeUser, logOut } = authSlice.actions;
export default authSlice.reducer;
