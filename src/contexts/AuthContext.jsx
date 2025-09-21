import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAccessToken, putAccessToken, getUserLogged, login, register } from '../utils/network-data';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = getAccessToken();
      
      if (token) {
        try {
          const { error, data } = await getUserLogged();
          
          if (!error) {
            setUser(data);
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('accessToken');
            setUser(null);
            setIsAuthenticated(false);
          }
        } catch (err) {
          console.error('Error initializing auth:', err);
          localStorage.removeItem('accessToken');
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const loginUser = async (credentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error, data } = await login(credentials);
      
      if (!error) {
        putAccessToken(data.accessToken);
        
        const userResponse = await getUserLogged();
        if (!userResponse.error) {
          setUser(userResponse.data);
          setIsAuthenticated(true);
          return { success: true, user: userResponse.data };
        }
      }
      
      return { success: false, error: 'Login failed' };
    } catch (err) {
      const errorMessage = err.message || 'Login failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const registerUser = async (userData) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await register(userData);
      
      if (!error) {
        return { success: true };
      }
      
      return { success: false, error: 'Registration failed' };
    } catch (err) {
      const errorMessage = err.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('accessToken');
    
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    error,
    loginUser,
    registerUser,
    logoutUser,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};