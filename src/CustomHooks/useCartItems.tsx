import React, { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  addItem,
  removeItem,
  updateCount,
  resetCart,
} from "../redux/slices/addToCartSlice";
import useProduct from "./useProducts";

export interface ICartItemType {
  productId: string;
  productName: string | undefined;
  quantity: number;
}

const useCartItems = () => {
  const { cartItemList } = useAppSelector((state) => state.addToCart);
  const totalPrice = useRef(0);
  const { productList } = useProduct({});
  const dispatch = useAppDispatch();

  const productsInTheCart: ICartItemType[] = React.useMemo(() => {
    totalPrice.current = 0;
    return cartItemList.map(({ productId, quantity }) => {
      const productInCart = productList.find(
        (product) => product.id === productId
      );

      if (productInCart) totalPrice.current += productInCart.price * quantity;

      return {
        productId,
        productName: productInCart && productInCart.title,
        quantity,
      };
    });
  }, [productList, cartItemList]);

  const increment = React.useCallback(
    (productId: string) => {
      dispatch(updateCount({ productId, value: 1 }));
    },
    [dispatch]
  );

  const decrement = React.useCallback(
    (productId: string) => {
      dispatch(updateCount({ productId, value: -1 }));
    },
    [dispatch]
  );

  const addCartItem = React.useCallback(
    (productId: string, productName: string) => {
      dispatch(addItem({ productId, quantity: 1, productName }));
    },
    [dispatch]
  );

  const removeCartItem = React.useCallback(
    (productId: string) => {
      dispatch(removeItem({ productId }));
    },
    [dispatch]
  );

  const resetCartItems = React.useCallback(() => {
    dispatch(resetCart());
  }, [dispatch]);

  const getCartItemByProductId = React.useCallback(
    (productId: string) => {
      return productsInTheCart.find((item) => item.productId === productId);
    },
    [productsInTheCart]
  );

  return {
    productsInTheCart,
    totalPrice: totalPrice.current,
    getCartItemByProductId,
    addCartItem,
    removeCartItem,
    increment,
    decrement,
    resetCartItems,
  };
};

export default useCartItems;
