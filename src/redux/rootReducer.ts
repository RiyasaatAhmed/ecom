import { combineReducers } from "@reduxjs/toolkit";

// Reducers
import productSlice from "./slices/productSlice";
import addToCartSlice from "./slices/addToCartSlice";

const rootReducer = combineReducers({
  product: productSlice,
  addToCart: addToCartSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
