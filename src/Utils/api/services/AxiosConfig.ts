import axios, { AxiosInstance } from "axios";

const BASE_URL = `http://localhost:3500/`;
const axiosParams = { baseURL: BASE_URL };

const Axios: AxiosInstance = axios.create(axiosParams);

export default Axios;
