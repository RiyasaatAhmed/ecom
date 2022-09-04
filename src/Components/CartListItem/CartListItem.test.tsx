import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CART_WITH_TWO_ITEMS } from "../../MockData/AddToCart";

import { useMockedCartItems } from "../../Utils/reusableTestingFunctions";
import CartListItem from "./CartListItem";

describe("<CartListItem />", () => {
  it("should render CartListItem component with correct props", () => {
    useMockedCartItems.mockReturnValue(CART_WITH_TWO_ITEMS);
    render(<CartListItem productId="1" productName="product1" quantity={4} />);
    expect(screen.getByText(/product1 --- 4x/i)).toBeInTheDocument();
  });
  it("should call removeCartItem function with proper parameter when user click on the remove button", () => {
    useMockedCartItems.mockReturnValue(CART_WITH_TWO_ITEMS);
    render(<CartListItem productId="1" productName="product1" quantity={4} />);
    const removeButton: HTMLButtonElement = screen.getByRole("button", {
      name: "X",
    });
    userEvent.click(removeButton);
    expect(CART_WITH_TWO_ITEMS.removeCartItem).toBeCalled();
    expect(CART_WITH_TWO_ITEMS.removeCartItem).toBeCalledTimes(1);
    expect(CART_WITH_TWO_ITEMS.removeCartItem).toBeCalledWith("1");
  });
});
