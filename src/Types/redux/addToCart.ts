export interface IAddToCart {
  cartItemList: ICartItem[];
}

export interface ICartItem {
  productId: string;
  quantity: number;
  productName: string;
}

export interface IRemoveItem {
  productId: string;
}
export interface IUpdateItem {
  productId: string;
  value: number;
}
