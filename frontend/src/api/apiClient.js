import axios from "axios";
import { useAuthStore } from "../stores/authStore";

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_CLIENT_API_URL}/api`,
  httpsAgent: false,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (err) => {
    console.error("API call failed", err);
    return Promise.reject(err);
  }
);

export default apiClient;
