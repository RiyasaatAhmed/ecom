import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../Home/Home";
import { BrowserRouter as Router } from "react-router-dom";
import {
  useMockedProduct,
  useMockedCartItems,
  wrapper,
} from "../../Utils/reusableTestingFunctions";
import {
  LOADING,
  FAILED,
  SUCCESSFUL,
  IHomePageState,
} from "../../MockData/HomePage";
import { NO_ITEMS } from "../../MockData/AddToCart";

const renderCompoentWithMockedValue = (mockedValue: IHomePageState) => {
  useMockedProduct.mockReturnValue(mockedValue);
  useMockedCartItems.mockReturnValue(NO_ITEMS);

  render(
    <Router>
      <Home />
    </Router>,
    { wrapper }
  );
};

describe("<Home />", () => {
  it("Initially it should show loading...", async () => {
    renderCompoentWithMockedValue(LOADING);

    const loadingComponent = screen.getByText("Loading...");
    expect(loadingComponent).toBeInTheDocument();
  });

  it("should show the products", async () => {
    renderCompoentWithMockedValue(SUCCESSFUL);

    const productList = screen.getAllByRole("article");
    expect(productList).toHaveLength(3);
  });

  it("should show the error state, and user should able to click on the try again button", () => {
    renderCompoentWithMockedValue(FAILED);

    const tryAgainButton: HTMLButtonElement = screen.getByRole("button", {
      name: /try again/i,
    });
    expect(tryAgainButton).toBeInTheDocument();

    userEvent.click(tryAgainButton);
    expect(FAILED.reFetchProductList).toBeCalled();
    expect(FAILED.reFetchProductList).toBeCalledTimes(1);
  });

  it("should have all the links with proper hrefs", () => {
    renderCompoentWithMockedValue(SUCCESSFUL);
    const links = screen.getAllByRole("link", { name: /see more/i });
    expect(links[0]).toHaveAttribute("href", "/product/product-one-url");
    expect(links[1]).toHaveAttribute("href", "/product/product-two-url");
    expect(links[2]).toHaveAttribute("href", "/product/product-three-url");
  });
});
