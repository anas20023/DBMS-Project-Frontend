import Navbar from "./Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import avatari from "../assets/avatar.png";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    student_id: "",
    email: "",
    dept: "",
    intake: "",
    section: "",
    stars: 0,
  });
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "https://sgm.anasibnbelal.live/api/auth/profile",
          { params: { id: "20234103372" } }
        );
        // Response shape: { rows: [{...}], sugs: [...] }
        const data = res.data;
        if (data.rows && data.rows.length) {
          const p = data.rows[0];
          setUser({
            name: p.name,
            student_id: p.student_Id,
            email: p.email,
            dept: p.dept,
            intake: p.intake,
            section: p.section,
            stars: data.sugs.reduce((sum, s) => sum + (s.stars || 0), 0),
          });
        }
        if (data.sugs) setSuggestions(data.sugs);
      } catch (err) {
        console.error("Failed loading profile", err);
        setError("Could not load profile data.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <p className="p-4 text-center">Loading...</p>;
  if (error) return <p className="p-4 text-red-500 text-center">{error}</p>;

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-slate-100 dark:bg-slate-900 flex flex-col items-center px-4 py-10">
        <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-6 sm:p-10 transition-all duration-300">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <img
              src={avatari}
              alt="Avatar"
              className="w-24 h-24 rounded-full border-4 border-slate-300 dark:border-slate-700"
            />
            <div className="text-center sm:text-left">
              <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white">
                {user.name}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                ID: {user.student_id} | Email: {user.email}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6 text-sm text-slate-700 dark:text-slate-200">
            <div><span className="font-semibold">Dept:</span> {user.dept}</div>
            <div><span className="font-semibold">Intake:</span> {user.intake}</div>
            <div><span className="font-semibold">Section:</span> {user.section}</div>
            <div><span className="font-semibold">Total Stars:</span> {user.stars}</div>
          </div>

          <h3 className="mt-8 text-xl font-semibold text-slate-800 dark:text-white">Your Suggestions</h3>
          {suggestions.length ? (
            <ul className="mt-4 space-y-4">
              {suggestions.map((s, i) => (
                <li key={i} className="p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-bold">{s.course_code} - {s.course_name}</p>
                      <p className="text-sm">Type: {s.exam_type}</p>
                    </div>
                    <span className="font-semibold">⭐ {s.stars}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{s.description}</p>
                  <a
                    href={s.attachment_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-blue-600 hover:underline"
                  >
                    View Attachment
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-slate-500">No suggestions yet.</p>
          )}

          <div className="mt-8 text-right">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
              Edit Profile
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
