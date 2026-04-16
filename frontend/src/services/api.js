import axios from 'axios';

const API_BASE = '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (data) => api.post('/auth/login', data).then(res => res.data),
  register: (data) => api.post('/auth/register', data).then(res => res.data),
};

export const userAPI = {
  restaurants: () => api.get('/restaurants').then(res => res.data),
  restaurantMenu: (id) => api.get(`/restaurants/${id}/menu`).then(res => res.data),
  createOrder: (data) => api.post('/orders', data).then(res => res.data),
  myOrders: () => api.get('/orders/my').then(res => res.data),
  cancelOrder: (id) => api.put(`/orders/${id}/cancel`).then(res => res.data),
};

export const adminAPI = {
  createRestaurant: (data) => api.post('/admin/restaurants', data).then(res => res.data),
  deleteRestaurant: (id) => api.delete(`/admin/restaurants/${id}`).then(res => res.data),
  createMenuItem: (data) => api.post('/admin/menu', data).then(res => res.data),
  updateMenuItem: (id, data) => api.put(`/admin/menu/${id}`, data).then(res => res.data),
deleteMenuItem: (id) => api.delete(`/admin/menu/${id}`).then(res => res.data),
  getMenuItems: (restaurantId) => api.get(`/restaurants/${restaurantId}/menu`).then(res => res.data),
};

export default api;

