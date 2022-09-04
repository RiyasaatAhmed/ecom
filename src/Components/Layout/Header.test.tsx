import { screen, render } from "@testing-library/react";
import Header from "./Header";
import {
  wrapper,
  useMockedProduct,
  useMockedCartItems,
} from "../../Utils/reusableTestingFunctions";
import userEvent from "@testing-library/user-event";
import { SUCCESSFUL } from "../../MockData/HomePage";
import { BrowserRouter as Router } from "react-router-dom";
import { CART_WITH_TWO_ITEMS, NO_ITEMS } from "../../MockData/AddToCart";

const displayHeaderComponent = () => {
  useMockedProduct.mockReturnValue(SUCCESSFUL);
  useMockedCartItems.mockReturnValue(CART_WITH_TWO_ITEMS);

  render(
    <Router>
      <Header />
    </Router>,
    { wrapper }
  );
};

describe("<Header />", () => {
  beforeEach(() => displayHeaderComponent());
  it("should render the Cart Icon inside Header Component Properly", () => {
    expect(screen.getByAltText("shopping-cart-icon")).toBeInTheDocument();
  });

  it("should toggle CartList Component when user clicks on CartIcon", () => {
    useMockedCartItems.mockReturnValue(NO_ITEMS);

    const shoppingCart = screen.getByAltText("shopping-cart-icon");
    userEvent.click(shoppingCart);
    const closeButton: HTMLButtonElement = screen.getByRole("button", {
      name: /x/i,
    });
    expect(closeButton).toBeInTheDocument();
    userEvent.click(shoppingCart);
    expect(closeButton).not.toBeInTheDocument();
  });

  it("should show 2 items in the cart", () => {
    expect(screen.getByText(/2/i)).toBeInTheDocument();
  });
});
