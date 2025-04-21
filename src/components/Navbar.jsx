import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react"; 
import logo from "../assets/logo.png"
import { useEffect, useState } from "react";

const Navbar = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md py-5 px-6 sticky top-0 z-50">
      <div className="w-full max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-8 h-8" />
          <span className="text-lg font-bold text-slate-800 dark:text-amber-300 hidden sm:inline">Suggestion Sharing Platform</span>
        </Link>

        <ul className="flex gap-6 text-sm font-medium text-gray-700 dark:text-gray-300">
          {/* Theme Toggle */}
          <li onClick={toggleTheme} className="cursor-pointer transition text-gray-700 dark:text-amber-300">
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </li>

          {/* Login/Signup Button */}
          <li>
            <Link 
              to="/login" 
              className="bg-blue-600 text-white px-4 py-3 rounded hover:bg-blue-700 active:border-blue-600 transition-all duration-300 dark:bg-blue-800 dark:hover:bg-blue-700 dark:text-gray-100 dark:active:border-blue-400"
            >
              Login/Signup
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
