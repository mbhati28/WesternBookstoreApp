// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5151/api'; // Use the correct backend base URL

const login = (email, password) => {
  return axios.post(`${API_BASE_URL}/auth/login`, { email, password });
};

const register = (username, email, password) => {
  return axios.post(`${API_BASE_URL}/auth/register`, { username, email, password });
};

const fetchCart = (userId) => {
  return axios.get(`${API_BASE_URL}/user/${userId}/cart`);
};

const fetchOrders = (userId) => {
  return axios.get(`${API_BASE_URL}/user/${userId}/orders`);
};

export { login, register, fetchCart, fetchOrders };
