import React from "react";

const Filters = ({ filters, setFilters, filterOptions }) => (
  <div className="w-full max-w-6xl mx-auto py-6 px-4 bg-slate-100 dark:bg-slate-900 rounded-lg">
    <div className="flex flex-wrap gap-4 justify-center lg:justify-evenly">
      {filterOptions.map(({ label, name, options }) => (
        <div key={name} className="relative inline-block">
          <select
            name={name}
            value={filters[name]}
            onChange={e => setFilters(prev=>({ ...prev, [name]: e.target.value }))}
            className="appearance-none bg-gray-200 dark:bg-slate-700 text-slate-800 dark:text-white px-4 pr-10 py-2 rounded-lg focus:ring-2 focus:ring-sky-500 transition"
          >
            {options.map(opt=> <option key={opt} value={opt}>{opt||label}</option> )}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg className="w-4 h-4 text-slate-700 dark:text-slate-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Filters;