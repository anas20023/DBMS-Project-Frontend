import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Login = () => {
  const { login, loading, error } = useAuth();
  const [form, setForm] = useState({ studentId: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ studentId: form.studentId, password: form.password })
      .then((res) => {
        if (res?.success) {
          toast.success("Login successful!"); 
        }
      })
      .catch((err) => {
        toast.error(err?.message || "Login failed!");
      });
  };

  // Trigger toast on auth error
  useEffect(() => {
    if (error) {
      toast.error(error);
      setForm({studentId: "", password: ""});
    }
  }, [error]);

  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <div className="flex flex-col md:flex-row h-[90vh] w-full">
  {/* Left Panel */}
  <div className="hidden md:flex w-1/2 items-center justify-center bg-blue-100 dark:bg-slate-700">
    <h1 className="text-3xl font-bold text-blue-700 dark:text-white px-8 text-center">
      Login to access <br /> course suggestions 🚀
    </h1>
  </div>

  {/* Right Panel */}
  <div className="w-full md:w-1/2 flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 sm:p-8 transition-all duration-300">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-800 dark:text-white mb-4 sm:mb-6">
        Welcome Back 👋
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        <input
          type="text"
          name="studentId"
          placeholder="Student ID"
          value={form.studentId}
          onChange={handleChange}
          className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 rounded-md font-semibold text-sm sm:text-base transition-all duration-300 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="mt-4 text-center text-sm text-slate-700 dark:text-slate-300">
        Don’t have an account?{" "}
        <Link
          to="/register"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          Register here
        </Link>
      </div>
    </div>
  </div>
</div>

    </>
  );
};

export default Login;
