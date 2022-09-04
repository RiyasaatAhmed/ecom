import { render, screen } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";
import { BrowserRouter as Router } from "react-router-dom";
import {
  useMockedProduct,
  useMockedCartItems,
  wrapper,
} from "../../Utils/reusableTestingFunctions";
import { SUCCESSFUL } from "../../MockData/HomePage";
import { CART_WITH_TWO_ITEMS } from "../../MockData/AddToCart";
import userEvent from "@testing-library/user-event";

const LoadCheckoutForm = () => {
  useMockedProduct.mockReturnValue(SUCCESSFUL);
  useMockedCartItems.mockReturnValue(CART_WITH_TWO_ITEMS);
  render(
    <Router>
      <CheckoutForm />
    </Router>,
    { wrapper }
  );
};

describe("<CheckoutForm />", () => {
  beforeEach(() => LoadCheckoutForm());
  it("should have an email input with label Mail", () => {
    expect(screen.getByLabelText("Mail")).toBeInTheDocument();
  });
  it("should allow user to type in the input and show error message", () => {
    const email: HTMLInputElement = screen.getByLabelText("Mail");

    expect(email).toBeInTheDocument();
    expect(screen.queryByText(/input a valid mail/i)).not.toBeInTheDocument();
    userEvent.type(email, "user");
    expect(screen.getByText(/input a valid mail/i)).toBeInTheDocument();
    userEvent.type(email, "@gmail.com");
    expect(email.value).toBe("user@gmail.com");
    expect(screen.queryByText(/input a valid mail/i)).not.toBeInTheDocument();
  });
  it("should show that order was created when they click on submit button", async () => {
    const email: HTMLInputElement = screen.getByLabelText("Mail");
    const submitBtn: HTMLButtonElement = screen.getByRole("button", {
      name: /checkout/i,
    });
    expect(submitBtn.disabled).toBeTruthy();
    userEvent.type(email, "user@gmail.com");
    expect(submitBtn.disabled).toBeFalsy();
    userEvent.click(submitBtn);
    const successMessage = await screen.findByText(
      /Order was Created redirecting to home page.../i
    );
    expect(successMessage).toBeInTheDocument();
  });
});
