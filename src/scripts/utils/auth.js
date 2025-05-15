import { getActiveRoute } from "../routes/url-parser";
import { ACCESS_TOKEN_KEY, USER_ID, USER_NAME } from "../config";

export function getAccessToken() {
  try {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (accessToken === "null" || accessToken === "undefined") {
      return null;
    }

    return accessToken;
  } catch (error) {
    console.error("getAccessToken: error:", error);
    return null;
  }
}

export function putAccessTokenAndUserData(data) {
  try {
    localStorage.setItem(USER_ID, data.userId);
    localStorage.setItem(USER_NAME, data.name);
    localStorage.setItem(ACCESS_TOKEN_KEY, data.token);
    return true;
  } catch (error) {
    console.error("Put User Data error:", error);
    return false;
  }
}

export function removeAccessTokenAndUserData() {
  try {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(USER_ID);
    localStorage.removeItem(USER_NAME);
    return true;
  } catch (error) {
    console.error("getLogout: error:", error);
    return false;
  }
}

const unauthenticatedRoutesOnly = ["/login", "/register"];

export function checkUnauthenticatedRouteOnly(page) {
  const url = getActiveRoute();
  const isLogin = !!getAccessToken();

  if (unauthenticatedRoutesOnly.includes(url) && isLogin) {
    location.hash = "/";
    return null;
  }

  return page;
}

export function checkAuthenticatedRoute(page) {
  const isLogin = !!getAccessToken();

  if (!isLogin) {
    location.hash = "/login";
    return null;
  }

  return page;
}

export function getUserData() {
  try {
    const userId = localStorage.getItem(USER_ID);
    const userName = localStorage.getItem(USER_NAME);

    if (userId === "null" || userId === "undefined") {
      return null;
    }

    return { name: userName, id: userId };
  } catch (error) {
    console.error("Get user data error:", error);
    return null;
  }
}

export function getLogout() {
  removeAccessTokenAndUserData();
}
