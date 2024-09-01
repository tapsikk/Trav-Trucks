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
  reducers: {
    // Reducer to reset the campers list
    resetCampersList: (state) => {
      state.items = [];
      state.totalCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.fulfilled, (state, action) => {
    state.isLoading = false;
    state.error = null;
    state.hasLoaded = true;

    const { items, totalCount } = action.payload;

    if (Array.isArray(items)) {
      const existingIds = new Set(state.items.map(item => item.id));

      const newItems = items.filter(item => !existingIds.has(item.id));

      state.items = [...state.items, ...newItems];
    } else {
        console.error("Unexpected data format:", action.payload);
    }

    state.totalCount = totalCount;
})
      .addCase(fetchCampers.rejected, handleRejected)
      .addCase(fetchCampers.pending, handlePending);
  },
});

export const { resetCampersList } = campersSlice.actions;
export const campersReducer = campersSlice.reducer;
