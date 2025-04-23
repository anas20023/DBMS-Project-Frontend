import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import resigter from "../assets/register.png"
const Register = () => {
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
      .then((res) => {
        if (res?.success) toast.success("Registered successfully!");
      })
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
        {/* Left Side */}
        <div className="md:w-1/2 bg-blue-50 dark:bg-slate-900 flex flex-col justify-center items-center p-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800 dark:text-white mb-4">
            Join the Community 🌟
          </h1>
          <p className="text-blue-700 dark:text-slate-300 text-sm md:text-base max-w-md">
            Register now to share and explore university exam suggestions. Help your juniors and earn stars!
          </p>
          <img
            src={resigter}
            alt="Register Illustration"
            className="w-60 md:w-72 mt-6 hidden md:block shadow"
          />
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 bg-white dark:bg-slate-800 flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2 text-center">
                Create Account
              </h2>

              {[
                { name: "name", type: "text" },
                { name: "student_Id", type: "text" },
                { name: "dept", type: "text" },
                { name: "intake", type: "number" },
                { name: "section", type: "text" },
                { name: "email", type: "email" },
                { name: "password", type: "password" },
              ].map(({ name, type }) => (
                <input
                  key={name}
                  type={type}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  placeholder={name
                    .replace("_", " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  required
                />
              ))}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-md font-medium transition-all duration-300 disabled:opacity-60"
              >
                {loading ? "Registering..." : "Register"}
              </button>

              <p className="text-sm text-center text-slate-600 dark:text-slate-300 mt-2">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:underline">
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>

      </div>
    </>
  );
};

export default Register;
