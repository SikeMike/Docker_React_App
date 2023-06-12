import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouteForRandom = () => {
  const userInfo = localStorage.getItem('username');

  return (userInfo !== null) ? <Navigate to="/" /> : <Outlet />;
};

export default PrivateRouteForRandom;
