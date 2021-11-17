import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: "",
  },

  reducers: {
    productFetchingStart: (state) => {
      state.loading = true;
    },
    productFetchingSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    productFetchingFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const singleProductSlice = createSlice({
  name: "product",
  initialState: {
    product: {},
    loading: false,
    error: "",
  },

  reducers: {
    singleProductFetchingStart: (state) => {
      state.loading = true;
    },
    singleProductFetchingSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    singleProductFetchingFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  productFetchingStart,
  productFetchingSuccess,
  productFetchingFailed,
} = productSlice.actions;

export const {
  singleProductFetchingStart,
  singleProductFetchingSuccess,
  singleProductFetchingFailed,
} = singleProductSlice.actions;

export const productReducer = productSlice.reducer;
export const singleProductReducer = singleProductSlice.reducer;
