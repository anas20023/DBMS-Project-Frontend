import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12 font-sans">
      <div className="text-center relative max-w-lg">
        <h1 className="text-9xl font-extrabold text-blue-600 tracking-widest select-none">
          404
        </h1>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-14 bg-indigo-600 text-white text-sm px-3 py-1 rounded shadow-lg rotate-6">
          Page Not Found
        </div>
        <p className="text-gray-700 text-lg mt-20">
          Sorry, the page you’re looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="mt-8 inline-block px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 transition-all duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
