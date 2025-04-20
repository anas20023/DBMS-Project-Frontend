import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/layout/Header';
import Filters from '../components/layout/Filters';
import CourseGrid from '../components/courses/CourseGrid';
import { sampleCourses } from '../lib/dummyData';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const [courses, setCourses] = useState(sampleCourses);
  const [filteredCourses, setFilteredCourses] = useState(sampleCourses);
  const [isLoading, setIsLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedExamType, setSelectedExamType] = useState('');

  const { state } = useAuth();

  // Filter courses based on search term and filters
  const filterCourses = useCallback(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      let filtered = [...courses];
      
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(
          course => 
            course.name.toLowerCase().includes(term) || 
            course.code.toLowerCase().includes(term) ||
            course.description.toLowerCase().includes(term)
        );
      }
      
      if (selectedDepartment) {
        filtered = filtered.filter(
          course => course.department === selectedDepartment
        );
      }
      
      if (selectedExamType) {
        filtered = filtered.filter(
          course => course.examType === selectedExamType
        );
      }
      
      setFilteredCourses(filtered);
      setIsLoading(false);
    }, 500);
  }, [courses, searchTerm, selectedDepartment, selectedExamType]);

  useEffect(() => {
    filterCourses();
  }, [filterCourses]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle subscription logic here
    alert('Thanks for subscribing!');
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-[#13131A] flex flex-col">
      <Header onAuthClick={() => setShowAuthModal(true)} />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
      
      <footer className="bg-[#1C1C25] mt-auto py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">About Us</h3>
              <p className="text-gray-400">
                Your one-stop platform for accessing and sharing academic resources, 
                making education more collaborative and accessible.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">
                Subscribe to get updates about new resources and features.
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-2 rounded-md bg-[#282833] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} Course Hub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Close</span>
              ×
            </button>
            
            {isLoginView ? (
              <LoginForm onToggleForm={() => setIsLoginView(false)} />
            ) : (
              <RegisterForm onToggleForm={() => setIsLoginView(true)} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;