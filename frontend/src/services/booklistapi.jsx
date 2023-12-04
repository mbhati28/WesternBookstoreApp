// src/api/api.jsx
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5151/api/booklists'; // Replace with your actual server URL

export const getAllBooklists = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching booklists:', error);
    throw error;
  }
};

export const getBooklistsByUser = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user booklists:', error);
    throw error;
  }
};

export const fetchBooklistById = async (booklistId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${booklistId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching booklist by ID:', error);
    throw error;
  }
};

export const updateBooklist = async (booklistId, updatedData) => {
  return axios.put(`${API_BASE_URL}/${booklistId}`, updatedData);
};

export const removeBookFromBooklist = async (booklistId, bookId) => {
  return axios.put(`${API_BASE_URL}/removeBook/${booklistId}`, { bookId });
};

export const createBooklist = async (userId,name,username, books, isPrivate,description) => {
  try {
    const response = await axios.post(API_BASE_URL, { userId:userId,name:name,username:username,books: books,isPrivate:isPrivate, description:description });
    return response.data;
  } catch (error) {
    console.error('Error creating booklist:', error);
    throw error;
  }
};

export const deleteBooklist = async (booklistId) => {
  try {
    await axios.delete(`${API_BASE_URL}/${booklistId}`);
  } catch (error) {
    console.error('Error deleting booklist:', error);
    throw error;
  }
};

export const deleteAllBooklistsForUser = async (userId) => {
  try {
    await axios.delete(`${API_BASE_URL}/user/${userId}`);
  } catch (error) {
    console.error('Error deleting all booklists for user:', error);
    throw error;
  }
};
