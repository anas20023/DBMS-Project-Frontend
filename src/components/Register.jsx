import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const { register, loading, error } = useAuth();
  const [form, setForm] = useState({
    name: "",
    student_Id: "",
    dept: "",
    intake: "",
    section: "",
    email: "",
    password: ""
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    register({
      name: form.name,
      student_Id: form.student_Id,
      dept: form.dept,
      intake: Number(form.intake),
      section: form.section,
      email: form.email,
      password: form.password
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-slate-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">Register</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {['name','student_Id','dept','intake','section','email','password'].map(field => (
          <input
            key={field}
            type={field === 'password' ? 'password' : 'text'}
            name={field}
            placeholder={field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            value={form[field]}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded dark:bg-slate-700 dark:border-slate-600 dark:text-white"
            required
          />
        ))}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;