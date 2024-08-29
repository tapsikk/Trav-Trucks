import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";


export const fetchCampers = createAsyncThunk(
  "campers/fetchAll",
  async ({ page = 1, limit = 4 }, thunkAPI) => {
    try {
      const res = await axios.get("/campers", {
        params: { page, limit },
      });
      console.log("Response Data:", res.data); // Логирование данных ответа

      return {
        data: res.data.items, // Здесь возвращаем массив items
        totalCount: res.data.total, // И общее количество из total
      };
    } catch (error) {
      console.error("Error fetching campers:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
