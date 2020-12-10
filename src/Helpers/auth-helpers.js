const TOKEN = "token";
const USERNAME = "username";

export function setToken(token) {
  localStorage.setItem(TOKEN, token);
}

export function setCurrentUser(user) {
  localStorage.setItem(USERNAME, user);
}

export function getToken() {
  return localStorage.getItem(TOKEN);
}

export function getUsername() {
  return localStorage.getItem(USERNAME);
}

export function deleteToken() {
  localStorage.removeItem(TOKEN);
  localStorage.removeItem(USERNAME);
}
