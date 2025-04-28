import { useState } from "react";
import { FaFacebook, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";

import { Link } from "react-router-dom";
import SuccessModal from "./Modal";
const Footer = () => {
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailValue = e.target[0].value;
    setEmail(emailValue);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailValue }),
      });

      if (!response.ok) throw new Error("Subscription failed");
      // setShowModal(true);
      setEmail("");
    } catch (err) {
      console.error(err);
      setShowModal(true);
      e.target[0].value="";
     
    }
  };

  return (
    <>
      <footer className="bg-gray-100 w-full px-6 dark:bg-gray-900 py-10 mt-10 border-t border-gray-200 dark:border-gray-700">
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
                <a href="#"><FaFacebook size={20} className="text-blue-600 dark:text-white" /></a>
                <a href="#"><FaTwitter size={20} className="text-blue-600 dark:text-white" /></a>
                <a href="#"><FaGithub size={20} className="text-slate-800 dark:text-white" /></a>
                <a href="#"><FaLinkedin size={20} className="text-blue-600 dark:text-white" /></a>
              </div>
            </div>

            {/* Email Subscription */}
            <div className="w-full sm:w-96">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-2">
                <BiLogoGmail size={20} className="text-red-600 dark:text-white" /> Stay Updated
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Get notified when new suggestions are uploaded.
              </p>
              <form className="flex gap-2 flex-wrap" onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Your email address"
                  required
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

      {showModal && (
        <SuccessModal
          message={`Thanks for subscribing, ${email}! You'll be the first to know about new suggestions.`}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default Footer;
