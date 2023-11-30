import axios from "axios";

const API_BASE_URL = "http://localhost:5151/api"; // Adjust the base URL as needed

export const registerUser = (userData) => {
  console.log("Register userData", userData);
  return axios.post(`${API_BASE_URL}/auth/register`, userData);
};

export const loginUser = (userData) => {
  console.log("loginUser", userData);
  return axios.post(`${API_BASE_URL}/auth/login`, userData);
};

export const googleLogin = (tokenData) => {
  return axios.post(`${API_BASE_URL}/auth/google-login`, tokenData);
};
