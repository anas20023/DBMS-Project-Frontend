import React from 'react';
import { Suggestion } from '../../lib/types';
import { ThumbsUp, MessageCircle, Clock } from 'lucide-react';

interface SuggestionCardProps {
  suggestion: Suggestion;
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({ suggestion }) => {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-blue-100 text-blue-800';
      case 'implemented':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100">
      <div className="p-5">
        {/* Header with category and status */}
        <div className="flex justify-between items-center mb-3">
          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {suggestion.category}
          </span>
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded capitalize ${getStatusColor(suggestion.status)}`}>
            {suggestion.status}
          </span>
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
          {suggestion.title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 mb-4 text-sm line-clamp-2">
          {suggestion.description}
        </p>
        
        {/* Author and date */}
        <div className="flex items-center text-xs text-gray-500 mb-4">
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            <span>{formatDate(suggestion.createdAt)}</span>
          </div>
          <span className="mx-2">•</span>
          <span>By {suggestion.author.name}</span>
        </div>
        
        {/* Interaction stats */}
        <div className="flex items-center justify-between border-t pt-3">
          <div className="flex items-center text-gray-600">
            <ThumbsUp size={16} className="mr-1" />
            <span className="text-sm">{suggestion.votes}</span>
            <span className="mx-3">•</span>
            <MessageCircle size={16} className="mr-1" />
            <span className="text-sm">{suggestion.comments}</span>
          </div>
          
          <div className="text-xs text-gray-500">{suggestion.author.dept} • {suggestion.author.student_Id.substring(6)}</div>
        </div>
      </div>
    </div>
  );
};

export default SuggestionCard;