import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouteForIdentified = () => {
  const userInfo = localStorage.getItem('username');

  return (userInfo !== null) ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouteForIdentified;
