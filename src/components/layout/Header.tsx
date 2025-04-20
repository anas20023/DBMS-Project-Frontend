import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import { Menu, X, User, LogOut, Plus } from 'lucide-react';

interface HeaderProps {
  onOpenCreateModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenCreateModal }) => {
  const { state, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="bg-blue-600 text-white p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2 L22 8.5 L22 15.5 L12 22 L2 15.5 L2 8.5 L12 2" />
                  <path d="M12 22 L12 15.5" />
                  <path d="M22 8.5 L12 15.5 L2 8.5" />
                  <path d="M12 2 L12 8.5 L2 15.5" />
                  <path d="M12 2 L12 8.5 L22 15.5" />
                </svg>
              </span>
              <span className="ml-2 text-xl font-semibold text-gray-900">SuggestHub</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            {state.isAuthenticated ? (
              <>
                <Button 
                  variant="primary" 
                  size="sm"
                  onClick={onOpenCreateModal}
                  className="flex items-center"
                >
                  <Plus size={16} className="mr-1" />
                  New Suggestion
                </Button>
                
                <div className="relative ml-3">
                  <div className="flex items-center space-x-3">
                    <div className="text-sm font-medium text-gray-700">
                      {state.user?.name}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={logout}
                      className="flex items-center"
                    >
                      <LogOut size={16} className="mr-1" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center">
                <Button variant="outline" size="sm" disabled>
                  Sign In / Register
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-200">
          <div className="pt-2 pb-3 space-y-1">
            {state.isAuthenticated ? (
              <div className="px-4 py-2 space-y-3">
                <div className="flex items-center space-x-3 px-3 py-2 text-base font-medium text-gray-700">
                  <User size={20} className="text-gray-500" />
                  <span>{state.user?.name}</span>
                </div>
                
                <Button 
                  variant="primary" 
                  fullWidth
                  onClick={onOpenCreateModal}
                  className="flex items-center justify-center"
                >
                  <Plus size={16} className="mr-1" />
                  New Suggestion
                </Button>
                
                <Button 
                  variant="outline" 
                  fullWidth
                  onClick={logout}
                  className="flex items-center justify-center"
                >
                  <LogOut size={16} className="mr-1" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="px-4 py-2">
                <Button variant="outline" fullWidth disabled>
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