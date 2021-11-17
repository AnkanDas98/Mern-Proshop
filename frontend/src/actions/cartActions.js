import { cart_add_item, cart_remove_item } from "../reducers/cartReducers";

import { publicRequest } from "../requestMethods";

import store from "../store";

export const addToCart = async (dispatch, id, qty) => {
  const { data } = await publicRequest.get(`/products/${id}`);

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
