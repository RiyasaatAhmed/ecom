import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";
import { LOADING_STATE } from "../../Utils/static";
import { getProductList } from "../../Utils/api/services/product/productService";
import { IProductState } from "../../Types/redux/products";

const initialState: IProductState = {
  productList: [],
  status: LOADING_STATE.IDLE,
};

const ERROR_STATE = {
  response: [],
  status: LOADING_STATE.FAILED,
};

export const fetchProducts = createAsyncThunk("page/getProducts", async () => {
  try {
    const response = await getProductList();

    if (response === "Error") {
      return ERROR_STATE;
    }

    return {
      response,
      status: LOADING_STATE.IDLE,
    };
  } catch (e) {
    return ERROR_STATE;
  }
});

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductList: (state, { payload }: PayloadAction<IProductState>) => {
      state.productList = payload.productList;
      state.status = payload.status;
    },
    resetProductList: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = LOADING_STATE.LOADING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = action.payload.status;
        state.productList = action.payload.response;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = LOADING_STATE.FAILED;
      });
  },
});

// Slice action creators
export const { resetProductList, setProductList } = productSlice.actions;

export const productState = (state: RootState) => state.product;

export default productSlice.reducer;
