// src/services/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5151/api"; // Use the correct backend base URL

const login = (email, password) => {
  return axios.post(`${API_BASE_URL}/auth/login`, { email, password });
};

const register = (username, email, password) => {
  return axios.post(`${API_BASE_URL}/auth/register`, {
    username,
    email,
    password,
  });
};

const fetchCart = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/cart/${userId}`);
    return response.data.items;
  } catch (error) {
    console.error("Error fetching cart data:", error);
    // Handle the error appropriately
    return null; // or throw an error, depending on your error handling strategy
  }
};

const fetchOrders = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/orders/${userId}`);
    return response;
  } catch (error) {
    console.error("Error fetching order data:", error);
    // Handle the error appropriately
    return null; // or throw an error, depending on your error handling strategy
  }
};

const addToCart = async (userId, book) => {
  
  try {
    await axios.post(`${API_BASE_URL}/user/cart/${userId}`, {
      id: book.id, // Google Books API ID
      volumeInfo: {
        title: book.volumeInfo.title,
        imageLinks: {
          thumbnail: book.volumeInfo.imageLinks?.thumbnail
        }
      },
      saleInfo: {
        listPrice: {
          amount: book.saleInfo.listPrice?.amount
        }
      },
      quantity: 1 // Quantity to add
    });
    // Handle success (e.g., show success message or update UI)
  } catch (error) {
    console.error("Error adding to cart:", error);
    // Handle error (e.g., show error message)
  }
};


const removeFromCart = async (userId, bookId) => {
  try {
    console.log("inside remove from cart", userId, bookId);
    await axios.delete(`${API_BASE_URL}/user/cart/${userId}/${bookId}`);
    // Handle success
  } catch (error) {
    console.error("Error removing from cart:", error);
    // Handle error
  }
};
export { login, register, fetchCart, fetchOrders, addToCart, removeFromCart };
