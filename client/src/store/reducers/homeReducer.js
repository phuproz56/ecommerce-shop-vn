import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_categorys = createAsyncThunk(
  "product/get_categorys",
  async (_, { fulfillWithValue }) => {
    try {
      const { data } = await api.get("/home/get-categorys");
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const get_products = createAsyncThunk(
  "product/get_products",
  async (_, { fulfillWithValue }) => {
    try {
      const { data } = await api.get("/home/get-products");
      return fulfillWithValue(data);
      
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const homeReducer = createSlice({
  name: "home",
  initialState: {
    categorys: [],
    products: [],
    latest_products: [],
    topRated_products: [],
    discount_products: [],
  },
  reducers: {},
  extraReducers: {
    [get_categorys.fulfilled]: (state, { payload }) => {
      state.categorys = payload.categorys;
    },
    [get_products.fulfilled]: (state, { payload }) => {
      state.products = payload.products;
      state.latest_products = payload.latest_products;
      state.topRated_products = payload.topRated_products;
      state.discount_products = payload.discount_products;
    },
  },
});

export default homeReducer.reducer;
