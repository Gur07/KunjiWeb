import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Laptop, Search } from 'lucide-react';
import CourseCard from './CourseCard';
import { VideoCard } from './VideoCard';
import { videos } from './Data';

const CoursesPage = () => {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('allPrograms');

  const categoryKeys = [
    'allPrograms',
    'investing',
    'personalFinance',
    'financialPlanning',
    'economics',
    'financialAnalysis',
  ];

  const courses = [
    {
      id: 1,
      titleKey: 'courses.courseList.course1.title',
      descriptionKey: 'courses.courseList.course1.description',
      price: 399,
      originalPrice: 599,
      students: 1245,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80',
      categoryKey: 'financialAnalysis',
      duration: '8',
      levelKey: 'beginner',
      instructorKey: 'courses.courseList.course1.instructor'
    },
    {
      id: 2,
      titleKey: 'courses.courseList.course2.title',
      descriptionKey: 'courses.courseList.course2.description',
      price: 499,
      originalPrice: 699,
      students: 2523,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80',
      categoryKey: 'investing',
      duration: '10',
      levelKey: 'intermediate',
      instructorKey: 'courses.courseList.course2.instructor'
    },
    {
      id: 3,
      titleKey: 'courses.courseList.course3.title',
      descriptionKey: 'courses.courseList.course3.description',
      price: 299,
      originalPrice: 499,
      students: 1876,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?auto=format&fit=crop&q=80',
      categoryKey: 'personalFinance',
      duration: '6',
      levelKey: 'beginner',
      instructorKey: 'courses.courseList.course3.instructor'
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = 
      t(course.titleKey).toLowerCase().includes(searchTerm.toLowerCase()) ||
      t(course.descriptionKey).toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'allPrograms' || 
      course.categoryKey === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('courses.title')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('courses.subtitle')}
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('courses.searchPlaceholder')}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-12 overflow-x-auto">
          <div className="inline-flex space-x-2 pb-2 min-w-full md:min-w-0">
            {categoryKeys.map((categoryKey) => (
              <button
                key={categoryKey}
                onClick={() => setSelectedCategory(categoryKey)}
                className={`
                  whitespace-nowrap px-6 py-2 rounded-full text-sm font-medium
                  ${selectedCategory === categoryKey
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                  }
                  transition-colors duration-200
                `}
              >
                {t(`courses.categories.${categoryKey}`)}
              </button>
            ))}
          </div>
        </div>

        {/* personalised tabs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
        <br />
        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={{
                ...course,
                title: t(course.titleKey),
                description: t(course.descriptionKey),
                category: t(`courses.categories.${course.categoryKey}`),
                level: t(`courses.courseInfo.levels.${course.levelKey}`),
                instructor: t(course.instructorKey)
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
