import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: "http://120.24.64.5:8088/mall-admin",
  timeout: 5000,
});
// 请求拦截
instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
// 响应拦截
instance.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    return Promise.reject(err);
  }
);
export default instance;
