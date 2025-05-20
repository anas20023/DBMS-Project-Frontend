import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import { FiUploadCloud, FiFileText, FiLoader } from "react-icons/fi";

export default function Upload() {
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
  const [filePreview, setFilePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file" && files[0]) {
      setFilePreview(files[0].name);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("file", formData.file);
      data.append("upload_preset", import.meta.env.VITE_CL_PRESET);

      const cloudRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CL_KEY}/upload`,
        data
      );

      const payload = {
        uploaded_by: student.student_Id,
        course_code: formData.course_code.toUpperCase(),
        course_name: formData.course_name,
        dept: formData.dept.toUpperCase(),
        intake: student.intake,
        section: student.section,
        exam_type: formData.exam_type,
        description: formData.description,
        attachment_url: cloudRes.data.secure_url,
      };

      await axios.post(
        "https://sgm.anasibnbelal.live/api/auth/suggetions/create",
        payload,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Upload failed, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Illustration Section */}
          <div className="hidden lg:block bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 shadow-xl">
            <div className="h-full flex flex-col justify-center items-center text-center space-y-6">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-100/20 rounded-full" />
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-100/20 rounded-full" />
                <div className="relative space-y-4">
                  <h1 className="text-4xl font-bold text-white">
                    Share Your Materials
                  </h1>
                  <p className="text-lg text-blue-100/90 leading-relaxed">
                    Upload your course materials and help create a collaborative
                    learning environment. Your contributions make a difference!
                  </p>
                </div>
              </div>
              <FiFileText className="w-32 h-32 text-white/30 mt-8" />
            </div>
          </div>

          {/* Upload Form */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl relative">
            {/* Loading Overlay */}
            {loading && (
              <div className="absolute inset-0 bg-white/90 dark:bg-gray-800/90 rounded-3xl flex items-center justify-center z-10 backdrop-blur-sm">
                <div className="text-center space-y-4">
                  <FiLoader className="w-12 h-12 text-blue-600 dark:text-purple-400 animate-spin mx-auto" />
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-200">
                    Uploading your suggestion...
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    This might take a few seconds
                  </p>
                </div>
              </div>
            )}

            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
              Upload New Suggestion
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Course Code", name: "course_code", type: "text" },
                  { label: "Course Name", name: "course_name", type: "text" },
                  { label: "Department", name: "dept", type: "text" },
                ].map((field) => (
                  <div key={field.name} className="relative">
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 text-slate-800 dark:text-white bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all peer"
                      placeholder=" "
                    />
                    <label className="absolute left-4 -top-2 text-sm text-gray-500 dark:text-gray-400 pointer-events-none transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600 dark:peer-focus:text-blue-400 bg-gray-50 dark:bg-gray-700 px-2">
                      {field.label}
                    </label>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <select
                    name="exam_type"
                    value={formData.exam_type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-slate-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  >
                    <option>Midterm</option>
                    <option>Final</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                <div className="relative">
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 bg-gray-50 dark:text-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all peer"
                    placeholder=" "
                  />
                  <label className="absolute left-4 -top-2 text-sm text-gray-500 dark:text-gray-400 pointer-events-none transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600 dark:peer-focus:text-blue-400 bg-gray-50 dark:bg-gray-700 px-2">
                    Description
                  </label>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Upload File
                  </label>
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-gray-700/50 transition-colors">
                    <div className="text-center space-y-2">
                      <FiUploadCloud className="w-8 h-8 mx-auto text-gray-400 dark:text-gray-500" />
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {filePreview ? (
                          <span className="text-blue-600 dark:text-blue-400">
                            {filePreview}
                          </span>
                        ) : (
                          <>
                            <span className="font-medium">Click to upload</span> or
                            drag and drop
                          </>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        PDF, PNG, JPG (MAX 5MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      name="file"
                      accept="image/*,application/pdf"
                      onChange={handleChange}
                      required
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg transition-all transform hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed relative"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <FiLoader className="w-5 h-5 text-white animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  "Submit Suggestion"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}