import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";

export default function Upload() {
  // pull logged-in student info from localStorage
  const [student] = useState(() => {
    const stored = localStorage.getItem("student_all");
    return stored ? JSON.parse(stored) : {};
  });

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    course_code: "",
    course_name: "",
    dept: "",
    intake: "",
    section: "",
    exam_type: "Midterm",
    description: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1) Upload file to Cloudinary
      const data = new FormData();
      data.append("file", formData.file);
      data.append("upload_preset", "suggestion_preset");

      const cloudRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${'dv7sp7pxk'}/upload`,
        data
      );

      const attachmentUrl = cloudRes.data.secure_url;

      // 2) Prepare payload with Cloudinary URL
      const payload = {
        uploaded_by: student.student_Id,
        course_code: formData.course_code.toUpperCase(),
        course_name: formData.course_name,
        dept: formData.dept.toUpperCase(),
        intake: formData.intake,
        section: formData.section,
        exam_type: formData.exam_type,
        description: formData.description,
        attachment_url: attachmentUrl,
      };

      // 3) Send suggestion to backend
      await axios.post(
        "https://sgm.anasibnbelal.live/api/auth/suggetions/create",
        payload,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      // 4) Navigate back to dashboard
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Upload failed, try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Left Panel */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-200 to-indigo-300 dark:from-gray-800 dark:to-gray-900 items-center justify-center p-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-blue-800 dark:text-white mb-4">
              Share Your Suggestion
            </h1>
            <p className="text-lg text-blue-700 dark:text-gray-300 max-w-md mx-auto">
              Upload PDFs or images of your course suggestions and help your
              peers ace their exams!
            </p>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-10">
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-lg transform transition hover:scale-105"
          >
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-6 text-center">
              Upload Suggestion
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Course Code", name: "course_code" },
                { label: "Course Name", name: "course_name" },
                { label: "Department", name: "dept" },
                { label: "Intake", name: "intake" },
                { label: "Section", name: "section" },
              ].map(({ label, name }) => (
                <div key={name} className="relative">
                  <input
                    type="text"
                    name={name}
                    id={name}
                    value={formData[name]}
                    onChange={handleChange}
                    required
                    className="peer h-12 w-full border-b-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-transparent focus:outline-none focus:border-blue-500"
                    placeholder={label}
                  />
                  <label
                    htmlFor={name}
                    className="absolute left-0 -top-3.5 text-gray-600 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-500"
                  >
                    {label}
                  </label>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <label
                className="block text-gray-700 dark:text-gray-300 mb-1"
                htmlFor="exam_type"
              >
                Exam Type
              </label>
              <select
                name="exam_type"
                id="exam_type"
                value={formData.exam_type}
                onChange={handleChange}
                className="w-full h-10 px-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option>Midterm</option>
                <option>Final</option>
              </select>
            </div>

            <div className="mt-4 relative">
              <textarea
                name="description"
                id="description"
                rows={4}
                required
                value={formData.description}
                onChange={handleChange}
                className="peer w-full px-3 py-2 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-gray-100 placeholder-transparent focus:outline-none focus:border-blue-500 resize-none"
                placeholder="Description"
              />
              <label
                htmlFor="description"
                className="absolute left-0 -top-3 text-gray-600 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-500"
              >
                Description
              </label>
            </div>

            <div className="mt-6">
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                Attachment <span className="text-red-500">*</span>
              </label>
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-30 px-4 transition bg-white border-2 border-dashed rounded-lg cursor-pointer dark:bg-gray-700 dark:border-gray-500 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-600"
              >
                <svg
                  className="w-8 h-8 mb-2 text-gray-400 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 15a4 4 0 004 4h10a4 4 0 004-4m-4-6l-4-4m0 0l-4 4m4-4v12"
                  />
                </svg>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  <span className="font-medium">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-400 mt-1">
                  PNG, JPG, PDF up to ~5MB
                </p>
                <input
                  id="file-upload"
                  name="file"
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleChange}
                  required
                  className="hidden"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-md hover:from-blue-600 hover:to-indigo-700 transition disabled:opacity-50"
            >
              {loading ? "Uploading..." : "Upload Now"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
