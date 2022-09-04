interface CartItemProps {
  productName: string;
  quantity: string | number;
}
const style = {
  width: 200,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 20,
  border: "1px solid black",
  margin: "aut0",
};
const CartItem = ({ productName, quantity }: CartItemProps) => {
  return (
    <div style={style}>
      <p>{productName}</p>
      <p>{quantity}</p>
    </div>
  );
};
export default CartItem;
