import React from 'react';
import CourseCard from './CourseCard';

const CourseGrid = ({ courses, loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(4)].map((_, index) => (
          <div 
            key={index} 
            className="bg-[#1C1C25] rounded-lg h-96 animate-pulse"
          >
            <div className="p-6 h-full">
              <div className="flex justify-between mb-4">
                <div className="h-6 bg-gray-700 rounded w-1/4"></div>
                <div className="h-6 bg-gray-700 rounded w-1/3"></div>
              </div>
              <div className="h-10 bg-blue-600 rounded-lg mb-4"></div>
              <div className="h-6 bg-gray-700 rounded w-1/4 mb-4"></div>
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                <div className="h-4 bg-gray-700 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-300">
          No courses found
        </h3>
        <p className="text-gray-400 mt-2">
          Try adjusting your filters
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

export default CourseGrid;