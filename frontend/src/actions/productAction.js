import {
  productFetchingStart,
  productFetchingSuccess,
  productFetchingFailed,
} from "../reducers/productReducers";

import {
  singleProductFetchingStart,
  singleProductFetchingSuccess,
  singleProductFetchingFailed,
  create_product_review_request,
  create_product_review_success,
  create_product_review_failed,
  top_product_request,
  top_product_success,
  top_product_failed,
} from "../reducers/productReducers";

import { axiosRequest } from "../requestMethods";
import store from "../store";

export const listProducts = async (dispatch, keyword = "", pageNumber = "") => {
  try {
    dispatch(productFetchingStart());

    const res = await axiosRequest.get(
      `/products?keyword=${keyword}&pageNumber=${pageNumber}`
    );
    dispatch(productFetchingSuccess(res.data));
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(productFetchingFailed(err));
  }
};

export const singleProduct = async (dispatch, id) => {
  try {
    dispatch(singleProductFetchingStart());
    const res = await axiosRequest.get(`/products/${id}`);
    dispatch(singleProductFetchingSuccess(res.data));
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(singleProductFetchingFailed(err));
  }
};

export const createProductReview = async (dispatch, id, review) => {
  try {
    dispatch(create_product_review_request());
    const token = store.getState().userLogin.userInfo.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    await axiosRequest.post(`/products/${id}/reviews`, review, config);
    dispatch(create_product_review_success());
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(create_product_review_failed(err));
  }
};

export const listTopProducts = async (dispatch) => {
  try {
    dispatch(top_product_request());

    const res = await axiosRequest.get(`/products/top`);
    dispatch(top_product_success(res.data));
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(top_product_failed(err));
  }
};
