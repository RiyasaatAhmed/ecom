import React from "react";
import useCartItems from "../../CustomHooks/useCartItems";
import { sendOrder } from "../../Utils/api/services/order/orderService";

const Email_Regex =
  /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
const SUCCESSFUL_TEXT = "Order was Created redirecting to home page...";
const FAILURE_TEXT = "Order was not Create, Try Again Later";
const CheckoutForm = () => {
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [isOrderProcessedText, setIsOrderProcessedText] = React.useState("");
  const { productsInTheCart, resetCartItems } = useCartItems();

  const submitHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const checkoutResponse = await sendOrder({
      email,
      products: productsInTheCart,
    });

    setIsOrderProcessedText(
      checkoutResponse.statusText === "Created" ? SUCCESSFUL_TEXT : FAILURE_TEXT
    );
    if (checkoutResponse.statusText === "Created") {
      setEmail("");
      setEmailError("");
      setTimeout(() => {
        setIsOrderProcessedText("");
        resetCartItems();
      }, 3000);
    }
  };
  const emailValidator = (emailValue: string) => {
    setEmail(emailValue);
    setEmailError(
      !emailValue
        ? ""
        : !Email_Regex.test(emailValue)
        ? "input a valid mail"
        : ""
    );
  };
  return (
    <form>
      <label htmlFor="email">Mail</label>
      <input
        id="email"
        type="text"
        value={email}
        name="email"
        onChange={(e) => emailValidator(e.target.value)}
      />
      <p style={{ height: 16, color: "red", margin: 0, marginBottom: 8 }}>
        {emailError}
      </p>
      <button
        disabled={!!emailError.length || !!!email.length}
        type="submit"
        onClick={(e) => submitHandler(e)}
      >
        Checkout
      </button>
      {isOrderProcessedText.length > 0 && (
        <>
          <p>{isOrderProcessedText}</p>
        </>
      )}
    </form>
  );
};

export default CheckoutForm;
