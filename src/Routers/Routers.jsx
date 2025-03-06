import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import Loading from '../Components/Loading.jsx';
import ProtectedRoute from '../Components/ProtectedRoute.jsx';

// Lazy load the Dashboard component
const Dashboard = lazy(() => import('../Pages/Dashboard.jsx'));
const Questions = lazy(() => import('../Pages/Questions/Questions.jsx'));

export default function Routers() {
    const isAuthenticated = true; //authentication logic

    return (
        <Router> 
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard/home" />} />
                {/* Protected Route */}
                <Route
                    path="/dashboard/:tabValue"
                    element={
                        <Suspense fallback={<Loading />}>
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Dashboard />
                            </ProtectedRoute>
                        </Suspense>
                    }
                />
                <Route
                    path="/questions"
                    element={
                        <Suspense fallback={<Loading />}>
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Questions />
                            </ProtectedRoute>
                        </Suspense>
                    }
                />

            </Routes>
        </Router>
    );
}