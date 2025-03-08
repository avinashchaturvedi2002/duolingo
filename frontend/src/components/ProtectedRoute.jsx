import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const token = localStorage.getItem('token'); // Check if the user is authenticated
    return token ? <Outlet /> : <Navigate to="/login" />; // Redirect to login if not authenticated
};

export default ProtectedRoute;