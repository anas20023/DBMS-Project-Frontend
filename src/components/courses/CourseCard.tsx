import React from 'react';
import { Course } from '../../lib/types';
import { Star, Download } from 'lucide-react';
import Button from '../ui/Button';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="bg-[#1C1C25] rounded-lg overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-gray-300 text-lg">{course.department}</div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-300">{course.examType}</span>
            <div className="flex items-center">
              <span className="text-gray-300 mr-1">{course.rating}</span>
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
            </div>
            <Button variant="primary" size="sm" className="bg-[#FF6B6B] hover:bg-[#FF5252]">
              Vote
            </Button>
          </div>
        </div>

        {/* Course Title */}
        <div className="bg-[#4285F4] text-white text-2xl font-semibold py-2 px-4 rounded-lg mb-4">
          {course.name}
        </div>

        {/* Course Code */}
        <div className="text-gray-300 text-xl mb-4">{course.code}</div>

        {/* Description */}
        <div className="text-gray-400 mb-6 whitespace-pre-line">
          {course.description}
        </div>

        {/* Attachments */}
        <div className="space-y-3">
          <h3 className="text-gray-300">Attachments</h3>
          {course.attachments.map((attachment, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="text-gray-400">{attachment.name}</span>
              <Button 
                variant="outline" 
                size="sm"
                className="border-[#FF6B6B] text-[#FF6B6B] hover:bg-[#FF6B6B] hover:text-white"
              >
                <Download size={16} className="mr-1" />
                Download
              </Button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end space-x-4 text-gray-400">
          <span>Intake {course.intake}</span>
          <span>Section {course.section}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;