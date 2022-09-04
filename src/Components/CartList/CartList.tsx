import { Link } from "react-router-dom";
import ListRenderer from "../../Components/ListRenderer/ListRenderer";
import useCartItems from "../../CustomHooks/useCartItems";
import CartListItem from "../CartListItem/CartListItem";

interface CartListProps {
  toggleHandler: () => void;
}

const CartList = ({ toggleHandler }: CartListProps) => {
  const { productsInTheCart, totalPrice } = useCartItems();

  return (
    <div
      style={{
        width: 300,
        height: 300,
        backgroundColor: "white",
        position: "fixed",
        zIndex: 5,
        top: 35,
        right: 35,
        textAlign: "center",
        padding: "20px 5px 0px 5px",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
    >
      {/* Close Button */}
      <button
        style={{ position: "absolute", top: 5, right: 5 }}
        onClick={toggleHandler}
      >
        X
      </button>

      {/* 
        If there's an item in the cart, 
        it would show number of items and totalprice
      */}
      {productsInTheCart.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <p> {productsInTheCart.length} items in the cart. </p>
          <p>
            <strong> Total Price ${totalPrice.toFixed(2)} </strong>
          </p>
        </div>
      )}

      {productsInTheCart.length === 0 ? (
        // if there's no items in the cart
        <p> You have no items in your shopping cart. </p>
      ) : (
        // CartListItems Component
        <div
          style={{
            backgroundColor: "#f3f3f3",
            height: 180,
            overflowY: "auto",
            border: "1px solid black",
            padding: 10,
          }}
        >
          <ListRenderer
            list={productsInTheCart}
            renderItem={({ productId, productName, quantity }) =>
              productName && (
                <CartListItem
                  productId={productId}
                  productName={productName}
                  quantity={quantity}
                />
              )
            }
          />
        </div>
      )}

      {/* 
        if there's item in the cart
        then there's a link to checkout page
       */}
      {productsInTheCart.length > 0 && (
        <Link
          to="/checkout"
          style={{
            position: "absolute",
            bottom: 20,
            left: 85,
            textAlign: "center",
          }}
          onClick={toggleHandler}
        >
          Proceed to Checkout
        </Link>
      )}
    </div>
  );
};
export default CartList;
