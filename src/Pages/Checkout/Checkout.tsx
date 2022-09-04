import useCartItems from "../../CustomHooks/useCartItems";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import CartItem from "../../Components/CartItem/CartItem";
import CheckoutForm from "../../Components/CheckoutForm/CheckoutForm";

const style = {
  backgroundColor: "#f3f3f3",
  border: "1px solid black",
  width: "fit-content",
  margin: "auto",
  marginBottom: 20,
};

const Checkout = () => {
  const { productsInTheCart } = useCartItems();
  const navigate = useNavigate();

  useEffect(() => {
    if (productsInTheCart.length === 0) {
      navigate("/");
    }
  }, [navigate, productsInTheCart.length]);

  return (
    <section>
      <h1> This is checkout Page </h1>
      <h2> Products to be Checked out </h2>
      <div style={style}>
        <CartItem productName="Name" quantity="Quantity" />
        {productsInTheCart.map(({ productName, quantity, productId }) => (
          <CartItem
            key={productId}
            productName={productName || ""}
            quantity={quantity}
          />
        ))}
      </div>
      <CheckoutForm />
    </section>
  );
};
export default Checkout;
