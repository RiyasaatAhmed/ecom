import { ICartItemType } from "../CustomHooks/useCartItems";

export interface ICartListCustomHookState {
  productsInTheCart: ICartItemType[];
  totalPrice: number;
  getCartItemByProductId: (productId: string) => ICartItemType | undefined;
  addCartItem: (productId: string, productName: string) => void;
  removeCartItem: (productId: string) => void;
  increment: (productId: string) => void;
  decrement: (productId: string) => void;
  resetCartItems: () => void;
}

export const MockedCartItems: ICartItemType[] = [
  {
    productId: "1",
    productName: "product1",
    quantity: 4,
  },
  {
    productId: "2",
    productName: "product2",
    quantity: 3,
  },
];

export const CART_WITH_TWO_ITEMS: ICartListCustomHookState = {
  productsInTheCart: MockedCartItems,
  totalPrice: 45.94,
  getCartItemByProductId: jest.fn(),
  addCartItem: jest.fn(),
  removeCartItem: jest.fn(),
  increment: jest.fn(),
  decrement: jest.fn(),
  resetCartItems: jest.fn(),
};
export const NO_ITEMS: ICartListCustomHookState = {
  productsInTheCart: [],
  totalPrice: 0,
  getCartItemByProductId: jest.fn(),
  addCartItem: jest.fn(),
  removeCartItem: jest.fn(),
  increment: jest.fn(),
  decrement: jest.fn(),
  resetCartItems: jest.fn(),
};
