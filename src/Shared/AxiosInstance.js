import axios from "axios";
const axiosObj = axios.create({
  baseURL: "https://localhost:7187/api",
});
export default axiosObj;
