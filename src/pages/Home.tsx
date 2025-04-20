import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/layout/Header';
import Filters from '../components/layout/Filters';
import CourseGrid from '../components/courses/CourseGrid';
import { Course } from '../lib/types';
import { sampleCourses } from '../lib/dummyData';

const Home: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(sampleCourses);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(sampleCourses);
  const [isLoading, setIsLoading] = useState(false);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedExamType, setSelectedExamType] = useState('');

  // Filter courses based on search term and filters
  const filterCourses = useCallback(() => {
    setIsLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      let filtered = [...courses];
      
      // Filter by search term
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(
          course => 
            course.name.toLowerCase().includes(term) || 
            course.code.toLowerCase().includes(term) ||
            course.description.toLowerCase().includes(term)
        );
      }
      
      // Filter by department
      if (selectedDepartment) {
        filtered = filtered.filter(
          course => course.department === selectedDepartment
        );
      }
      
      // Filter by exam type
      if (selectedExamType) {
        filtered = filtered.filter(
          course => course.examType === selectedExamType
        );
      }
      
      setFilteredCourses(filtered);
      setIsLoading(false);
    }, 500);
  }, [courses, searchTerm, selectedDepartment, selectedExamType]);

  // Apply filters when filter criteria change
  useEffect(() => {
    filterCourses();
  }, [filterCourses]);

  return (
    <div className="min-h-screen bg-[#13131A]">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Course Materials</h1>
          <p className="mt-2 text-gray-400">
            Browse and access course materials, exam papers, and resources
          </p>
        </div>
        
        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedDepartment={selectedDepartment}
          setSelectedDepartment={setSelectedDepartment}
          selectedExamType={selectedExamType}
          setSelectedExamType={setSelectedExamType}
        />
        
        <CourseGrid 
          courses={filteredCourses} 
          loading={isLoading} 
        />
      </main>
      
      <footer className="bg-[#1C1C25] mt-12 py-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Course Hub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;