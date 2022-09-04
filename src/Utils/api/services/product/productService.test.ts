import ProductService from "./productService";

const MockedData = [1, 2, 3];

jest.spyOn(ProductService, "getProductList");

jest.mock("./productService", () => ({
  getProductList: jest.fn(() => {
    return Promise.resolve(MockedData);
  }),
}));

describe("ProductService", () => {
  it("should call the getProductList function once", async () => {
    await ProductService.getProductList();
    // console.log(res);
    expect(ProductService.getProductList).toHaveBeenCalled();
    expect(ProductService.getProductList).toHaveBeenCalledTimes(1);
    // expect(res).toStrictEqual([1, 2, 3]);
  });
});
