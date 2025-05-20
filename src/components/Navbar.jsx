import { Link, useNavigate } from "react-router-dom";
import { Sun, Moon, UserCircle, LogOut, UploadCloud, User } from "lucide-react";
import logo from "../assets/logo.png";
import { useEffect, useState, useRef } from "react";

const Navbar = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [student, setStudent] = useState(() => JSON.parse(localStorage.getItem("student_all")));
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  const toggleTheme = () => setTheme(prev => prev === "light" ? "dark" : "light");
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("student_all");
    localStorage.removeItem("student_id");
    setStudent(null);
    setSidebarOpen(false);
    navigate("/");
    // refresh the page to apply changes
    window.location.reload();
  };

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-4 px-4 sm:px-6 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={logo} 
              alt="Logo" 
              className="w-8 h-8 transition-transform group-hover:scale-105" 
            />
            <span className="text-xl hidden md:block font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-teal-300">
              Suggestion Sharing Platform
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon size={20} className="text-gray-700 dark:text-gray-300" />
              ) : (
                <Sun size={20} className="text-gray-700 dark:text-gray-300" />
              )}
            </button>

            {student ? (
              <div className="flex items-center gap-2 lg:gap-3 relative">
                <Link
                  to="/upload"
                  className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-200"
                >
                  <UploadCloud size={18} />
                  <span>Upload</span>
                </Link>

                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="w-9 h-9 cursor-pointer rounded-full bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center hover:shadow-lg"
                  aria-label="User menu"
                >
                  <UserCircle size={22} className="text-white" />
                </button>

                {sidebarOpen && (
                  <div className="fixed inset-0 bg-black/30 dark:bg-white/20 backdrop-blur-sm z-40">
                    <div 
                      ref={sidebarRef}
                      className="absolute top-16 right-4 sm:right-6 w-72 bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800 shadow-xl"
                    >
                      <div className="flex flex-col gap-3">
                        <div className="pb-3 border-b border-gray-100 dark:border-gray-800">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                            {student.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            ID: {student.student_Id}
                          </p>
                        </div>

                        <nav className="flex flex-col gap-1">
                          <Link
                            to="/profile"
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-200"
                            onClick={() => setSidebarOpen(false)}
                          >
                            <User size={18} />
                            Profile
                          </Link>
                          <Link
                            to="/upload"
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-200"
                            onClick={() => setSidebarOpen(false)}
                          >
                            <UploadCloud size={18} />
                            Upload Suggestion
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors mt-2"
                          >
                            <LogOut size={18} />
                            Logout
                          </button>
                        </nav>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-4 py-2 rounded-full hover:shadow-lg flex items-center gap-2 text-sm sm:text-base"
              >
                <User size={16} />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;