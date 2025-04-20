import React from 'react';
import { Search } from 'lucide-react';

const Filters = ({
  searchTerm,
  setSearchTerm,
  selectedDepartment,
  setSelectedDepartment,
  selectedExamType,
  setSelectedExamType
}) => {
  const departments = ['All', 'CSE', 'EEE', 'BBA', 'English'];
  const examTypes = ['All', 'Final Exam', 'Mid Term', 'Quiz', 'Assignment'];

  return (
    <div className="bg-[#1C1C25] rounded-lg p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full bg-[#282833] border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-300"
          />
        </div>

        {/* Department Filter */}
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-300 mb-1">
            Department
          </label>
          <select
            id="department"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="w-full bg-[#282833] border border-gray-700 rounded-md py-2 pl-3 pr-10 text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            {departments.map((department) => (
              <option key={department} value={department === 'All' ? '' : department}>
                {department}
              </option>
            ))}
          </select>
        </div>

        {/* Exam Type Filter */}
        <div>
          <label htmlFor="examType" className="block text-sm font-medium text-gray-300 mb-1">
            Exam Type
          </label>
          <select
            id="examType"
            value={selectedExamType}
            onChange={(e) => setSelectedExamType(e.target.value)}
            className="w-full bg-[#282833] border border-gray-700 rounded-md py-2 pl-3 pr-10 text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            {examTypes.map((type) => (
              <option key={type} value={type === 'All' ? '' : type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;