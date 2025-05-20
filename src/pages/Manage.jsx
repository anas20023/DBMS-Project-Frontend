/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Edit2, Trash2, Search, X, Filter } from "lucide-react";

const Manage = () => {
    const [users, setUsers] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [filters, setFilters] = useState({
        dept: "",
        intake: "",
        section: ""
    });

    // Modal states
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const [editForm, setEditForm] = useState({
        name: "",
        email: "",
        student_Id: "",
        intake: "",
        dept: "",
        section: ""
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        filterUsers();
    }, [search, users, filters]);

    const filterUsers = () => {
        let result = users.filter(u => {
            const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
                u.student_Id.includes(search);

            const matchesDept = filters.dept ? u.dept === filters.dept : true;
            const matchesIntake = filters.intake ? u.intake === filters.intake : true;
            const matchesSection = filters.section ? u.section === filters.section : true;

            return matchesSearch && matchesDept && matchesIntake && matchesSection;
        });
        setFiltered(result);
    };

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await fetch("https://sgm.anasibnbelal.live/api/auth/manage/getallusers");
            if (!res.ok) throw new Error("Failed to load users");
            const data = await res.json();
            console.log(data);
            setUsers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedUserId) return;

        setIsDeleting(true);
        try {
            const res = await fetch(
                "https://sgm.anasibnbelal.live/api/auth/manage/deleteuser",
                {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ student_id: selectedUserId })
                }
            );

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Delete failed");

            toast.success("User deleted successfully");
            fetchUsers();
        } catch (err) {
            toast.error(err.message || "Failed to delete user");
        } finally {
            setIsDeleting(false);
            setShowDeleteModal(false);
            setSelectedUserId(null);
        }
    };

    const handleUpdateClick = (user) => {
        setSelectedUser(user);
        setEditForm(user);
        setShowModal(true);
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setIsUpdating(true);
        try {
            const res = await fetch(
                "https://sgm.anasibnbelal.live/api/auth/manage/updateuser",
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        student_id: selectedUser.student_Id,
                        ...editForm
                    })
                }
            );

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Update failed");

            toast.success("User updated successfully");
            setShowModal(false);
            fetchUsers();
        } catch (err) {
            toast.error(err.message || "Failed to update user");
        } finally {
            setIsUpdating(false);
        }
    };

    const FilterInput = ({ label, name, options }) => (
        <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {label}
            </label>
            <select
                name={name}
                value={filters[name]}
                onChange={(e) => setFilters({ ...filters, [name]: e.target.value })}
                className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">All</option>
                {[...new Set(users.map(u => u[name]))].map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
        </div>
    );
    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin";
    };

    return (
        <section className="min-h-screen p-4 md:p-6 bg-gray-50 dark:bg-gray-900 transition-colors">
            <div className="max-w-7xl mx-auto">
                <header className="mb-6 space-y-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                                Manage Users
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Administer registered student accounts
                            </p>
                        </div>
                        <div>
                            <button onClick={handleLogout} className="bg-blue-600 font-medium cursor-pointer hover:bg-blue-500 text-white rounded-full px-4 py-2">Logout</button>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 items-stretch">
                        <div className="w-full md:flex-1 md:max-w-[400px] pt-5">
                            <div className="relative h-full">
                                <input
                                    type="text"
                                    placeholder="Search by name or ID..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 h-full"
                                />
                                <Search
                                    size={18}
                                    className="absolute left-3 top-3/7 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                                />
                            </div>
                        </div>

                        <div className="w-full md:flex-1">
                            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2 h-full">
                                <FilterInput label="Department" name="dept" />
                                <FilterInput label="Intake" name="intake" />
                                <FilterInput label="Section" name="section" />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                    <div className="overflow-x-auto">
                        <table className="w-full hidden md:table">
                            <thead className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800">
                                <tr>
                                    {["Name", "Student ID", "Email", "Intake", "Dept", "Section", "Actions"].map((th) => (
                                        <th
                                            key={th}
                                            className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 tracking-wide"
                                        >
                                            {th}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {filtered.map((u) => (
                                    <tr
                                        key={u.student_Id}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-700/20 transition-colors duration-150"
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">{u.name}</td>
                                        <td className="px-6 py-4 font-mono text-indigo-600 dark:text-indigo-400">{u.student_Id}</td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300 truncate max-w-[200px]">{u.email}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-sm">
                                                {u.intake}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{u.dept}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 text-sm">
                                                {u.section}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex space-x-3">
                                                <button
                                                    onClick={() => handleUpdateClick(u)}
                                                    className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 transition-all duration-200 hover:scale-105"
                                                >
                                                    <Edit2 size={18} strokeWidth={2} />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setSelectedUserId(u.student_Id);
                                                        setShowDeleteModal(true);
                                                    }}
                                                    className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-all duration-200 hover:scale-105"
                                                >
                                                    <Trash2 size={18} strokeWidth={2} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="md:hidden space-y-3 p-3">
                            {filtered.map((u) => (
                                <div
                                    key={u.student_Id}
                                    className="group bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 dark:border-gray-700"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{u.name}</h3>
                                            <p className="font-mono text-sm text-indigo-600 dark:text-indigo-400 mt-1">{u.student_Id}</p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleUpdateClick(u)}
                                                className="p-1.5 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-200"
                                            >
                                                <Edit2 size={18} className="text-blue-600 dark:text-blue-400" />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSelectedUserId(u.student_Id);
                                                    setShowDeleteModal(true);
                                                }}
                                                className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors duration-200"
                                            >
                                                <Trash2 size={18} className="text-red-600 dark:text-red-400" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-3 space-y-2">
                                        <p className="text-sm text-gray-600 dark:text-gray-300 break-all">{u.email}</p>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-2.5 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium">
                                                {u.intake}
                                            </span>
                                            <span className="px-2.5 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 rounded-full text-xs font-medium">
                                                {u.dept}
                                            </span>
                                            <span className="px-2.5 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-full text-xs font-medium">
                                                {u.section}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Edit Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md p-6 shadow-2xl border border-gray-100 dark:border-gray-700">
                            <div className="flex justify-between items-center mb-5">
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Edit User</h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
                                    disabled={isUpdating}
                                >
                                    <X size={24} className="text-gray-500 dark:text-gray-400" />
                                </button>
                            </div>
                            <form onSubmit={handleUpdateSubmit} className="space-y-5">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Name</label>
                                        <input
                                            type="text"
                                            value={editForm.name}
                                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Email</label>
                                        <input
                                            type="email"
                                            value={editForm.email}
                                            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                            className="w-full px-3 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Department</label>
                                            <input
                                                type="text"
                                                value={editForm.dept}
                                                onChange={(e) => setEditForm({ ...editForm, dept: e.target.value })}
                                                className="w-full px-3 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Intake</label>
                                            <input
                                                type="text"
                                                value={editForm.intake}
                                                onChange={(e) => setEditForm({ ...editForm, intake: e.target.value })}
                                                className="w-full px-3 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isUpdating}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl transition-all duration-200 font-medium hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {isUpdating ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Updating...
                                        </>
                                    ) : "Update User"}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md p-6 shadow-2xl border border-gray-100 dark:border-gray-700">
                            <div className="flex justify-between items-center mb-5">
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Confirm Delete</h2>
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
                                    disabled={isDeleting}
                                >
                                    <X size={24} className="text-gray-500 dark:text-gray-400" />
                                </button>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                Are you sure you want to delete this user? This action cannot be undone.
                            </p>
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
                                    disabled={isDeleting}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {isDeleting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Deleting...
                                        </>
                                    ) : "Confirm Delete"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Manage;