import { screen, render } from "@testing-library/react";
import CartItem from "./CartItem";

describe("<CartItem />", () => {
  it("should render the pass productName and quantity", () => {
    render(<CartItem productName="product1" quantity={4} />);
    expect(screen.getByText(/product1/i)).toBeInTheDocument();
    expect(screen.getByText(/4/i)).toBeInTheDocument();
  });
});
