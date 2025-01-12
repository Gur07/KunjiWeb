import React from 'react';
import { Star, Users } from 'lucide-react';

const CourseCard = ({
  title,
  description,
  price,
  originalPrice,
  students,
  image,
  rating,
}) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-1" />
            <span>{students.toLocaleString()} students</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>
        <h3 className="font-semibold text-lg mb-1 line-clamp-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold">₹{price}</span>
          {originalPrice > price && (
            <span className="text-gray-500 line-through text-sm">
              ₹{originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
