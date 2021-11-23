import { createSlice } from "@reduxjs/toolkit";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const userLoginSlice = createSlice({
  name: "userLogin",
  initialState: {
    userInfo: userInfoFromStorage,
    loading: false,
    error: "",
  },

  reducers: {
    user_login_request: (state) => {
      state.loading = true;
    },
    user_login_success: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    user_login_failed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    user_logout: (state, action) => {
      state.userInfo = null;
    },
  },
});

const userRegisterSlice = createSlice({
  name: "userRegister",
  initialState: {
    userInfo: userInfoFromStorage,
    loading: false,
    error: "",
  },

  reducers: {
    user_register_request: (state) => {
      state.loading = true;
    },
    user_register_success: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    user_register_failed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const userDetailSlice = createSlice({
  name: "userProfile",
  initialState: {
    user: {},
    loading: false,
    error: "",
  },

  reducers: {
    user_details_request: (state) => {
      state.loading = true;
    },
    user_details_success: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    user_details_failed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    user_details_reset: (state) => {
      state.user = {};
    },
  },
});

const userUpdateProfileSlice = createSlice({
  name: "userUpdateProfile",
  initialState: {
    userInfo: {},
    loading: false,
    success: "",
    error: "",
  },

  reducers: {
    user_profile_update_request: (state) => {
      state.loading = true;
    },
    user_profile_update_success: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.success = "Profile Successfully Updated!";
    },
    user_profile_update_failed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    user_profile_update_reset: (state) => {
      state.userInfo = {};
      state.success = "";
    },
  },
});

export const {
  user_login_request,
  user_login_success,
  user_login_failed,
  user_logout,
} = userLoginSlice.actions;

export const {
  user_register_success,
  user_register_request,
  user_register_failed,
} = userRegisterSlice.actions;

export const {
  user_details_request,
  user_details_success,
  user_details_failed,
  user_details_reset,
} = userDetailSlice.actions;

export const {
  user_profile_update_request,
  user_profile_update_success,
  user_profile_update_failed,
  user_profile_update_reset,
} = userUpdateProfileSlice.actions;

export const userLoginReducer = userLoginSlice.reducer;
export const userRegisterReducer = userRegisterSlice.reducer;
export const userDetailReducer = userDetailSlice.reducer;
export const userProfileUpdateReducer = userUpdateProfileSlice.reducer;
