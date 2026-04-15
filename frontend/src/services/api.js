import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
const API_KEY = import.meta.env.VITE_API_KEY || "";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    ...(API_KEY ? { "x-api-key": API_KEY } : {}),
  },
});

// Request interceptor to add JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (API_KEY) {
    config.headers["x-api-key"] = API_KEY;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
};

export const userAPI = {
  getRestaurants: () => api.get("/restaurants"),
  getMenu: (id) => api.get(`/restaurants/${id}/menu`),
  createOrder: (data) => api.post("/orders", data),
  getMyOrders: () => api.get("/orders/my"),
  cancelOrder: (id) => api.put(`/orders/${id}/cancel`),
};

export const adminAPI = {
  createRestaurant: (data) => api.post("/admin/restaurants", data),
  deleteRestaurant: (id) => api.delete(`/admin/restaurants/${id}`),
  createMenuItem: (data) => api.post("/admin/menu", data),
  updateMenuItem: (id, data) => api.put(`/admin/menu/${id}`, data),
  deleteMenuItem: (id) => api.delete(`/admin/menu/${id}`),
};

export default api;
