// src/components/Register.jsx

import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import registerIllustration from "../assets/register.png";
import {
  FiUser,
  FiLock,
  FiMail,
  FiBook,
  FiHash,
  FiCalendar,
  FiAward,
} from "react-icons/fi";

export default function Register() {
  const { register, loading, error } = useAuth();
  const [form, setForm] = useState({
    name: "",
    student_Id: "",
    dept: "",
    intake: "",
    section: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    register({ ...form, intake: Number(form.intake) })
      .then((res) => res.success && toast.success("Registered successfully!"))
      .catch(() => toast.error("Registration failed!"));
  };

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const fields = [
    { label: "Full Name", name: "name", type: "text", icon: <FiUser className="w-5 h-5 text-gray-400" /> },
    { label: "Student ID", name: "student_Id", type: "text", icon: <FiHash className="w-5 h-5 text-gray-400" /> },
    { label: "Department", name: "dept", type: "text", icon: <FiBook className="w-5 h-5 text-gray-400" /> },
    { label: "Intake", name: "intake", type: "number", icon: <FiCalendar className="w-5 h-5 text-gray-400" /> },
    { label: "Section", name: "section", type: "text", icon: <FiAward className="w-5 h-5 text-gray-400" /> },
    { label: "Email", name: "email", type: "email", icon: <FiMail className="w-5 h-5 text-gray-400" /> },
    { label: "Password", name: "password", type: "password", icon: <FiLock className="w-5 h-5 text-gray-400" /> },
  ];

  return (
    <>
      <Navbar />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        theme="colored"
        toastClassName="shadow-xl"
      />

      <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-teal-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="w-full max-w-7xl mx-4 my-8 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Illustration Section */}
            <div className="hidden lg:flex bg-gradient-to-br from-teal-500 to-emerald-600 dark:from-gray-800 dark:to-gray-900 p-12 flex-col justify-between">
              <div className="space-y-8">
                <h1 className="text-4xl font-bold text-white drop-shadow-md">
                  Join Our Academic Community 🚀
                </h1>
                <p className="text-lg text-teal-100/90 dark:text-gray-300 leading-relaxed">
                  Unlock exclusive features, share resources, and connect with peers.
                  Start your journey to academic excellence today!
                </p>
              </div>
              <div className="relative group mt-8">
                <img
                  src={registerIllustration}
                  alt="Registration"
                  className="w-full h-64 object-contain transform transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-500/20 to-transparent" />
              </div>
            </div>

            {/* Registration Form */}
            <div className="p-8 sm:p-12 lg:p-16">
              <div className="max-w-md mx-auto">
                <div className="mb-10 space-y-3">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Create Account
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-teal-500 hover:text-teal-600 dark:text-teal-400 font-medium"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6">
                    {fields.map(({ label, name, type, icon }) => (
                      <div key={name} className="flex flex-col">
                        <label
                          htmlFor={name}
                          className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          {label}
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            {icon}
                          </div>
                          <input
                            type={type}
                            name={name}
                            id={name}
                            placeholder={label}
                            value={form[name]}
                            onChange={handleChange}
                            required
                            className="w-full pl-11 pr-4 py-3.5 bg-gray-100 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      "Register Now"
                    )}
                  </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  By registering, you agree to our{" "}
                  <a
                    href="#"
                    className="text-teal-500 hover:text-teal-600 dark:text-teal-400"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-teal-500 hover:text-teal-600 dark:text-teal-400"
                  >
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
