import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";
import {
  IAddToCart,
  ICartItem,
  IRemoveItem,
  IUpdateItem,
} from "../../Types/redux/addToCart";

const initialState: IAddToCart = {
  cartItemList: [],
};

export const addToCartSlice = createSlice({
  name: "addToCart",
  initialState,
  reducers: {
    addItem: (state, { payload }: PayloadAction<ICartItem>) => {
      state.cartItemList.push(payload);
    },
    removeItem: (state, { payload }: PayloadAction<IRemoveItem>) => {
      state.cartItemList = state.cartItemList.filter(
        (item) => item.productId !== payload.productId
      );
    },
    updateCount: (state, { payload }: PayloadAction<IUpdateItem>) => {
      const item = state.cartItemList.find(
        (item) => item.productId === payload.productId
      );

      if (item) {
        item.quantity += payload.value;
        if (item.quantity === 0) {
          state.cartItemList = state.cartItemList.filter(
            (item) => item.productId !== payload.productId
          );
        }
      }
    },
    resetCart: (state) => {
      state.cartItemList = [];
    },
  },
});

// Slice action creators
export const { addItem, removeItem, updateCount, resetCart } =
  addToCartSlice.actions;

export const addToCartState = (state: RootState) => state.addToCart;

export default addToCartSlice.reducer;
