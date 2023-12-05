import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const AdminButton = () => {
  const { authData } = useContext(AuthContext);

  if (authData && authData.isAdmin) {
    return <Link to="/admin" className="nav-link">Admin</Link>;
  }
  return null;
};

export default AdminButton;
