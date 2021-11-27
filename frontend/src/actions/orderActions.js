import {
  order_create_request,
  order_create_success,
  order_create_failed,
  order_details_request,
  order_details_success,
  order_details_failed,
  order_pay_request,
  order_pay_success,
  order_pay_failed,
  //order_pay_rest,
  my_order_list_request,
  my_order_list_success,
  my_order_list_failed,
} from "../reducers/orderReducers";

import { axiosRequest } from "../requestMethods";

import store from "../store";

export const createOrder = async (dispatch, order) => {
  try {
    dispatch(order_create_request());

    const token = store.getState().userLogin.userInfo.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axiosRequest.post(`/orders`, order, config);

    dispatch(order_create_success(data));
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(order_create_failed(err));
  }
};

export const getOrderDetail = async (dispatch, id) => {
  try {
    dispatch(order_details_request());

    const token = store.getState().userLogin.userInfo.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axiosRequest.get(`/orders/${id}`, config);

    dispatch(order_details_success(data));
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(order_details_failed(err));
  }
};

export const payOrder = async (dispatch, orderID, paymentResult) => {
  try {
    dispatch(order_pay_request());

    const token = store.getState().userLogin.userInfo.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axiosRequest.put(
      `/orders/${orderID}/pay`,
      paymentResult,
      config
    );

    dispatch(order_pay_success(data));
    getOrderDetail(dispatch, orderID);
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(order_pay_failed(err));
  }
};

export const myListOrders = async (dispatch) => {
  try {
    dispatch(my_order_list_request());

    const token = store.getState().userLogin.userInfo.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axiosRequest.get(`/orders/myorders`, config);

    dispatch(my_order_list_success(data));
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(my_order_list_failed(err));
  }
};
