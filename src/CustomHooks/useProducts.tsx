import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { IProduct } from "../Types/redux/products";
import { LOADING_STATE } from "../Utils/static";
import { setProductList, fetchProducts } from "../redux/slices/productSlice";

type useProductProps = {
  productList?: IProduct[];
};

const useProduct = ({ productList = [] }: useProductProps) => {
  const { productList: ReduxProductList, status } = useAppSelector(
    (state) => state.product
  );
  const dispatch = useAppDispatch();

  const reFetchProductList = () => {
    dispatch(fetchProducts());
  };

  React.useEffect(() => {
    if (ReduxProductList.length === 0) {
      if (productList.length > 0) {
        dispatch(setProductList({ productList, status: LOADING_STATE.IDLE }));
      } else {
        if (status !== LOADING_STATE.FAILED) dispatch(fetchProducts());
      }
    }
  }, [ReduxProductList, productList, dispatch, status]);

  return {
    productList: ReduxProductList,
    status,
    reFetchProductList,
  };
};
export default useProduct;
