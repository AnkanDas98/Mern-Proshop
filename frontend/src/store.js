import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { productReducer } from "./reducers/productReducers";
import { singleProductReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";

const rootReeducer = combineReducers({
  productList: productReducer,
  singleProduct: singleProductReducer,
  cart: cartReducer,
});

const store = configureStore({
  reducer: rootReeducer,
});

export default store;

// import { createStore, combineReducers, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";

// const reducer = combineReducers({});

// const initialState = {};

// const middleware = [thunk];

// const store = createStore(
//   reducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleware))
// );

// export default store;
