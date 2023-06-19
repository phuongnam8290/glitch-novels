import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

// Create new axios instance with custom config.
const apiClient = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
});

export default apiClient;
