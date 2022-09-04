import { renderHook } from "@testing-library/react";
import useProduct from "./useProducts";
import { ProductList } from "../MockData/Product";
import { LOADING_STATE } from "../Utils/static";
import { wrapper, useMockedProduct } from "../Utils/reusableTestingFunctions";
import { FAILED, LOADING, SUCCESSFUL } from "../MockData/HomePage";
import React from "react";

jest.spyOn(React, "useEffect");

describe("useFetchPosts()", () => {
  it("should fetch the 3 post data successfully", async () => {
    useMockedProduct.mockReturnValue(SUCCESSFUL);
    const { result } = renderHook(() => useProduct({}), { wrapper });
    expect(result.current.productList.length).toBe(3);
    expect(result.current.productList).toStrictEqual(ProductList);
    expect(result.current.status).toBe(LOADING_STATE.IDLE);
  });

  it("should show error state if post is not fetched", () => {
    useMockedProduct.mockReturnValue(FAILED);
    const { result } = renderHook(() => useProduct({}), { wrapper });
    expect(result.current.productList.length).toBe(0);
    expect(result.current.productList).toStrictEqual([]);
    expect(result.current.status).toBe(LOADING_STATE.FAILED);
  });

  it("should show loading state while the data is fetched", () => {
    useMockedProduct.mockReturnValue(LOADING);
    const { result } = renderHook(() => useProduct({}), { wrapper });
    expect(result.current.productList.length).toBe(0);
    expect(result.current.productList).toStrictEqual([]);
    expect(result.current.status).toBe(LOADING_STATE.LOADING);
  });
});
