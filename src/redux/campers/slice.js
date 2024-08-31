import { createSlice } from "@reduxjs/toolkit";
import { fetchCampers } from "./operations";

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    hasLoaded: false,
    totalCount: 0,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.fulfilled, (state, action) => {
    state.isLoading = false;
    state.error = null;
    state.hasLoaded = true;

    console.log("Action Payload:", action.payload); // Логирование payload

    const { items, totalCount } = action.payload;

    if (Array.isArray(items)) {
        state.items = [...state.items, ...items];
    } else {
        console.error("Unexpected data format:", action.payload);
    }

    state.totalCount = totalCount;
})
      .addCase(fetchCampers.rejected, handleRejected)
      .addCase(fetchCampers.pending, handlePending);
  },
});

export const campersReducer = campersSlice.reducer;
