import { mocked } from "ts-jest/utils";
import useProduct from "../CustomHooks/useProducts";
import useCartItems from "../CustomHooks/useCartItems";
import { Provider } from "react-redux";
import store from "../redux/store";

export const useMockedProduct = mocked(useProduct);
export const useMockedCartItems = mocked(useCartItems);

export const wrapper = ({ children }: any) => (
  <Provider store={store}>{children}</Provider>
);
