/* eslint-disable no-unused-vars */
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

const SuccessModal = ({ message, onClose }) => {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
        <motion.div
          initial={{ y: -100, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -100, opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl p-8 w-[450px] h-[180px] relative"
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <IoMdClose size={24} />
          </button>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3 text-center">
            {message === "You are already subscribed! Please use another email address." ? " ⚠️Already Subscribed!" : "🔥 Subscription Successful!"}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
            {message}
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SuccessModal;
