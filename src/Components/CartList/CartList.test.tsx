import { render, screen } from "@testing-library/react";
import { CART_WITH_TWO_ITEMS, NO_ITEMS } from "../../MockData/AddToCart";
import { SUCCESSFUL } from "../../MockData/HomePage";
import { BrowserRouter as Router } from "react-router-dom";
import {
  wrapper,
  useMockedProduct,
  useMockedCartItems,
} from "../../Utils/reusableTestingFunctions";
import CartList from "./CartList";
import userEvent from "@testing-library/user-event";

const mockedToggleHandler = jest.fn();

describe("<CartList />", () => {
  it("Should Render Empty Cartlist Component initially and call toggleHandler when user clicks it", () => {
    useMockedProduct.mockReturnValue(SUCCESSFUL);
    useMockedCartItems.mockReturnValue(NO_ITEMS);

    render(<CartList toggleHandler={mockedToggleHandler} />, { wrapper });

    // No Items are there
    expect(
      screen.getByText(/You have no items in your shopping cart/i)
    ).toBeInTheDocument();

    // Toggle function gets called on button click
    userEvent.click(screen.getByRole("button"));
    expect(mockedToggleHandler).toBeCalled();
    expect(mockedToggleHandler).toBeCalledTimes(1);

    // No CartItems are renders
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  it("Should show items == 2, totalPrice == 45.94 in the carts", () => {
    useMockedProduct.mockReturnValue(SUCCESSFUL);
    useMockedCartItems.mockReturnValue(CART_WITH_TWO_ITEMS);
    render(
      <Router>
        <CartList toggleHandler={mockedToggleHandler} />
      </Router>,
      { wrapper }
    );
    // No items are there is not rendered
    expect(
      screen.queryByText(/You have no items in your shopping cart/i)
    ).not.toBeInTheDocument();

    // 2 cart items are found with appropriate values
    const cartItems = screen.getAllByRole("listitem");
    expect(cartItems.length).toBe(2);
    expect(cartItems[0].textContent).toMatch(/product1 --- 4x/i);
    expect(cartItems[1].textContent).toMatch(/product2 --- 3x/i);

    // 2 items in the cart text found
    expect(screen.getByText(/2 items in the cart./i)).toBeInTheDocument();

    // exact total price found
    expect(screen.getByText(/45.94/i)).toBeInTheDocument();

    // toggle function is called then link is clicked
    const checkoutLink: HTMLLinkElement = screen.getByRole("link", {
      name: /Proceed to Checkout/i,
    });
    expect(checkoutLink).toBeInTheDocument();
    userEvent.click(checkoutLink);
    expect(mockedToggleHandler).toBeCalled();
    expect(mockedToggleHandler).toBeCalledTimes(1);
  });
});
