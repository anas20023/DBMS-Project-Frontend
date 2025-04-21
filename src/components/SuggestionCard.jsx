import React from "react";

const SuggestionCard = ({ suggestion, onVote, loadingVote, studentId }) => {
  const hasVoted = suggestion.hasVoted; // expecting backend flag
  return (
    <div className="bg-white dark:bg-slate-800 shadow-lg rounded-lg p-4 border border-slate-200 dark:border-slate-700 hover:shadow-xl transform hover:-translate-y-1 transition">
      <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
        {suggestion.course_code} - {suggestion.course_name}
      </h2>
      <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">
        Dept: {suggestion.dept} | Intake: {suggestion.intake} | Section: {suggestion.section}
      </p>
      <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">Exam: {suggestion.exam_type}</p>
      <p className="text-sm italic text-slate-500 dark:text-slate-400 mb-4">"{suggestion.description}"</p>

      <div className="flex justify-between items-center">
        <a href={suggestion.attachment_url} target="_blank" rel="noreferrer" className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition text-sm">
          View PDF
        </a>

        <button
          disabled={loadingVote}
          onClick={() => onVote(suggestion.id)}
          className={`text-sm px-3 py-1 rounded ${hasVoted ? 'bg-green-600' : 'bg-sky-600'} text-white`}
        >
          {hasVoted ? 'Voted' : 'Upvote'}
        </button>

        <span className="text-sm text-slate-500 dark:text-slate-400">
          ⭐ {suggestion.stars}
        </span>
      </div>
    </div>
  );
};

export default SuggestionCard;