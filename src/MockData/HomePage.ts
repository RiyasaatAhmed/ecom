import { IProduct } from "../Types/redux/products";
import { LOADING_STATE } from "../Utils/static";
import { ProductList } from "./Product";

export interface IHomePageState {
  productList: IProduct[];
  status: string;
  reFetchProductList: () => {};
}
export const LOADING: IHomePageState = {
  productList: [],
  status: LOADING_STATE.LOADING,
  reFetchProductList: jest.fn(),
};

export const SUCCESSFUL: IHomePageState = {
  productList: ProductList,
  status: LOADING_STATE.IDLE,
  reFetchProductList: jest.fn(),
};
export const SUCCESSFUL_BUT_NO_PRODUCTS: IHomePageState = {
  productList: [],
  status: LOADING_STATE.IDLE,
  reFetchProductList: jest.fn(),
};

export const FAILED: IHomePageState = {
  productList: [],
  status: LOADING_STATE.FAILED,
  reFetchProductList: jest.fn(),
};
