import { getConfig } from "../config/site.config";

export async function fetchData(endpoint) {
  const SITE_CONFIG = getConfig();
  try {
    const headers = createHeaders();
    const response = await fetch(`${SITE_CONFIG.apiUrl}/${endpoint}`, {
      headers,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred while making the API request.");
  }
}

export async function postData(endpoint, body) {
  return makeRequest("POST", endpoint, body);
}

export async function updateData(endpoint, body) {
  return makeRequest("PUT", endpoint, body);
}

export async function deleteData(endpoint, body) {
  return makeRequest("DELETE", endpoint, body);
}

function createHeaders() {
  const currentLang = localStorage.getItem("lang");
  const headers = {
    "Content-Type": "application/json",
    "Accept-Language": currentLang ? currentLang : "en",
  };

  const userData = JSON.parse(localStorage.getItem("loginInfo"));
  if (userData) {
    headers["Authorization"] = `Bearer ${userData.token}`;
  }

  return headers;
}

export async function makeRequest(method, endpoint, body) {
  try {
    const headers = createHeaders();
    const SITE_CONFIG = getConfig();
    const response = await fetch(`${SITE_CONFIG.apiUrl}/${endpoint}`, {
      method,
      headers,
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred while making the API request.");
  }
}

export async function fetchSessionData(endpoint, token) {
  const SITE_CONFIG = getConfig();
  try {
    const method = "GET";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const response = await fetch(`${SITE_CONFIG.apiUrl}/${endpoint}`, {
      method,
      headers,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred while making the API request.");
  }
}
