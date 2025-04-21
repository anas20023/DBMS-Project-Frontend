import { Facebook, Twitter, Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 w-full  px-6 dark:bg-gray-900 py-10 mt-10 border-t border-gray-200 dark:border-gray-700">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-10">

          {/* Platform Info */}
          <div>
            <Link to="/" className="text-xl font-bold text-blue-600 dark:text-amber-300">
              Suggestion Sharing Platform – BUBT
            </Link>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 max-w-xs">
              Share. Access. Contribute. Empowering BUBT students for success.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition text-gray-600 dark:text-gray-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition text-gray-600 dark:text-gray-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-gray-800 dark:hover:text-gray-400 transition text-gray-600 dark:text-gray-300">
                <Github size={20} />
              </a>
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition text-gray-600 dark:text-gray-300">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Email Subscription */}
          <div className="w-full sm:w-96">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-2">
              <Mail size={20} /> Stay Updated
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Get notified when new suggestions are uploaded.
            </p>
            <form className="flex gap-2 flex-wrap">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-8 text-sm text-gray-600 dark:text-gray-400 text-center">
          &copy; {new Date().getFullYear()} Suggestion Sharing Platform – BUBT. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
