import { ICartItemType } from "../../CustomHooks/useCartItems";

export interface IOrder {
  email: string;
  products: ICartItemType[];
}
