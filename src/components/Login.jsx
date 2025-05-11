import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { FiUser, FiLock, FiLoader } from "react-icons/fi";

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        theme="colored"
        toastClassName="dark:bg-gray-800 dark:text-white"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Illustration Section */}
          <div className="hidden lg:block bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diagonal-striped-brick.png')]" />
            <div className="h-full flex flex-col justify-center items-center text-center space-y-6 relative">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-100/20 rounded-full animate-pulse" />
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-100/20 rounded-full animate-pulse delay-75" />
                <div className="relative space-y-4">
                  <h1 className="text-4xl font-bold text-white drop-shadow-md">
                    Welcome Back! 👋
                  </h1>
                  <p className="text-lg text-blue-100/90 leading-relaxed">
                    Access personalized course suggestions and academic resources
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center">
                  <FiUser className="w-24 h-24 text-white/30" />
                </div>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl transition-all duration-300 hover:shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
              Sign In
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                {
                  label: "Student ID",
                  name: "studentId",
                  type: "text",
                  icon: <FiUser className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                },
                {
                  label: "Password",
                  name: "password",
                  type: "password",
                  icon: <FiLock className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                }
              ].map(({ label, name, type, icon }) => (
                <div key={name} className="relative group">
                  <label
                    htmlFor={name}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {label}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      {icon}
                    </div>
                    <input
                      type={type}
                      name={name}
                      id={name}
                      value={form[name]}
                      onChange={handleChange}
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={label}
                    />
                  </div>
                </div>
              ))}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-semibold rounded-lg text-sm shadow-lg transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <FiLoader className="w-4 h-4 animate-spin mr-2" />
                    Authenticating...
                  </>
                ) : (
                  "Continue"
                )}
              </button>
            </form>

            <div className="mt-8 text-center space-y-4">

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  New here?{' '}
                  <Link
                    to="/register"
                    className="text-purple-600 dark:text-purple-400 font-semibold hover:underline"
                  >
                    Create account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}