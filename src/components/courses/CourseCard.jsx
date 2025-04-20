import React from 'react';
import { Star, Download } from 'lucide-react';
import Button from '../ui/Button';

const CourseCard = ({ course }) => {
  return (
    <div className="bg-[#1C1C25] rounded-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300 shadow-xl border border-gray-800">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-gray-300 text-lg font-medium">{course.department}</div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-300">{course.examType}</span>
            <div className="flex items-center bg-[#282833] px-2 py-1 rounded">
              <span className="text-gray-300 mr-1">{course.rating}</span>
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
            </div>
            <Button 
              variant="primary" 
              size="sm" 
              className="bg-[#FF6B6B] hover:bg-[#FF5252] text-sm px-3 py-1"
            >
              Vote
            </Button>
          </div>
        </div>

        {/* Course Title */}
        <div className="bg-[#4285F4] text-white text-xl md:text-2xl font-semibold py-3 px-4 rounded-lg mb-4 hover:bg-[#3B78E7] transition-colors">
          {course.name}
        </div>

        {/* Course Code */}
        <div className="text-gray-300 text-lg mb-4 font-medium">{course.code}</div>

        {/* Description */}
        <div className="text-gray-400 mb-6 whitespace-pre-line text-sm md:text-base">
          {course.description}
        </div>

        {/* Attachments */}
        <div className="space-y-3">
          <h3 className="text-gray-300 font-medium">Attachments</h3>
          {course.attachments.map((attachment, index) => (
            <div key={index} className="flex items-center justify-between bg-[#282833] p-3 rounded-lg">
              <span className="text-gray-400 text-sm md:text-base">{attachment.name}</span>
              <Button 
                variant="outline" 
                size="sm"
                className="border-[#FF6B6B] text-[#FF6B6B] hover:bg-[#FF6B6B] hover:text-white text-sm"
              >
                <Download size={14} className="mr-1" />
                Download
              </Button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 flex justify-end space-x-4 text-gray-400 border-t border-gray-800">
          <span className="text-sm">Intake {course.intake}</span>
          <span className="text-sm">Section {course.section}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;