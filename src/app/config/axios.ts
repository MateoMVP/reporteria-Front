import axios from "axios";
import Cookies from "js-cookie";
const AXIOS = axios.create({
  baseURL: "https://6f3906702b06.sn.mynetname.net/redbox/api",
});

AXIOS.interceptors.request.use(
  async (config) => {
    const token = Cookies.get("authToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default AXIOS;
