import React, { useState } from 'react';
import { Laptop, Search } from 'lucide-react';
import CourseCard from './CourseCard';

const categories = [
  'All Programs',
  'Investing',
  'Personal Finance',
  'Financial Planning',
  'Economics',
  'Financial Analysis',
];

const sampleCourses = [
  {
    id: 1,
    title: 'Financial Analysis Fundamentals',
    description:
      'Learn the basics of financial analysis and start making data-driven financial decisions.',
    price: 399,
    originalPrice: 599,
    students: 1245,
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80',
    category: 'Financial Analysis',
  },
  {
    id: 2,
    title: 'Investing in the Stock Market',
    description:
      'Master the fundamentals of stock market investing and build a strong portfolio.',
    price: 499,
    originalPrice: 699,
    students: 2523,
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80',
    category: 'Investing',
  },
  {
    id: 3,
    title: 'Personal Finance Management',
    description:
      'Gain control over your finances and learn how to save, invest, and plan for your future.',
    price: 199,
    originalPrice: 299,
    students: 3242,
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80',
    category: 'Personal Finance',
  },
  {
    id: 4,
    title: 'Economics 101: Understanding the Basics',
    description:
      'Get a solid introduction to economics and understand key principles in finance and business.',
    price: 299,
    originalPrice: 499,
    students: 2845,
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80',
    category: 'Economics',
  },
];

const CoursesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Programs');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = sampleCourses.filter((course) => {
    const matchesCategory =
      selectedCategory === 'All Programs' || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {/* <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 text-xl font-semibold">
           
            
          </div>
        </div> */}

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search for financial courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black/5 focus:border-black transition-colors"
          />
        </div>

        {/* Popular Courses Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Popular Financial Courses</h2>

          {/* Categories */}
          <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-black text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                title={course.title}
                description={course.description}
                price={course.price}
                originalPrice={course.originalPrice}
                students={course.students}
                image={course.image}
                rating={course.rating}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
