import type { LoginRequest, LoginResponse } from "../types/auth";

const BASE_URL = "http://localhost:8000";

export async function loginAdmin(
  credentials: LoginRequest
): Promise<LoginResponse> {
  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (response.status === 401) {
    throw new Error("Invalid username or password.");
  }

  if (!response.ok) {
    throw new Error("Något gick fel vid inloggning.");
  }

  return response.json();
}