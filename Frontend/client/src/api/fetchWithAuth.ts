import { getToken } from "../utils/authStorage";

const BASE_URL = "http://localhost:8000";

export async function fetchWithAuth(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = getToken();

  const headers = new Headers(options.headers || {});


  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  } else {
    console.warn("No auth token found for request:", path);
  }

  const isFormData = options.body instanceof FormData;


  if (options.body && !isFormData && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });


  if (response.status === 401) {
    console.error("401 Unauthorized:", path);
  }

  if (response.status === 403) {
    console.error("403 Forbidden (saknar rätt roll?):", path);
  }

  return response;
}