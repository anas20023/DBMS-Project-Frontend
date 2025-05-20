import Navbar from "./Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import avatari from "../assets/avatar.png";
import Loader from "./Loader";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    student_id: "",
    email: "",
    dept: "",
    intake: "",
    section: "",
    stars: 0,
  });
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("student_id");
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "https://sgm.anasibnbelal.live/api/auth/profile",
          { params: { id } }
        );
        const data = res.data;
        if (data.rows && data.rows.length) {
          const p = data.rows[0];
          setUser({
            name: p.name,
            student_id: p.student_Id,
            email: p.email,
            dept: p.dept,
            intake: p.intake,
            section: p.section,
            stars: data.sugs.reduce((sum, s) => sum + (s.stars || 0), 0),
          });
        }
        if (data.sugs) setSuggestions(data.sugs);
      } catch (err) {
        console.error("Failed loading profile", err);
        setError("Could not load profile data.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex flex-col items-center px-4 py-10">
        {loading ? (
          <Loader />
        ) : error ? (
          <div className="max-w-2xl w-full p-6 bg-red-50 dark:bg-red-900/20 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="font-medium">{error}</p>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-6xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 transition-all duration-300">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* User Profile Section */}
              <div className="lg:col-span-1 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-900 p-6 rounded-2xl shadow-inner">
                <div className="flex flex-col items-center">
                  <div className="relative group">
                    <img
                      src={avatari}
                      alt="Avatar"
                      className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-800 shadow-lg transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 rounded-full ring-4 ring-blue-200/50 dark:ring-slate-600/30 pointer-events-none" />
                  </div>

                  <h2 className="mt-6 text-2xl font-bold text-slate-800 dark:text-white text-center">
                    {user.name}
                    <span className="block text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
                      {user.student_id}
                    </span>
                  </h2>

                  <div className="w-full mt-6 space-y-3">
                    <div className="flex items-center p-3 bg-white dark:bg-slate-700/50 rounded-lg shadow-sm">
                      <svg className="w-5 h-5 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="ml-2 text-sm text-slate-600 dark:text-slate-300 truncate">{user.email}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-white dark:bg-slate-700/50 rounded-lg shadow-sm">
                        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">DEPARTMENT</p>
                        <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">{user.dept}</p>
                      </div>
                      <div className="p-3 bg-white dark:bg-slate-700/50 rounded-lg shadow-sm">
                        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">INTAKE</p>
                        <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">{user.intake}</p>
                      </div>
                      <div className="p-3 bg-white dark:bg-slate-700/50 rounded-lg shadow-sm">
                        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">SECTION</p>
                        <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">{user.section}</p>
                      </div>
                      <div className="p-3 bg-white dark:bg-slate-700/50 rounded-lg shadow-sm">
                        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">STARS</p>
                        <div className="flex items-center mt-1">
                          <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="ml-1 text-sm font-medium text-slate-700 dark:text-slate-200">{user.stars}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Suggestions Section */}
              <div className="lg:col-span-2 bg-slate-50 dark:bg-slate-900/30 p-6 rounded-2xl shadow-inner">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center">
                  <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  Your Suggestions
                </h3>

                <div className="space-y-4">
                  {suggestions.length > 0 ? (
                    suggestions.map((s, i) => (
                      <div key={i} className="group bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-blue-600 dark:text-blue-400">
                              {s.course_code} - {s.course_name}
                            </h4>
                            {/* Bg will be red if the exam_type is final otherwise blue */}
                            <span className={`text-xs font-semibold text-slate-500 dark:text-slate-400 ${s.exam_type === "Midterm" ? "bg-red-500 text-white" : "bg-blue-600 text-white"} px-2 py-1 rounded-full`}>
                              {s.exam_type}
                            </span>
                          </div>
                          <div className="flex items-center ml-2">
                            <span className="text-sm font-medium text-amber-500">⭐ {s.stars}</span>
                          </div>
                        </div>

                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {s.description}
                        </p>

                        {s.attachment_url && (
                          <a
                            href={s.attachment_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center mt-4 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            View Attachment
                          </a>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <div className="inline-block p-4 bg-slate-100 dark:bg-slate-700 rounded-full mb-4">
                        <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400">No suggestions submitted yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Profile;