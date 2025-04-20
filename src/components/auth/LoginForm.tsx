import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Lock, User } from 'lucide-react';

interface LoginFormProps {
  onToggleForm: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onToggleForm }) => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const { login, state } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(studentId, password);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Welcome Back</h2>
      
      {state.error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
          {state.error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="studentId"
          label="Student ID"
          placeholder="Enter your student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          icon={<User size={18} className="text-gray-500" />}
          required
        />
        
        <Input
          id="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<Lock size={18} className="text-gray-500" />}
          required
        />
        
        <div className="pt-2">
          <Button 
            type="submit" 
            fullWidth 
            isLoading={state.isLoading}
          >
            Sign In
          </Button>
        </div>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={onToggleForm}
            className="text-blue-600 hover:text-blue-800 font-medium focus:outline-none"
          >
            Register Now
          </button>
        </p>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Demo credentials: Student ID: 20234103372, Password: 1234
        </p>
      </div>
    </div>
  );
};

export default LoginForm;