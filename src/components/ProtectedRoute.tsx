import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles = [] }) => {
  const { currentUser, isLoading } = useAuth();
  const location = useLocation();

  // If authentication is still loading, show a loading indicator or skeleton
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If roles are specified and user doesn't have the required role, redirect
  // This would require you to store user roles in your auth system or firestore
  if (allowedRoles.length > 0) {
    // For now, checking based on pathname since we don't have role data
    // In a real application, you would check against user.role or similar
    const isAdmin = location.pathname.startsWith('/admin');
    const isArtisan = location.pathname.startsWith('/artisan');
    
    if (isAdmin && !allowedRoles.includes('admin')) {
      return <Navigate to="/" replace />;
    }
    
    if (isArtisan && !allowedRoles.includes('artisan')) {
      return <Navigate to="/" replace />;
    }
  }

  // User is authenticated and has the allowed role, render the route
  return <Outlet />;
};

export default ProtectedRoute; 