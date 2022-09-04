import { IProduct } from "../../Types/redux/products";
import { Link } from "react-router-dom";
import AddToCart from "../AddToCart/AddToCart";

interface ProductProps {
  product: IProduct;
}
const Product = ({
  product: { id, title, image, price, description, url },
}: ProductProps) => {
  return (
    <article key={id} style={{ width: 200, margin: "auto" }}>
      <h1>{title || "productName"}</h1>

      <div
        style={{
          width: 200,
          height: 160,
          margin: "auto",
        }}
      >
        <img
          src={image || "/image.jpg"}
          alt={`${title}-${id}-thubmnail`}
          width="200px"
          height="160px"
        />
      </div>
      <p> {description.slice(0, 30)}... </p>

      <h2>Only at ${price.toFixed(2)}</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link to={`/product/${url}`}> See More </Link>
        <AddToCart productId={id} productName={title} />
      </div>
    </article>
  );
};

export default Product;
