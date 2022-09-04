import { screen, render } from "@testing-library/react";
import AddToCart from "./AddToCart";
import {
  useMockedProduct,
  useMockedCartItems,
  wrapper,
} from "../../Utils/reusableTestingFunctions";
import { SUCCESSFUL } from "../../MockData/HomePage";
import { CART_WITH_TWO_ITEMS } from "../../MockData/AddToCart";
import userEvent from "@testing-library/user-event";

describe("<AddToCart />", () => {
  it("should render the component properly", async () => {
    useMockedProduct.mockReturnValue(SUCCESSFUL);
    useMockedCartItems.mockReturnValue(CART_WITH_TWO_ITEMS);

    render(<AddToCart productId="1" productName="product1" />, { wrapper });
    expect(screen.getByText("Add To Cart")).toBeInTheDocument();
  });

  it("should add items to cart", () => {
    useMockedProduct.mockReturnValue(SUCCESSFUL);
    useMockedCartItems.mockReturnValue(CART_WITH_TWO_ITEMS);

    render(<AddToCart productId="1" productName="product1" />, { wrapper });

    //
    expect(CART_WITH_TWO_ITEMS.getCartItemByProductId).toBeCalled();
    expect(CART_WITH_TWO_ITEMS.getCartItemByProductId).toBeCalledTimes(1);

    const button: HTMLButtonElement = screen.getByText("Add To Cart");

    // initially should render Add To Cart Button
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(CART_WITH_TWO_ITEMS.addCartItem).toBeCalled();
    expect(CART_WITH_TWO_ITEMS.addCartItem).toBeCalledTimes(1);
  });
});
