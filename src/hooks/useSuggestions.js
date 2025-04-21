import { useState, useEffect, useMemo } from "react";
import axios from "axios";

const API_URL = "https://sgm.anasibnbelal.live/api/auth/suggetions";

export const useSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [filters, setFilters] = useState({ department: "", course: "", intake: "", section: "", sort: "", examType: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSuggestions = async () => {
    try {
      const res = await axios.get(`${API_URL}/get`);
      const data = res.data || [];
      const cached = localStorage.getItem("suggestions");
      if (!cached || JSON.stringify(JSON.parse(cached)) !== JSON.stringify(data)) {
        setSuggestions(data);
        localStorage.setItem("suggestions", JSON.stringify(data));
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch suggestions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cached = localStorage.getItem("suggestions");
    if (cached) {
      try { setSuggestions(JSON.parse(cached)); } catch {}
      setLoading(false);
    }
    fetchSuggestions();
    const interval = setInterval(fetchSuggestions, 60000);
    return () => clearInterval(interval);
  }, []);

  // Dynamic filter options
  const depts = useMemo(() => [...new Set(suggestions.map(s => s.dept))], [suggestions]);
  const courses = useMemo(() => [...new Set(suggestions.map(s => s.course_code))], [suggestions]);
  const intakes = useMemo(() => [...new Set(suggestions.map(s => s.intake))], [suggestions]);
  const sections = useMemo(() => [...new Set(suggestions.map(s => s.section))], [suggestions]);
  const examTypes = useMemo(() => [...new Set(suggestions.map(s => s.exam_type))], [suggestions]);

  const filterOptions = useMemo(() => [
    { label: "All Departments", name: "department", options: ["", ...depts] },
    { label: "All Courses",     name: "course",     options: ["", ...courses] },
    { label: "All Intakes",     name: "intake",     options: ["", ...intakes] },
    { label: "All Sections",    name: "section",    options: ["", ...sections] },
    { label: "Sort By",         name: "sort",       options: ["", "Newest", "Oldest", "Most Stars"] },
    { label: "Exam Type",       name: "examType",   options: ["", ...examTypes] },
  ], [depts, courses, intakes, sections, examTypes]);

  // Filter + sort
  const filtered = useMemo(() =>
    suggestions.filter(s =>
      (!filters.department || s.dept === filters.department) &&
      (!filters.course     || s.course_code === filters.course)     &&
      (!filters.intake     || s.intake === filters.intake)         &&
      (!filters.section    || s.section === filters.section)       &&
      (!filters.examType   || s.exam_type === filters.examType)
    )
  , [suggestions, filters]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (filters.sort) {
      case "Newest":     return arr.sort((a,b)=>new Date(b.created_at)-new Date(a.created_at));
      case "Oldest":     return arr.sort((a,b)=>new Date(a.created_at)-new Date(b.created_at));
      case "Most Stars": return arr.sort((a,b)=>b.stars - a.stars);
      default:            return arr;
    }
  }, [filtered, filters.sort]);

  return { suggestions: sorted, filters, setFilters, loading, error, filterOptions, refetch: fetchSuggestions };
};