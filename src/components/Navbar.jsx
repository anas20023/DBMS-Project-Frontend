import { Link, useNavigate } from "react-router-dom";
import { Sun, Moon, UserCircle, LogOut, UploadCloud, User } from "lucide-react";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [student, setStudent] = useState(() => JSON.parse(localStorage.getItem("student_all")));
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === "light" ? "dark" : "light");
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("student_all");
    localStorage.removeItem("student_id");
    setStudent(null);
    setSidebarOpen(false);
    navigate("/");
  };

  return (
    <>
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 py-4 px-6 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={logo} 
              alt="Logo" 
              className="w-9 h-9 transition-transform group-hover:scale-105" 
            />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-teal-300">
              Suggy
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon size={22} className="text-gray-700 dark:text-gray-300" />
              ) : (
                <Sun size={22} className="text-gray-700 dark:text-gray-300" />
              )}
            </button>

            {student ? (
              <div className="relative">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="w-10 h-10 cursor-pointer rounded-full bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center hover:shadow-lg transition-all"
                  aria-label="User menu"
                >
                  <UserCircle size={24} className="text-white" />
                </button>

                {sidebarOpen && (
                  <div className="fixed inset-0 bg-black/20 dark:bg-white/10 backdrop-blur-sm z-40" 
                       onClick={() => setSidebarOpen(false)}>
                    <div className="absolute top-16 right-4 sm:right-6 w-72 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-2xl animate-slide-in">
                      <div className="flex flex-col gap-4">
                        <div className="pb-4 border-b border-gray-100 dark:border-gray-800">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {student.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            ID: {student.student_Id}
                          </p>
                          
                        </div>

                        <nav className="flex flex-col gap-2">
                          <Link
                            to="/profile"
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-200"
                          >
                            <User size={18} />
                            Profile
                          </Link>
                          <Link
                            to="/upload"
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-200"
                          >
                            <UploadCloud size={18} />
                            Upload Suggestion
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors mt-4"
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
                className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-5 py-2.5 rounded-full hover:shadow-lg transition-all flex items-center gap-2"
              >
                <User size={18} />
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