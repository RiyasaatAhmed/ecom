import Axios from "../AxiosConfig";

const ProductService = {
  getProductList: async () => {
    try {
      const res = await Axios.get("/items");
      return res.data;
    } catch (e) {
      return "Error";
    }
  },
};

export const getProductList = ProductService.getProductList;

export default ProductService;
