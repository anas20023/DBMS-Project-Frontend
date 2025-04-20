import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { User, Lock, Mail, Briefcase, Hash, School } from 'lucide-react';

const RegisterForm = ({ onToggleForm }) => {
  const [formData, setFormData] = useState({
    name: '',
    student_Id: '',
    dept: '',
    intake: '',
    section: '',
    password: '',
    confirmPassword: '',
    email: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  const { register, state } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.student_Id.trim()) errors.student_Id = 'Student ID is required';
    if (!formData.dept.trim()) errors.dept = 'Department is required';
    if (!formData.intake) errors.intake = 'Intake is required';
    if (!formData.section) errors.section = 'Section is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    
    if (!formData.password) errors.password = 'Password is required';
    else if (formData.password.length < 4) errors.password = 'Password must be at least 4 characters';
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setFormErrors({});
    
    register({
      name: formData.name,
      student_Id: formData.student_Id,
      dept: formData.dept,
      intake: parseInt(formData.intake),
      section: parseInt(formData.section),
      password: formData.password,
      email: formData.email
    });
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Create an Account</h2>
      
      {state.error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
          {state.error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="name"
          name="name"
          label="Full Name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
          error={formErrors.name}
          icon={<User size={18} className="text-gray-500" />}
        />
        
        <Input
          id="student_Id"
          name="student_Id"
          label="Student ID"
          placeholder="Enter your student ID"
          value={formData.student_Id}
          onChange={handleChange}
          error={formErrors.student_Id}
          icon={<Hash size={18} className="text-gray-500" />}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <Input
            id="dept"
            name="dept"
            label="Department"
            placeholder="e.g., CSE"
            value={formData.dept}
            onChange={handleChange}
            error={formErrors.dept}
            icon={<Briefcase size={18} className="text-gray-500" />}
          />
          
          <Input
            id="email"
            name="email"
            type="email"
            label="Email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleChange}
            error={formErrors.email}
            icon={<Mail size={18} className="text-gray-500" />}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Input
            id="intake"
            name="intake"
            type="number"
            label="Intake"
            placeholder="e.g., 52"
            value={formData.intake}
            onChange={handleChange}
            error={formErrors.intake}
            icon={<School size={18} className="text-gray-500" />}
          />
          
          <Input
            id="section"
            name="section"
            type="number"
            label="Section"
            placeholder="e.g., 10"
            value={formData.section}
            onChange={handleChange}
            error={formErrors.section}
            icon={<School size={18} className="text-gray-500" />}
          />
        </div>
        
        <Input
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
          error={formErrors.password}
          icon={<Lock size={18} className="text-gray-500" />}
        />
        
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={formErrors.confirmPassword}
          icon={<Lock size={18} className="text-gray-500" />}
        />
        
        <div className="pt-2">
          <Button 
            type="submit" 
            fullWidth 
            isLoading={state.isLoading}
          >
            Create Account
          </Button>
        </div>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <button
            onClick={onToggleForm}
            className="text-blue-600 hover:text-blue-800 font-medium focus:outline-none"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;