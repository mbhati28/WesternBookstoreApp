import React, { useEffect, useState } from 'react';
import { fetchAllUsers, updateUserAdminStatus, updateUserActiveStatus} from '../services/userapi';

const AdminUserDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchAllUsers()
    .then(users => {
        console.log(users);
        setUsers(users);
      })
      .catch(error => {
        console.error(error);
      });
    
  }, []);

  const toggleUserStatus = async (userId, type) => {
    console.log(user);
  };

  return (
     <div className="admin-user-dashboard-container">
          <h1>Admin Dashboard</h1>
          {users.map((user) => (
            <div key={user._id} className="user">
              <span>{user.username}</span>
              <button onClick={() => updateUserActiveStatus(user._id, user.isActive)}>
                {user.isActive ? 'Deactivate' : 'Activate'}
              </button>
              <button onClick={() => updateUserAdminStatus(user._id, user.isAdmin)}>
                {user.isAdmin ? 'Revoke Admin' : 'Grant Admin'}
              </button>
            </div>
          ))}
        </div>
  );
};

export default AdminUserDashboard;
