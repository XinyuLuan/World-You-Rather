import { createSlice } from "@reduxjs/toolkit";

const sliceName = "loading";
const initialState = true;

export const loading = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setLoading: (state, action) => {
      const loading = action.payload;
      return loading;
    },
  },
});

export const { setLoading } = loading.actions;

export const selectLoading = (state) => state.loading;

export default loading.reducer;
