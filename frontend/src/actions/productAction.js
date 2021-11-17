import {
  productFetchingStart,
  productFetchingSuccess,
  productFetchingFailed,
} from "../reducers/productReducers";

import {
  singleProductFetchingStart,
  singleProductFetchingSuccess,
  singleProductFetchingFailed,
} from "../reducers/productReducers";

import { publicRequest } from "../requestMethods";

export const listProducts = async (dispatch) => {
  try {
    dispatch(productFetchingStart());

    const res = await publicRequest.get("/products");
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
    const res = await publicRequest.get(`/products/${id}`);
    dispatch(singleProductFetchingSuccess(res.data));
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(singleProductFetchingFailed(err));
  }
};