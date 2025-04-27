import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaStar, FaDownload, FaPaperclip } from "react-icons/fa";

const SuggestionCard = ({ suggestion, onVote, loadingVote, st_id }) => {
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const studentAll = localStorage.getItem("student_all");
    if (!studentAll) {
      setHasVoted(false);
      return;
    }

    const checkVote = async () => {
      try {
        const res = await axios.post(
          "https://sgm.anasibnbelal.live/api/auth/suggetions/checkVote",
          {
            student_id: st_id,
            suggestion_id: suggestion.id,
          }
        );
        setHasVoted(res.data.voted);
      } catch (err) {
        console.error("Vote-check failed", err);
        setHasVoted(false);
      }
    };

    checkVote();
  }, [st_id, suggestion.id]);

  const handleVote = async () => {

    await onVote(suggestion.id);
    // Optimistically disable the button
    setHasVoted(true);
  };

  const attachName = suggestion.course_name
    .toLowerCase()
    .replace(/\s+/g, "_");
  const ext = suggestion.attachment_url.slice(-3);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">
          CSE
        </div>
        <div className="flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300">
          <span className="text-white bg-orange-600 px-2 py-1 rounded">
            {suggestion.exam_type}
          </span>
          <span className="ml-2 flex items-center gap-1 text-yellow-400">
            {suggestion.stars}
            <FaStar className="inline" />
          </span>
          <button
            onClick={handleVote}
            disabled={loadingVote || hasVoted}
            className={`ml-2 px-2 py-1 rounded text-xs font-semibold ${
              hasVoted
                ? "bg-green-600 cursor-not-allowed"
                : "bg-rose-500 hover:bg-rose-600"
            } text-white`}
          >
            {hasVoted ? "Voted" : "Vote"}
          </button>
        </div>
      </div>

      {/* Course Title */}
      <h2 className="text-lg sm:text-xl font-bold text-white bg-blue-600 my-2 px-4 py-1 rounded">
        {suggestion.course_name}
      </h2>
      <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">
        {suggestion.course_code}
      </div>

      {/* Description */}
      <div className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line mb-4">
        {suggestion.description}
      </div>

      {/* Attachments */}
      <div className="mb-4">
        <div className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
          Attachments
        </div>
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-300 text-sm">
          <FaPaperclip />
          <span className="truncate max-w-[200px]">
            {attachName}.{ext}
          </span>
          <a
            href={suggestion.attachment_url}
            target="_blank"
            rel="noreferrer"
            className="ml-auto bg-rose-500 hover:bg-rose-600 text-white px-3 py-1 rounded text-xs flex items-center gap-1"
          >
            <FaDownload />
            Download
          </a>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex justify-end text-sm text-slate-500 dark:text-slate-400">
        <span>Intake {suggestion.intake}</span>
        <span className="mx-2">|</span>
        <span>Section {suggestion.section}</span>
      </div>
    </div>
  );
};

export default SuggestionCard;
