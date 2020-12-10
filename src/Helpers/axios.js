import Axios from "axios";
import { deleteToken } from "./auth-helpers";

const baseURL = "https://apinstaram.pythonanywhere.com";
let headers = {};

if (localStorage.token) {
  headers.Authorization = `token ${localStorage.token}`;
}

const axiosInstance = Axios.create({
  baseURL: baseURL,
  headers,
});

export default axiosInstance;

export function axiosInterceptors() {
  axiosInstance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 401) {
        deleteToken();
        window.location = "/accounts/login";
      } else {
        return Promise.reject(error);
      }
    }
  );
}

export function url() {
  return baseURL;
}
