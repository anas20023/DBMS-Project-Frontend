import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import { Menu, X, User, LogOut, Plus } from 'lucide-react';

const Header = ({ onAuthClick }) => {
  const { state, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-[#1C1C25] shadow-lg sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="bg-blue-600 text-white p-2 rounded-lg">
                CH
              </span>
              <span className="ml-2 text-xl font-semibold text-white">CourseHub</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            {state.isAuthenticated ? (
              <>
                <Button 
                  variant="primary" 
                  size="sm"
                  className="flex items-center"
                >
                  <Plus size={16} className="mr-1" />
                  Share Resource
                </Button>
                
                <div className="relative ml-3">
                  <div className="flex items-center space-x-3">
                    <div className="text-sm font-medium text-white">
                      {state.user?.name}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={logout}
                      className="flex items-center border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <LogOut size={16} className="mr-1" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onAuthClick}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Sign In / Register
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#1C1C25] border-t border-gray-700">
          <div className="pt-2 pb-3 space-y-1">
            {state.isAuthenticated ? (
              <div className="px-4 py-2 space-y-3">
                <div className="flex items-center space-x-3 px-3 py-2 text-base font-medium text-gray-300">
                  <User size={20} className="text-gray-400" />
                  <span>{state.user?.name}</span>
                </div>
                
                <Button 
                  variant="primary" 
                  fullWidth
                  className="flex items-center justify-center"
                >
                  <Plus size={16} className="mr-1" />
                  Share Resource
                </Button>
                
                <Button 
                  variant="outline" 
                  fullWidth
                  onClick={logout}
                  className="flex items-center justify-center border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <LogOut size={16} className="mr-1" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="px-4 py-2">
                <Button 
                  variant="outline" 
                  fullWidth
                  onClick={onAuthClick}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Sign In / Register
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;