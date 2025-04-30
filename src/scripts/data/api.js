import CONFIG from "../config";
import { getAccessToken } from "../utils/auth";
const ENDPOINTS = {
  // ENDPOINT: `${BASE_URL}/your/endpoint/here`,

  // Authentication
  REGISTER: `${CONFIG.BASE_URL}/register`,
  LOGIN: `${CONFIG.BASE_URL}/login`,
  STORIES: `${CONFIG.BASE_URL}/stories`,
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
    ...json,
    error: fetchResponse.error,
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
    ...json,
    ok: fetchResponse.ok,
  };
}
