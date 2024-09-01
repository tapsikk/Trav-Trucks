import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";


export const fetchCampers = createAsyncThunk(
  "campers/fetchAll",
  async ({ page = 1, limit = 4, filters = [] }, thunkAPI) => {
    try {
      const queryStrings = filters.equipment
      .map(filter => `${encodeURIComponent(filter)}=${encodeURIComponent(filter ==='transmission' ? "automatic" : true )}`)
      filters.location && queryStrings.push(`location=${encodeURIComponent(filters.location)}`)
      filters.type && queryStrings.push(`form=${encodeURIComponent(filters.type)}`)
      queryStrings.join('&');
      const res = await axios.get(`/campers?${queryStrings.join('&')}`, {
        params: { page, limit }
        
      });
      
      return {
        items: res.data.items,
        totalCount: res.data.total,
      };
    } catch (error) {
      console.error("Error fetching campers:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
