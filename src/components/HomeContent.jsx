import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Filters from "./Filters";
import SuggestionCard from "./SuggestionCard";
import { useSuggestions } from "../hooks/useSuggestions";

const HomeContent = () => {
  const [loadingVoteId, setLoadingVoteId] = useState(null);
  const navigate = useNavigate();

  const { suggestions, loading, error, filters, setFilters, filterOptions, refetch } = useSuggestions();

  // parse student once
  const student = React.useMemo(() => {
    const stored = localStorage.getItem("student_all");
    return stored ? JSON.parse(stored) : {};
  }, []);
  const studentId = student.student_Id;

  const handleVote = async (suggestionId) => {
    if (!studentId) return navigate("/login");

    const target = suggestions.find((s) => s.id === suggestionId);
    if (target?.voted_state) {
      // already voted, bail
      return;
    }

    setLoadingVoteId(suggestionId);
    try {
      // only add vote
      await axios.post(
        "https://sgm.anasibnbelal.live/api/auth/suggetions/giveVote",
        { student_id: studentId, suggestion_id: suggestionId }
      );
      // pull fresh data so stars & voted_state update
      await refetch();
    } catch (err) {
      console.error("Vote error", err);
    } finally {
      setLoadingVoteId(null);
    }
  };

  return (
    <section className="flex flex-col gap-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          <span className="text-blue-600 dark:text-amber-300">
            Suggestion Sharing
          </span>{" "}
          Platform – BUBT
        </h1>
        <p className="mt-2 text-slate-700 dark:text-slate-300">
          Share. Access. Contribute. Empowering BUBT students for success.
        </p>
      </div>

      {/* Filters */}
      <Filters
        filters={filters}
        setFilters={setFilters}
        filterOptions={filterOptions}
      />

      {/* Suggestions Grid */}
      <div className="w-full max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-2 px-3">
        {loading ? (
          <div className="col-span-full text-center text-slate-500 dark:text-slate-400">
            Loading suggestions...
          </div>
        ) : error ? (
          <div className="col-span-full text-center text-red-600 dark:text-red-400">
            {error} or No Suggestions Found
          </div>
        ) : (
          suggestions.map((sug) => (
            <SuggestionCard
              key={sug.id}
              suggestion={sug}
              onVote={() => handleVote(sug.id)}
              voted={Boolean(sug.voted_state)}   // pass down voted flag
              st_id={studentId}
              loadingVote={loadingVoteId === sug.id}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default HomeContent;
