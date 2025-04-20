import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { sampleUser } from '../lib/dummyData';

// Initial state
const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  error: null
};

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user, token }
        });
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Mock login function
  const login = (studentId, password) => {
    dispatch({ type: 'LOGIN_REQUEST' });

    // Simulate API call delay
    setTimeout(() => {
      if (studentId === sampleUser.student_Id && password === sampleUser.password) {
        const token = 'mock-jwt-token-' + Math.random().toString(36).substring(2);
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(sampleUser));
        
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user: sampleUser, token }
        });
      } else {
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: 'Invalid student ID or password'
        });
      }
    }, 1000);
  };

  // Mock register function
  const register = (userData) => {
    dispatch({ type: 'REGISTER_REQUEST' });

    setTimeout(() => {
      if (userData.student_Id === sampleUser.student_Id) {
        dispatch({
          type: 'REGISTER_FAILURE',
          payload: 'User with this Student ID already exists'
        });
      } else {
        const token = 'mock-jwt-token-' + Math.random().toString(36).substring(2);
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        dispatch({
          type: 'REGISTER_SUCCESS',
          payload: { user: userData, token }
        });
      }
    }, 1000);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Auth reducer
function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST':
    case 'REGISTER_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null
      };
    case 'LOGIN_FAILURE':
    case 'REGISTER_FAILURE':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null
      };
    default:
      return state;
  }
}

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};