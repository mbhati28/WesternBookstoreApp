import React, { useEffect, useState } from 'react';
import { fetchAllUsers, updateUserAdminStatus, updateUserActiveStatus} from '../services/userapi';
import AdminUserDashboard from "./AdminUserDashboard";
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch users from the backend
    fetchAllUsers()
    .then(users => {
        console.log(users);
        setUsers(users);
      })
      .catch(error => {
        console.error(error);
      });
    
  }, []);

  const handleClick = () =>{
    navigate('/admin/users');
  }

  const handleReviewClick = () =>{
    navigate('/admin/reviews');
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={() => handleClick()}>Users</button>
      <button onClick={() => handleReviewClick()}>Reviews</button>
    </div>
  );
};

export default AdminDashboard;
