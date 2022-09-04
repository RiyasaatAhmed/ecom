import useCartItems from "../../CustomHooks/useCartItems";
import { ICartItem } from "../../Types/redux/addToCart";

const Style = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};
const CartListItem = ({ productId, productName, quantity }: ICartItem) => {
  const { removeCartItem } = useCartItems();
  return (
    <div style={Style}>
      <p>
        {productName} --- {quantity}x
      </p>
      <button
        onClick={() => removeCartItem(productId)}
        style={{ width: "fit-content", height: "fit-content" }}
      >
        X
      </button>
    </div>
  );
};

export default CartListItem;
