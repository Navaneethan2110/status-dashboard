import axios from "axios";

const API_BASE = "https://YOUR-RENDER-SERVICE.onrender.com";

export const api = axios.create({
  baseURL: API_BASE,
});

export const getLatestStatus = () => api.get("/api/status/latest");
export const getHistory = (id) => api.get(`/api/status/history/${id}?hours=24`);
export const addWebsite = (url) => api.post("/api/websites", { url });