import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    order: {},
  },
  reducers: {
    order_create_request: (state) => {
      state.loading = true;
    },
    order_create_success: (state, action) => {
      state.loading = false;
      state.success = true;
      state.order = action.payload;
    },
    order_create_failed: (state, action) => {
      state.error = action.payload;
    },
  },
});

const orderDetailSlice = createSlice({
  name: "orderDetail",
  initialState: {
    loading: true,
    order: {},
    error: "",
  },
  reducers: {
    order_details_request: (state) => {
      state.loading = true;
      state.order = {};
      state.error = "";
    },
    order_details_success: (state, action) => {
      state.loading = false;

      state.order = action.payload;
    },
    order_details_failed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    order_details_reset: (state) => {
      state.error = "";
      state.order = {};
    },
  },
});

const orderPaySlice = createSlice({
  name: "orderPayDetail",
  initialState: {
    loading: false,
  },
  reducers: {
    order_pay_request: (state) => {
      state.loading = true;
    },
    order_pay_success: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    order_pay_failed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    order_pay_rest: (state, action) => {
      state = {};
    },
  },
});

const myOrdersSlice = createSlice({
  name: "myorders",
  initialState: {
    loading: false,
    orders: [],
  },
  reducers: {
    my_order_list_request: (state) => {
      state.loading = true;
    },
    my_order_list_success: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    my_order_list_failed: (state, action) => {
      state.error = action.payload;
    },
    my_order_list_reset: (state) => {
      state.orders = [];
    },
  },
});

export const {
  order_create_request,
  order_create_success,
  order_create_failed,
} = orderSlice.actions;

export const {
  order_details_request,
  order_details_success,
  order_details_failed,
  order_details_reset,
} = orderDetailSlice.actions;

export const {
  order_pay_request,
  order_pay_success,
  order_pay_failed,
  order_pay_rest,
} = orderPaySlice.actions;

export const {
  my_order_list_request,
  my_order_list_success,
  my_order_list_failed,
  my_order_list_reset,
} = myOrdersSlice.actions;

export const orderCreateReducer = orderSlice.reducer;
export const orderDetailReducer = orderDetailSlice.reducer;
export const orderPayReducer = orderPaySlice.reducer;
export const myOrdersReducer = myOrdersSlice.reducer;
