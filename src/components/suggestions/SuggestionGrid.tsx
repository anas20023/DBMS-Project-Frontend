import React from 'react';
import { Suggestion } from '../../lib/types';
import SuggestionCard from './SuggestionCard';

interface SuggestionGridProps {
  suggestions: Suggestion[];
  loading?: boolean;
}

const SuggestionGrid: React.FC<SuggestionGridProps> = ({ 
  suggestions, 
  loading = false 
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow-md border border-gray-100 h-52 animate-pulse"
          >
            <div className="p-5 h-full">
              <div className="flex justify-between mb-3">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/5"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-6"></div>
              <div className="flex justify-between pt-3 border-t">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/5"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (suggestions.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-500">
          No suggestions found
        </h3>
        <p className="text-gray-400 mt-2">
          Be the first to share your ideas!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {suggestions.map((suggestion) => (
        <SuggestionCard key={suggestion.id} suggestion={suggestion} />
      ))}
    </div>
  );
};

export default SuggestionGrid;