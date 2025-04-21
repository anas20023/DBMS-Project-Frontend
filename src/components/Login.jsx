import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { login, loading, error } = useAuth();
  const [form, setForm] = useState({ student_Id: "", password: "" });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    login({ student_Id: form.student_Id, password: form.password });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-slate-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">Login</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="student_Id"
          placeholder="Student ID"
          value={form.student_Id}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded dark:bg-slate-700 dark:border-slate-600 dark:text-white"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded dark:bg-slate-700 dark:border-slate-600 dark:text-white"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;