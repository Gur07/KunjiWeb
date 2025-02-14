import React from 'react';
import { useTranslation } from 'react-i18next';
import { Star, Users, Clock, BookOpen, User } from 'lucide-react';

const CourseCard = ({ course }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  return (
    <div className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow ${isRTL ? 'rtl' : 'ltr'}`}>
      <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <div className="flex items-center gap-4 mb-2">
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-1" />
            <span>
              {course.students.toLocaleString()} {t('courses.courseInfo.students')}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
            <span>
              {course.rating} {t('courses.courseInfo.rating')}
            </span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {course.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span>
              {course.duration} {t('courses.courseInfo.weeks')}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <BookOpen className="w-4 h-4 mr-2" />
            <span>{course.level}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <User className="w-4 h-4 mr-2" />
            <span>{t('courses.courseInfo.instructor')}: {course.instructor}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              ₹{course.price.toLocaleString()}
            </span>
            {course.originalPrice > course.price && (
              <>
                <span className="text-sm text-gray-500 line-through mx-2">
                  ₹{course.originalPrice.toLocaleString()}
                </span>
                <span className="text-sm text-green-600">
                  {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% {t('courses.courseInfo.off')}
                </span>
              </>
            )}
          </div>
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
          {t('courses.courseInfo.enroll')}
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
