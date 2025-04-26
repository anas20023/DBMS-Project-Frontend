import React from "react";
import { FaStar, FaDownload, FaPaperclip } from "react-icons/fa";

const SuggestionCard = ({ suggestion, onVote, loadingVote }) => {
  let hasVoted = suggestion.uploaded_by;
  if(!localStorage.getItem("student_all")){
    hasVoted=false;
  }
  let attachmnent_name = suggestion.course_name.toLowerCase().replace(/\s+/g, "_");
  //console.log(suggestion)
  //if(localStorage.getItem("student_all"))
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">CSE</div>
        <div className="flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300">
          Final Exam
          <span className="ml-2 flex items-center gap-1 text-yellow-400">
            {suggestion.stars}
            <FaStar className="inline" />
          </span>
          <button
            onClick={() => onVote(suggestion.id)}
            disabled={loadingVote}
            className={`ml-2 px-2 py-1 rounded text-xs font-semibold cursor-pointer ${
              hasVoted ? "bg-green-600" : "bg-rose-500"
            } text-white`}
          >
            {hasVoted ? "Voted" : "Vote"}
          </button>
        </div>
      </div>

      {/* Course Title */}
      <h2 className="text-lg bg-blue-600 sm:text-xl font-bold text-white dark:text-white my-2 px-4 py-1 rounded">
        {suggestion.course_name}
      </h2>
      <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">{suggestion.course_code}</div>

      {/* Description */}
      <div className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line mb-4">
        {suggestion.description}
      </div>

      {/* Attachments */}
      <div className="mb-4">
        <div className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Attachments</div>
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-300 text-sm">
          <FaPaperclip />
          <span className="truncate max-w-[200px]">{`${attachmnent_name}.${suggestion.attachment_url.substr(-3)}`}</span>
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
