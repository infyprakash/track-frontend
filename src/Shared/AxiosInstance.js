import axios from "axios";
const axiosObj = axios.create({
  baseURL: " http://192.168.101.4:8080/api",
});
export default axiosObj;

// dotnet run --urls http://192.168.101.5:8080
