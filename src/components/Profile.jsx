import Navbar from "./Navbar";

const Profile = () => {
  const user = {
    name: "John Doe",
    student_id: "CSE210301",
    dept: "CSE",
    intake: "47",
    section: "A",
    stars: 12,
    avatar: "https://ui-avatars.com/api/?name=Anas+Doe&background=random"
  };

  return (
    <>
      <Navbar />
      <section className="h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-6 sm:p-10 transition-all duration-300">
          {/* Avatar & Name */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover shadow-md border-4 border-slate-300 dark:border-slate-700"
            />
            <div className="text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white">
                {user.name}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
                Student ID: {user.student_id}
              </p>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 text-sm sm:text-base text-slate-700 dark:text-slate-200">
            <div>
              <span className="font-semibold">Department:</span> {user.dept}
            </div>
            <div>
              <span className="font-semibold">Intake:</span> {user.intake}
            </div>
            <div>
              <span className="font-semibold">Section:</span> {user.section}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Stars:</span>
              <span className="inline-flex items-center gap-1 bg-yellow-400 text-white px-3 py-1 rounded-full font-bold shadow">
                ⭐ {user.stars}
              </span>
            </div>
          </div>

          {/* Button */}
          <div className="mt-10 flex justify-center sm:justify-end">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full transition duration-300 shadow-md dark:bg-blue-500 dark:hover:bg-blue-600">
              Edit Profile
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
