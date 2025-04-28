import CONFIG from "../config";
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
    message: fetchResponse.message,
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
  console.log(json);

  return {
    ...json,
    message: fetchResponse.message,
  };
}

export async function getAllStories() {
  const fetchResponse = await fetch(ENDPOINTS.STORIES, {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}
