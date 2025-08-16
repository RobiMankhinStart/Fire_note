import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "counter",
  initialState: {
    value: JSON.parse(localStorage.getItem("userinfo")) || null,
  },
  reducers: {
    userinfo: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { userinfo } = UserSlice.actions;

export default UserSlice.reducer;
