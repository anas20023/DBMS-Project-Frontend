import { Link, useNavigate } from "react-router-dom";
import { Sun, Moon, UserCircle } from "lucide-react";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [student, setStudent] = useState(() => {
    const stored = localStorage.getItem("student_all");
    return stored ? JSON.parse(stored) : null;
  });

  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme); // Save to localStorage
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("student_all");
    setStudent(null);
    setSidebarOpen(false);
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 shadow-md py-5 px-6 sticky top-0 z-50">
        <div className="w-full max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-8 h-8" />
            <span className="text-lg font-bold text-slate-800 dark:text-amber-300 hidden sm:inline">
              Suggestion Sharing Platform
            </span>
          </Link>

          <ul className="flex gap-6 text-sm font-medium text-gray-700 dark:text-gray-300 items-center">
            {/* Theme Toggle */}
            <li onClick={toggleTheme} className="cursor-pointer">
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </li>

            {/* Conditional Auth Buttons */}
            {student ? (
              <li onClick={toggleSidebar} className="cursor-pointer">
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition">
                  <UserCircle size={24} />
                </div>
              </li>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="bg-blue-600 text-white px-4 py-3 rounded hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-700 transition-all duration-300"
                >
                  Login/Signup
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>

      {/* Sidebar Modal */}
      {student && sidebarOpen && (
        <div
          className="fixed top-20 right-20 w-72 bg-slate-100 dark:bg-slate-900 rounded-lg shadow-2xl p-5 z-50"
        >
          <button
            onClick={toggleSidebar}
            className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 cursor-pointer"
          >
            ✖
          </button>

          <div className="mt-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-amber-300 mb-4">
              {student.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-2 text-sm">ID: {student.student_Id}</p>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">Total Stars: {student.stars}</p>

            <div className="flex flex-col gap-3">
              <Link
                to="/profile"
                onClick={() => setSidebarOpen(false)}
                className=" text-slate-900 dark:text-white dark:hover:text-slate-100 hover:text-blue-600"
              >
                Profile
              </Link>
              <Link
                to="/upload"
                onClick={() => setSidebarOpen(false)}
                className=" text-slate-900 dark:text-white dark:hover:text-slate-100 hover:text-blue-600"
              >
                Upload Suggestion
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
