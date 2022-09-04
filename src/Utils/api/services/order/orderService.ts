import { IOrder } from "../../../../Types/redux/orders";
import Axios from "../AxiosConfig";

const OrderService = {
  sendOrder: async (payload: IOrder) => {
    try {
      const res = await Axios.post("/orders", payload);
      return res;
    } catch (e) {
      return { statusText: "Error" };
    }
  },
};

export const sendOrder = OrderService.sendOrder;

export default OrderService;
