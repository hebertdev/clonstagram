import Axios from "axios";
import Cookie from "js-cookie";

const TOKEN_KEY = "token";
const USERNAME = "usuario";
const TOKEN_KEY_COOKIE = "token_cookie";

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function setTokenCookie(token) {
  Cookie.set(TOKEN_KEY_COOKIE, token, { expires: 7 });
}

export function getTokenCookie() {
  let cookiesxd = Cookie.get(TOKEN_KEY_COOKIE);
  console.log("holahola", cookiesxd);
  return Cookie.get(TOKEN_KEY_COOKIE);
}

import cookie from "cookie";

export function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}

export function setUserNow(user) {
  localStorage.setItem(USERNAME, user);
}

export function GetUsername() {
  return localStorage.getItem(USERNAME);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function deleteToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USERNAME);
}

export function initAxiosInterceptors() {
  Axios.interceptors.request.use(function (config) {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `access_token ${token}`;
    }

    return config;
  });

  Axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 401) {
        deleteToken();
        window.location = "/login";
      } else {
        return Promise.reject(error);
      }
    }
  );
}
