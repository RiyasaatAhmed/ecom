import useProduct from "../../CustomHooks/useProducts";
import Product from "../../Components/Product/Product";
import ListRenderer from "../../Components/ListRenderer/ListRenderer";
import Search from "../../Components/Search/Search";
import React, { useState } from "react";

const Home = () => {
  const { productList, status, reFetchProductList } = useProduct({});
  const [searchValue, setSearchValue] = useState("");

  const filteredProduct = React.useMemo(() => {
    if (searchValue.length > 0) {
      return productList.filter(
        (product) =>
          product.description
            .slice(0, 30)
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          product.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    } else {
      return productList;
    }
  }, [searchValue, productList]);

  return (
    <div>
      <Search setSearchValue={setSearchValue} />
      <h1> ProductList </h1>
      <ListRenderer
        keyExtractor={({ id }) => id}
        list={filteredProduct}
        status={status}
        reFetch={reFetchProductList}
        renderItem={(product) => <Product product={product} />}
      />
    </div>
  );
};
export default Home;
