import { BASE_URL } from "../config";
import { getAccessToken } from "../utils/auth";
const ENDPOINTS = {
  REGISTER: `${BASE_URL}/register`,
  LOGIN: `${BASE_URL}/login`,
  STORIES: `${BASE_URL}/stories`,
  SUBSCRIBE: `${BASE_URL}/notifications/subscribe`,
};

export async function getData() {
  const fetchResponse = await fetch(ENDPOINTS.ENDPOINT);
  return await fetchResponse.json();
}

export async function getRegistered({ name, email, password }) {
  const data = JSON.stringify({ name, email, password });

  const fetchResponse = await fetch(ENDPOINTS.REGISTER, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: data,
  });
  const json = await fetchResponse.json();

  console.log(json);
  return {
    ...json,
    error: fetchResponse.error,
  };
}

export async function getLogin({ email, password }) {
  const data = JSON.stringify({ email, password });

  const fetchResponse = await fetch(ENDPOINTS.LOGIN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    data: json.loginResult,
    error: json.error,
  };
}

export async function getAllStories() {
  const accessToken = getAccessToken();

  const fetchResponse = await fetch(`${ENDPOINTS.STORIES}?location=1`, {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const json = await fetchResponse.json();

  const storyList = json.listStory;

  return {
    storyList,
    error: json.error,
    message: json.message,
  };
}

export async function postNewStory({ image, description, lat, lon }) {
  const accessToken = getAccessToken();

  const formData = new FormData();
  formData.append("photo", image);
  formData.set("description", description);
  formData.set("lat", lat);
  formData.set("lon", lon);

  const fetchResponse = await fetch(ENDPOINTS.STORIES, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
    body: formData,
  });
  const json = await fetchResponse.json();

  return {
    error: json.error,
    message: json.message,
  };
}

export async function subscribePushNotification({ endpoint, keys }) {
  const accessToken = getAccessToken();

  const data = JSON.stringify({
    endpoint,
    keys: {
      p256dh: keys.p256dh,
      auth: keys.auth,
    },
  });

  const fetchResponse = await fetch(ENDPOINTS.SUBSCRIBE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: data,
  });

  if (!fetchResponse.ok) {
    throw new Error(`HTTP error! status: ${fetchResponse.status}`);
  }

  return await fetchResponse.json();
}

export async function unsubscribePushNotification({ endpoint }) {
  const accessToken = getAccessToken();

  const fetchResponse = await fetch(ENDPOINTS.SUBSCRIBE, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ endpoint }),
  });
  const json = await fetchResponse.json();

  return {
    error: json.error,
    message: json.message,
  };
}
