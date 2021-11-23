import {
  user_login_success,
  user_login_request,
  user_login_failed,
  user_logout,
  user_register_request,
  user_register_success,
  user_register_failed,
  user_details_request,
  user_details_success,
  user_details_failed,
  user_details_reset,
  user_profile_update_request,
  user_profile_update_success,
  user_profile_update_failed,
  user_profile_update_reset,
} from "../reducers/userReducers";
import {
  my_order_list_reset,
  order_details_reset,
} from "../reducers/orderReducers";
import { axiosRequest } from "../requestMethods";

import store from "../store";

export const login = async (dispatch, email, password) => {
  try {
    dispatch(user_login_request());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosRequest.post(
      "/users/login",
      { email, password },
      config
    );

    dispatch(user_login_success(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(user_login_failed(err));
  }
};

export const logout = async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch(user_logout());
  dispatch(user_details_reset());
  dispatch(my_order_list_reset());
  //dispatch(order_details_reset());
};

export const register = async (dispatch, name, email, password) => {
  try {
    dispatch(user_register_request());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosRequest.post(
      "/users/register",
      { name, email, password },
      config
    );

    dispatch(user_register_success(data));

    dispatch(user_login_success(data));

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(user_register_failed(err));
  }
};

export const getUserProfile = async (dispatch, id) => {
  try {
    dispatch(user_details_request());

    const token = store.getState().userLogin.userInfo.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axiosRequest.get(`/users/${id}`, config);

    dispatch(user_details_success(data));
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(user_details_failed(err));
  }
};

export const updateUserProfile = async (dispatch, user) => {
  try {
    dispatch(user_profile_update_request());

    const token = store.getState().userLogin.userInfo.token;

    console.log(token);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axiosRequest.put(`/users/profile`, user, config);

    dispatch(user_profile_update_success(data));
    dispatch(user_details_success(data));

    dispatch(user_login_success(data));

    setTimeout(() => {
      dispatch(user_profile_update_reset());
    }, 3000);

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(user_profile_update_failed(err));
  }
};
