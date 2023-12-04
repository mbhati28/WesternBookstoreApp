import axios from 'axios';

const API_BASE_URL = 'http://localhost:5151/api/reviews'; // Update with your actual API base URL

// Function to fetch reviews for a specific booklist
export const fetchReviewsByBooklistId = async (booklistId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/booklist/${booklistId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching reviews:', error);
        throw error;
    }
};

// Function to post a new review
export const createReview = async (reviewData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/`, reviewData);
        return response.data;
    } catch (error) {
        console.error('Error creating review:', error);
        throw error;
    }
};
