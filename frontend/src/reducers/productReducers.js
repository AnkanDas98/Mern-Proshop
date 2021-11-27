import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: "",
    page: "",
    pages: "",
  },

  reducers: {
    productFetchingStart: (state) => {
      state.loading = true;
    },
    productFetchingSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.page = action.payload.page;
      state.pages = action.payload.pages;
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

const createProductReviewSlice = createSlice({
  name: "productReview",
  initialState: {
    loading: false,
    error: "",
    success: false,
  },

  reducers: {
    create_product_review_request: (state) => {
      state.loading = true;
    },
    create_product_review_success: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    create_product_review_failed: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    create_product_review_reset: (state) => {
      state.loading = false;
      state.success = false;
      state.error = "";
    },
  },
});

const topProductSlice = createSlice({
  name: "topProduct",
  initialState: {
    products: [],
    loading: false,
  },
  reducers: {
    top_product_request: (state, action) => {
      state.loading = true;
    },
    top_product_success: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    top_product_failed: (state, action) => {
      state.loading = false;
      state.success = false;
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

export const {
  create_product_review_request,
  create_product_review_success,
  create_product_review_failed,
  create_product_review_reset,
} = createProductReviewSlice.actions;

export const { top_product_request, top_product_success, top_product_failed } =
  topProductSlice.actions;

export const productReducer = productSlice.reducer;
export const singleProductReducer = singleProductSlice.reducer;
export const createProductReviewReducer = createProductReviewSlice.reducer;
export const topRatedProductReducer = topProductSlice.reducer;
