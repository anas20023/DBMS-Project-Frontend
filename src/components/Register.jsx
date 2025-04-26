import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import registerIllustration from "../assets/register.png";

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

  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <div className="flex flex-col md:flex-row min-h-[90vh]">
        {/* Left Panel */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-green-200 to-teal-400 dark:from-gray-700 dark:to-gray-900 items-center justify-center p-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-green-800 dark:text-white mb-4">
              Join the Community 🌟
            </h1>
            <p className="text-lg text-green-700 dark:text-gray-300 max-w-sm mx-auto">
              Register now to share and explore university exam suggestions. Help your juniors and earn stars!
            </p>
            <img
              src={registerIllustration}
              alt="Register Illustration"
              className="w-64 mt-6 mx-auto animate-fadeIn"
            />
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-10 bg-white dark:bg-gray-800">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 sm:p-10 transform transition-transform hover:scale-105"
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
              Create Account
            </h2>

            <div className="grid grid-cols-1 gap-5">
              {[
                { label: "Full Name", name: "name", type: "text" },
                { label: "Student ID", name: "student_Id", type: "text" },
                { label: "Department", name: "dept", type: "text" },
                { label: "Intake", name: "intake", type: "number" },
                { label: "Section", name: "section", type: "text" },
                { label: "Email", name: "email", type: "email" },
                { label: "Password", name: "password", type: "password" },
              ].map(({ label, name, type }) => (
                <div key={name} className="relative">
                  <input
                    type={type}
                    name={name}
                    id={name}
                    value={form[name]}
                    onChange={handleChange}
                    placeholder={label}
                    required
                    className="peer w-full h-12 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-gray-100 placeholder-transparent focus:outline-none focus:border-teal-500"
                  />
                  <label
                    htmlFor={name}
                    className="absolute left-0 -top-3 text-sm text-gray-600 dark:text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-teal-500"
                  >
                    {label}
                  </label>
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full py-3 bg-gradient-to-r from-teal-500 to-green-500 text-white font-semibold rounded-xl shadow-md hover:from-teal-600 hover:to-green-600 transition-colors disabled:opacity-50"
            >
              {loading ? "Registering..." : "Register"}
            </button>

            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-teal-500 hover:underline dark:text-teal-300">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
