import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children, isAuthenticated }) => {
    if (!isAuthenticated) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" replace />;
    }

    // Render the protected component if authenticated
    return children;
};

export default ProtectedRoute
