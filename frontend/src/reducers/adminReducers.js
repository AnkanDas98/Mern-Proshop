import { createSlice } from "@reduxjs/toolkit";

const usersListSlice = createSlice({
  name: "userslist",
  initialState: {
    users: [],
    loading: false,
    success: "",
    error: "",
  },

  reducers: {
    user_list_request: (state) => {
      state.loading = true;
    },
    user_list_success: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    user_list_failed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    user_list_rest: (state) => {
      state.loading = false;
      state.users = [];
    },
  },
});

const deleteUserSlice = createSlice({
  name: "userDelete",
  initialState: {},

  reducers: {
    user_delete_request: (state) => {
      state.loading = true;
    },
    user_delete_success: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    user_delete_failed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const updateUserSlice = createSlice({
  name: "userUpdate",
  initialState: {
    user: {},
  },

  reducers: {
    user_update_request: (state) => {
      state.loading = true;
    },
    user_update_success: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    user_update_failed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    user_update_rest: (state) => {
      state.loading = false;
      state.success = false;
      state.user = {};
    },
  },
});

const deleteProductSlice = createSlice({
  name: "deleteProduct",
  initialState: {},

  reducers: {
    product_delete_request: (state) => {
      state.loading = true;
    },
    product_delete_success: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    product_delete_failed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const createProductSlice = createSlice({
  name: "createProduct",
  initialState: {
    product: {},
  },

  reducers: {
    product_create_request: (state) => {
      state.loading = true;
    },
    product_create_success: (state, action) => {
      state.loading = false;
      state.success = true;
      state.product = action.payload;
    },
    product_create_failed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    product_create_reset: (state) => {
      state.loading = false;
      state.product = {};
      state.success = false;
    },
  },
});

const updateProductSlice = createSlice({
  name: "userUpdate",
  initialState: {
    product: {},
    error: "",
    loading: false,
    success: false,
  },

  reducers: {
    product_update_request: (state) => {
      state.loading = true;
    },
    product_update_success: (state, action) => {
      state.loading = false;
      state.success = true;
      state.product = action.payload;
    },
    product_update_failed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    product_update_reset: (state) => {
      state.loading = false;
      state.product = {};
      state.success = false;
    },
  },
});

const getOrdersSlice = createSlice({
  name: "getOrders",
  initialState: {
    orders: [],
  },

  reducers: {
    get_orders_request: (state) => {
      state.loading = true;
    },
    get_orders_success: (state, action) => {
      state.loading = false;
      state.success = true;
      state.orders = action.payload;
    },
    get_orders_failed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    get_orders_reset: (state) => {
      state.loading = false;
      state.orders = [];
      state.success = false;
    },
  },
});

const deliverOrdersSlice = createSlice({
  name: "deliverOrders",
  initialState: {
    order: {},
  },

  reducers: {
    deliver_orders_request: (state) => {
      state.loading = true;
    },
    deliver_orders_success: (state, action) => {
      state.loading = false;
      state.success = true;
      state.order = action.payload;
    },
    deliver_orders_failed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  user_list_request,
  user_list_success,
  user_list_failed,
  user_list_rest,
} = usersListSlice.actions;

export const { user_delete_request, user_delete_success, user_delete_failed } =
  deleteUserSlice.actions;

export const {
  user_update_request,
  user_update_success,
  user_update_failed,
  user_update_rest,
} = updateUserSlice.actions;

export const {
  product_delete_request,
  product_delete_success,
  product_delete_failed,
} = deleteProductSlice.actions;

export const {
  product_create_request,
  product_create_success,
  product_create_failed,
  product_create_reset,
} = createProductSlice.actions;

export const {
  product_update_request,
  product_update_success,
  product_update_failed,
  product_update_reset,
} = updateProductSlice.actions;

export const {
  get_orders_request,
  get_orders_success,
  get_orders_failed,
  get_orders_reset,
} = getOrdersSlice.actions;

export const {
  deliver_orders_request,
  deliver_orders_success,
  deliver_orders_failed,
} = deliverOrdersSlice.actions;

export const usersListReducer = usersListSlice.reducer;
export const deleteUserReducer = deleteUserSlice.reducer;
export const userUpdateReducer = updateUserSlice.reducer;
export const deleteProductReducer = deleteProductSlice.reducer;
export const createProductReducer = createProductSlice.reducer;
export const updateProductReducer = updateProductSlice.reducer;
export const getOrdersReducer = getOrdersSlice.reducer;
export const deliverOrdersReducer = deliverOrdersSlice.reducer;
