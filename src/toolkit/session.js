const AUTH_DATA_KEY = 'AUTH_DATA';
const AUTH_JWT_TOKEN = 'AUTH_JWT_TOKEN';
const AUTH_REFRESH_TOKEN = 'AUTH_REFRESH_TOKEN';
const AUTH_TOKEN_KEY = 'AUTH_TOKEN_KEY';
const AUTH_LOGIN_KEY = 'AUTH_LOGIN_KEY';

export function getLoginKey() {
  return localStorage.getItem(AUTH_LOGIN_KEY);
}

export function saveLoginKey(key) {
  return localStorage.setItem(AUTH_LOGIN_KEY, key);
}

export function getToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function saveToken(token) {
  return localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function getJwtToken() {
  return localStorage.getItem(AUTH_JWT_TOKEN);
}

export function saveJwtToken(token) {
  return localStorage.setItem(AUTH_JWT_TOKEN, token);
}

export function getRefreshToken() {
  return localStorage.getItem(AUTH_REFRESH_TOKEN);
}

export function saveRefreshToken(token) {
  return localStorage.setItem(AUTH_REFRESH_TOKEN, token);
}

export function getAuthData() {
  let data;
  try {
    data = JSON.parse(localStorage.getItem(AUTH_DATA_KEY));
  } catch (e) {
    // do nothing
    data = null;
  }
  return data;
}

export function setAuthData(data) {
  return localStorage.setItem(AUTH_DATA_KEY, JSON.stringify(data));
}
export function updateAuthData(key, value) {
  if (!isLoggedIn()) {
    return false;
  }
  let data = getAuthData();
  if (data) {
    data = { ...data, [key]: value };
    setAuthData(data);
  }
}

export function setLocale(locale) {
  return localStorage.setItem('locale', locale);
}

export function getLocale() {
  return localStorage.getItem('locale') || 'zh_CN';
}

export function clear() {
  localStorage.removeItem(AUTH_DATA_KEY);
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function isLoggedIn() {
  const token = getToken();
  const data = getAuthData();
  return Boolean(token) && Boolean(data);
}

export default {
  clear,
  getAuthData,
  getJwtToken,
  getLocale,
  getLoginKey,
  getRefreshToken,
  getToken,
  isLoggedIn,
  saveJwtToken,
  saveLoginKey,
  saveRefreshToken,
  saveToken,
  setAuthData,
  setLocale,
  updateAuthData
};
