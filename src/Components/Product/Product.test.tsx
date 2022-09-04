import { render, screen } from "@testing-library/react";
import Product from "./Product";
import { ProductList } from "../../MockData/Product";
import { BrowserRouter as Router } from "react-router-dom";
import {
  useMockedProduct,
  useMockedCartItems,
  wrapper,
} from "../../Utils/reusableTestingFunctions";
import { SUCCESSFUL } from "../../MockData/HomePage";
import { NO_ITEMS } from "../../MockData/AddToCart";
import { IProduct } from "../../Types/redux/products";

const falsyProduct = {
  id: "2",
  title: "",
  description:
    "We use proprietary AI to analyze the competition for your topic, and to help you create optimized content faster with state of the art AI generation.",
  price: 1,
  url: "product-two-url",
  image: "",
};
const displayProductComponent = (product: IProduct) => {
  useMockedProduct.mockReturnValue(SUCCESSFUL);
  useMockedCartItems.mockReturnValue(NO_ITEMS);
  render(
    <Router>
      <Product product={product} key={0} />
    </Router>,
    { wrapper }
  );
};

describe("<Product />", () => {
  it("should Render the Product component correctly", () => {
    displayProductComponent(ProductList[0]);
    expect(screen.getByText(ProductList[0].title)).toBeInTheDocument();
    expect(screen.getByText(ProductList[0].title).textContent).toBe(
      ProductList[0].title
    );
  });

  it("should show the default values when props are falsy", () => {
    displayProductComponent(falsyProduct);

    expect(screen.getByText(/productName/i)).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "/image.jpg");
  });
});
