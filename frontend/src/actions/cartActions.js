import {
  cart_add_item,
  cart_remove_item,
  cart_save_shipping_address,
  cart_save_payment_method,
} from "../reducers/cartReducers";

import { axiosRequest } from "../requestMethods";

import store from "../store";

export const addToCart = async (dispatch, id, qty) => {
  const { data } = await axiosRequest.get(`/products/${id}`);

  dispatch(
    cart_add_item({
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    })
  );
  localStorage.setItem(
    "cartItems",
    JSON.stringify(store.getState().cart.cartItems)
  );
};

export const removeFromCart = (dispatch, id) => {
  dispatch(cart_remove_item(id));
  localStorage.setItem(
    "cartItems",
    JSON.stringify(store.getState().cart.cartItems)
  );
};

export const saveShippingAddress = (dispatch, data) => {
  dispatch(cart_save_shipping_address(data));

  localStorage.setItem("shipping", JSON.stringify(data));
};

export const savePaymentMethod = (dispatch, data) => {
  dispatch(cart_save_payment_method(data));

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
