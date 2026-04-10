import { getToken, removeToken } from "./authStorage";

type JwtPayload = {
  exp?: number;
  role?: string;
  unique_name?: string;
  name?: string;
  sub?: string;
  [key: string]: unknown;
};

export function parseJwt(token: string): JwtPayload | null {
  try {
    const payloadBase64 = token.split(".")[1];
    const normalized = payloadBase64.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = atob(normalized);
    return JSON.parse(decoded) as JwtPayload;
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const payload = parseJwt(token);

  if (!payload?.exp) return true;

  const nowInSeconds = Math.floor(Date.now() / 1000);
  return payload.exp <= nowInSeconds;
}

export function getUserRoleFromToken(token: string): string | null {
  const payload = parseJwt(token);

  if (!payload) return null;

  const role =
    payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ??
    payload.role;

  return typeof role === "string" ? role : null;
}

export function hasValidAdminToken(): boolean {
  const token = getToken();

  if (!token) return false;

  if (isTokenExpired(token)) {
    removeToken();
    return false;
  }

  const role = getUserRoleFromToken(token);

  if (role !== "Admin") {
    removeToken();
    return false;
  }

  return true;
}