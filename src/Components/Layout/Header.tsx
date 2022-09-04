import useCartItems from "../../CustomHooks/useCartItems";
import useToggle from "../../CustomHooks/useToggle";
import CartList from "../CartList/CartList";

const Header = () => {
  const { productsInTheCart } = useCartItems();

  const { toggle, toggleHandler } = useToggle();
  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 10,
          right: 20,
          display: "flex",
          cursor: "pointer",
        }}
        onClick={toggleHandler}
      >
        <img src="/cart.png" alt="shopping-cart-icon" width={25} height={25} />
        {productsInTheCart.length > 0 && (
          <p
            style={{
              width: 10,
              height: "fit-content",
              position: "absolute",
              top: -14,
              right: -10,
            }}
          >
            {productsInTheCart.length}
          </p>
        )}
      </header>
      {toggle && <CartList toggleHandler={toggleHandler} />}
    </>
  );
};

export default Header;
