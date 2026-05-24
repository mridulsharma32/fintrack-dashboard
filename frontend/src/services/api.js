import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("fintrack_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function storeSession(payload) {
  localStorage.setItem("fintrack_token", payload.access_token);
  localStorage.setItem("fintrack_user", JSON.stringify(payload.user));
}

export function clearSession() {
  localStorage.removeItem("fintrack_token");
  localStorage.removeItem("fintrack_user");
}

export function readStoredUser() {
  const raw = localStorage.getItem("fintrack_user");
  return raw ? JSON.parse(raw) : null;
}
