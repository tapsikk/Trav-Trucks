import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";


export const fetchCampers = createAsyncThunk(
  "campers/fetchAll",
  async ({ page = 1, limit = 4 }, thunkAPI) => {
    try {
      const res = await axios.get("/adverts", {
        params: {
          page,
          limit,
        },
      });
      const totalCount = res.headers["x-total-count"];

      return {
        data: res.data,
        totalCount: totalCount,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
