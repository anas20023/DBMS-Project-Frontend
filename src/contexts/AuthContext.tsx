import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthState, User } from '../lib/types';
import { sampleUser } from '../lib/dummyData';

// Initial state
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  error: null
};

// Action types
type AuthAction = 
  | { type: 'LOGIN_REQUEST' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'REGISTER_REQUEST' }
  | { type: 'REGISTER_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'REGISTER_FAILURE'; payload: string }
  | { type: 'LOGOUT' };

// Reducer function
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
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
};

// Create context
interface AuthContextType {
  state: AuthState;
  login: (studentId: string, password: string) => void;
  register: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

  // Mock login function (in a real app, this would make an API call)
  const login = (studentId: string, password: string) => {
    dispatch({ type: 'LOGIN_REQUEST' });

    // Simulate API call delay
    setTimeout(() => {
      // In a real app, this would be an API call
      if (studentId === sampleUser.student_Id && password === sampleUser.password) {
        const token = 'mock-jwt-token-' + Math.random().toString(36).substring(2);
        
        // Save to localStorage
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

  // Mock register function (in a real app, this would make an API call)
  const register = (userData: User) => {
    dispatch({ type: 'REGISTER_REQUEST' });

    // Simulate API call delay
    setTimeout(() => {
      // In a real app, this would be an API call to register the user
      // For now, we'll just check if the provided data matches our sample user
      if (userData.student_Id === sampleUser.student_Id) {
        dispatch({
          type: 'REGISTER_FAILURE',
          payload: 'User with this Student ID already exists'
        });
      } else {
        const token = 'mock-jwt-token-' + Math.random().toString(36).substring(2);
        
        // Save to localStorage
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

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};