import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ListRenderer from "./ListRenderer";
import Product from "../Product/Product";
import { LOADING_STATE } from "../../Utils/static";
import { ProductList } from "../../MockData/Product";
import { BrowserRouter as Router } from "react-router-dom";
import {
  useMockedProduct,
  useMockedCartItems,
  wrapper,
} from "../../Utils/reusableTestingFunctions";
import {
  FAILED,
  IHomePageState,
  SUCCESSFUL,
  SUCCESSFUL_BUT_NO_PRODUCTS,
} from "../../MockData/HomePage";
import { ICartListCustomHookState, NO_ITEMS } from "../../MockData/AddToCart";
import { IProduct } from "../../Types/redux/products";

const reFetcher = jest.fn().mockReturnValue(ProductList);

const displayListRenderer = (
  list: IProduct[],
  status: string,
  MOCK_PRODUCT?: IHomePageState,
  MOCK_CART_ITEM?: ICartListCustomHookState
) => {
  if (MOCK_PRODUCT) useMockedProduct.mockReturnValue(MOCK_PRODUCT);
  if (MOCK_CART_ITEM) useMockedCartItems.mockReturnValue(MOCK_CART_ITEM);
  render(
    <Router>
      <ListRenderer
        list={list}
        status={status}
        reFetch={reFetcher}
        renderItem={(product) => <Product product={product} />}
      />
    </Router>,
    { wrapper }
  );
};

describe("<ListRenderer />", () => {
  it("should render loading initially", () => {
    displayListRenderer([], LOADING_STATE.LOADING);
    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByRole("heading").textContent).toBe("Loading...");
  });

  it("should render the productList", () => {
    displayListRenderer(ProductList, LOADING_STATE.IDLE, SUCCESSFUL, NO_ITEMS);

    expect(screen.getAllByRole("article").length).toBe(3);
    expect(screen.getAllByRole("heading")[0].textContent).toBe("product1");
    expect(screen.getAllByRole("heading")[2].textContent).toBe("product2");
    expect(screen.getAllByRole("heading")[4].textContent).toBe("product3");
  });

  it("should render the error button with error text", async () => {
    displayListRenderer([], LOADING_STATE.FAILED, FAILED);

    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(
      screen.getByText(
        /SomeThing Went Wrong Please, start the JSON server and/i
      )
    ).toBeInTheDocument();

    const buttonElement = screen.getByRole("button", { name: "Try Again" });
    expect(buttonElement).toBeInTheDocument();
    userEvent.click(buttonElement);
    expect(reFetcher).toBeCalled();
    expect(reFetcher).toBeCalledTimes(1);
    expect(reFetcher.mock.calls.length).toBe(1);
  });

  it("should display now products available when emptylist is passed", () => {
    displayListRenderer([], LOADING_STATE.IDLE, SUCCESSFUL_BUT_NO_PRODUCTS);
    expect(screen.getByText(/No Product Available/i)).toBeInTheDocument();
  });
});
