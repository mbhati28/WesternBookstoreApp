import React, { useEffect, useState } from 'react';
import { fetchAllUsers, updateUserAdminStatus, updateUserActiveStatus} from '../services/userapi';
import AdminUserDashboard from "./AdminUserDashboard";
import { useNavigate } from 'react-router-dom';
import "./adminstyle.css"
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
    <div className="admin-dashboard-container">
          <h1>Admin Dashboard</h1>
          <div className="button-container">
            <button onClick={() => handleClick()}>Users</button>
            <button onClick={() => handleReviewClick()}>Reviews</button>
          </div>
        </div>
  );
};

export default AdminDashboard;
