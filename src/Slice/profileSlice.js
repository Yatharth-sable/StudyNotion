import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  loading: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));  // ✅ persist user
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("user"); // ✅ clear on logout
    },
  },
});

export const { setUser, setLoading, logout } = profileSlice.actions;
export default profileSlice.reducer;
