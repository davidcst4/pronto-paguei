import axios from "axios";
import { authenticate } from "../api/auth";

const api = axios.create({
  baseURL: process.env.ADIQ_URL,
});

api.interceptors.request.use(async (config) => {
  if (!config.headers["Authorization"]) {
    const token = await authenticate();
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default api;
