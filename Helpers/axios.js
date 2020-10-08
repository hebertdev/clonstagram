import Axios from "axios";
import { getToken } from "./auth-helpers";

const baseURL = "https://apinstaram.pythonanywhere.com";

let headers = {};

function ObteniendoTOken() {
  if (typeof window !== "undefined") {
    return getToken();
  } else {
    return null;
  }
}

ObteniendoTOken();

let resultTOken = ObteniendoTOken();

if (resultTOken) {
  headers.Authorization = `token ${resultTOken}`;
}

const axiosInstance = Axios.create({
  baseURL: baseURL,
  headers,
});

export default axiosInstance;

export function exportBASEurl() {
  const baseURL = "https://apinstaram.pythonanywhere.com";

  return baseURL;
}
