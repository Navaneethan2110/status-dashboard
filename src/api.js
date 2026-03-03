import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

export const api = axios.create({
  baseURL: API_BASE,
});

export const getLatestStatus = () => api.get("/api/status/latest");
export const getHistory = (id) => api.get(`/api/status/history/${id}?hours=24`);
export const addWebsite = (url) => api.post("/api/websites", { url });