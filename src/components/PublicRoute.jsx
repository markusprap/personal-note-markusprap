import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loader } from 'lucide-react';

function PublicRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  
  if (isLoading) {
    return (
      <div className="page-container">
        <div className="loading-state">
          <div className="loading-spinner">
            <Loader className="spin" size={48} />
          </div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PublicRoute;