import axios from 'axios';

const BASE = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';
const api = axios.create({ baseURL: BASE, timeout: 10000 });

// Initialize auth header from localStorage at module load to avoid first-render race
try {
  const existingToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (existingToken) {
    api.defaults.headers.common['Authorization'] = `Bearer ${existingToken}`;
  }
} catch (e) {
  // ignore storage access issues
}

export function setAuthToken(token) {
  if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete api.defaults.headers.common['Authorization'];
}

export const authSignup = (payload) => api.post('/auth/signup', payload);
export const authLogin = (payload) => api.post('/auth/login', payload);

export const getProducts = () => api.get('/products');
export const getProduct = (id) => api.get(`/products/${id}`);

export const getCart = () => api.get('/cart');
export const addCart = (body) => api.post('/cart', body);
export const updateCartItem = (id, body) => api.put(`/cart/${id}`, body);
export const deleteCartItem = (id) => api.delete(`/cart/${id}`);

export const checkout = (body) => api.post('/checkout', body);

export default api;
