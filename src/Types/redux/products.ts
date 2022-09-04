export interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  url: string;
  image: string;
}

export interface IProductState {
  productList: IProduct[];
  status: string;
}
