import useCartItems from "../../CustomHooks/useCartItems";

interface AddToCartProps {
  productId: string;
  productName: string;
}

const AddToCart = ({ productId, productName }: AddToCartProps) => {
  const { addCartItem, increment, decrement, getCartItemByProductId } =
    useCartItems();
  const item = getCartItemByProductId(productId);

  return (
    <>
      {item?.quantity ? (
        <div>
          <button onClick={() => decrement(productId)}>-</button>
          {` ${item.quantity} `}
          <button onClick={() => increment(productId)}>+</button>
        </div>
      ) : (
        <button onClick={() => addCartItem(productId, productName)}>
          Add To Cart
        </button>
      )}
    </>
  );
};
export default AddToCart;
