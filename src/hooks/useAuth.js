import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//const API_URL = "http://localhost:5000/api/auth";
const API_URL = "https://sgm.anasibnbelal.live/api/auth";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${API_URL}/register`, userData);
      return res.data;                  // <-- return the payload
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
      return { success: false };        // <-- indicate failure
    } finally {
      setLoading(false);
    }
  };

  const login = async ({ studentId, password }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${API_URL}/login`, { studentId, password });
      const { student } = res.data;

      localStorage.setItem('student_id', student.student_Id);
      localStorage.setItem('student_all', JSON.stringify(student));

      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('student_id');
    localStorage.removeItem('student_all');
    navigate('/');
  };

  return { register, login, logout, loading, error };
};
