import { useLocation } from "react-router-dom";
import useProduct from "../../CustomHooks/useProducts";
import { LOADING_STATE } from "../../Utils/static";
import ErrorState from "../../Components/ErrorState/ErrorState";
import React from "react";
import AddToCart from "../../Components/AddToCart/AddToCart";
const ProductDescription = () => {
  const location = useLocation();
  const { productList, status, reFetchProductList } = useProduct({});

  // finding the right product
  // this is not approprite approach
  // should make an api call of getProductByUrl
  // But as I don't have backend so using this get around
  const product = React.useMemo(() => {
    return productList.find((product) =>
      location.pathname.includes(product.url)
    );
  }, [productList, location.pathname]);

  // Loading State
  if (status === LOADING_STATE.LOADING) return <h2>Loading...</h2>;

  // Error State
  // Should be reFetchSingleProductByUrl
  // Instead of reFetchProductList
  if (status === LOADING_STATE.FAILED)
    return <ErrorState reFetch={reFetchProductList} />;

  const { description, id, image, price, title } = product || {};
  // Successful state
  return (
    <div>
      <h1> {title} </h1>
      <img
        src={image || "/image.jpg"}
        alt={`${title}-${id}-thubmnail`}
        style={{ maxWidth: "60vw" }}
      />
      <p> {description} </p>
      <h2>Only at ${price}</h2>
      {id && title && <AddToCart productId={id} productName={title} />}
    </div>
  );
};

export default ProductDescription;
