import axios from 'axios';

const API_BASE_URL = 'http://localhost:5151/api';

const fetchAllUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user`); 
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };

const updateUserAdminStatus = async (userId, isAdmin) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/user/update-admin/${userId}`, {
        isAdmin: !isAdmin,
      });
      window.location.reload(true);
      return response.data;
    } catch (error) {
      console.error('Error updating user admin status:', error);
      throw error;
    }
};

const updateUserActiveStatus = async (userId, isActive) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/user/update-active/${userId}`, {
        isActive: !isActive,
      });
      window.location.reload(true);
      return response.data;
    } catch (error) {
      console.error('Error updating user active status:', error);
      throw error;
    }
};

export {fetchAllUsers, updateUserActiveStatus, updateUserAdminStatus};
