import {
  user_list_request,
  user_list_success,
  user_list_failed,
  user_delete_request,
  user_delete_success,
  user_delete_failed,
  user_update_request,
  user_update_success,
  user_update_failed,
  product_delete_request,
  product_delete_success,
  product_delete_failed,
  product_create_request,
  product_create_success,
  product_create_failed,
  product_update_request,
  product_update_success,
  product_update_failed,
  get_orders_request,
  get_orders_success,
  get_orders_failed,
  deliver_orders_request,
  deliver_orders_success,
  deliver_orders_failed,
} from "../reducers/adminReducers";

import { listProducts } from "./productAction";

import { user_details_success } from "../reducers/userReducers";

import { singleProductFetchingSuccess } from "../reducers/productReducers";

import { axiosRequest } from "../requestMethods";

import store from "../store";

export const listUsers = async (dispatch) => {
  try {
    dispatch(user_list_request());

    const token = store.getState().userLogin.userInfo.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axiosRequest.get(`/users`, config);

    dispatch(user_list_success(data));
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(user_list_failed(err));
  }
};

export const deleteAUser = async (dispatch, id) => {
  try {
    dispatch(user_delete_request());

    const token = store.getState().userLogin.userInfo.token;

    console.log(token);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axiosRequest.delete(`/users/${id}`, config);

    dispatch(user_delete_success());
    listUsers(dispatch);
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(user_delete_failed(err));
  }
};

export const updateAUser = async (dispatch, id, user) => {
  try {
    dispatch(user_update_request());

    const token = store.getState().userLogin.userInfo.token;

    console.log(token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axiosRequest.put(`/users/${id}`, user, config);

    dispatch(user_update_success());
    dispatch(user_details_success(data));
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(user_update_failed(err));
  }
};

export const deleteAProduct = async (dispatch, id) => {
  try {
    dispatch(product_delete_request());

    const token = store.getState().userLogin.userInfo.token;

    console.log(token);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axiosRequest.delete(`/products/${id}`, config);

    dispatch(product_delete_success());
    listProducts(dispatch);
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(product_delete_failed(err));
  }
};

export const createAProduct = async (dispatch) => {
  try {
    dispatch(product_create_request());

    const token = store.getState().userLogin.userInfo.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axiosRequest.post(`/products`, {}, config);

    dispatch(product_create_success(data));
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(product_create_failed(err));
  }
};

export const updateProduct = async (dispatch, id, product) => {
  try {
    dispatch(product_update_request());
    const token = store.getState().userLogin.userInfo.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axiosRequest.put(`/products/${id}`, product, config);
    dispatch(product_update_success(data));
    dispatch(singleProductFetchingSuccess(data));
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(product_update_failed(err));
  }
};

export const getOrders = async (dispatch) => {
  try {
    dispatch(get_orders_request());
    const token = store.getState().userLogin.userInfo.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axiosRequest.get(`/orders`, config);
    dispatch(get_orders_success(data));
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(get_orders_failed(err));
  }
};

export const deliverOrders = async (dispatch, id) => {
  try {
    dispatch(deliver_orders_request());
    const token = store.getState().userLogin.userInfo.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axiosRequest.put(
      `/orders/${id}/deliver`,
      {},
      config
    );
    dispatch(deliver_orders_success(data));
    getOrders(dispatch);
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(deliver_orders_failed(err));
  }
};
