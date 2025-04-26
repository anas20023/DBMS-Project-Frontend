import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

export default function Login() {
  const { login, loading, error } = useAuth();
  const [form, setForm] = useState({ studentId: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ studentId: form.studentId, password: form.password })
      .then((res) => res.success && toast.success("Login successful!"))
      .catch((err) => toast.error(err?.message || "Login failed!"));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      setForm({ studentId: "", password: "" });
    }
  }, [error]);

  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <div className="flex flex-col md:flex-row h-[90vh] w-full">
        {/* Left Panel */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br from-blue-200 to-indigo-300 dark:from-gray-700 dark:to-gray-900">
          <div className="p-8 text-center">
            <h1 className="text-4xl font-extrabold text-blue-800 dark:text-white mb-4">
              Welcome Back!
            </h1>
            <p className="text-lg text-blue-600 dark:text-gray-300">
              Login to access course suggestions 🚀
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-6 mt-20">
          <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 sm:p-10 transform transition-transform hover:scale-105">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
              Sign In
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { label: "Student ID", name: "studentId", type: "text" },
                { label: "Password", name: "password", type: "password" }
              ].map(({ label, name, type }) => (
                <div key={name} className="relative">
                  <input
                    type={type}
                    name={name}
                    id={name}
                    value={form[name]}
                    onChange={handleChange}
                    required
                    className="peer w-full h-12 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-gray-100 placeholder-transparent focus:outline-none focus:border-indigo-500"
                    placeholder={label}
                  />
                  <label
                    htmlFor={name}
                    className="absolute left-0 -top-3.5 text-gray-600 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-indigo-500"
                  >
                    {label}
                  </label>
                </div>
              ))}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold rounded-xl shadow-md hover:from-indigo-700 hover:to-blue-600 transition-colors disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              Don’t have an account?{' '}
              <Link to="/register" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}