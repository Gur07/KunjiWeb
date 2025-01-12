import React from 'react';
import {
  Home, BookOpen, PiggyBank, MessageSquare, Users, User,
  TrendingUp, ArrowUpRight, ArrowDownRight, Bell,
  CreditCard, DollarSign, Send, Lightbulb, Newspaper
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const DashboardPage = () => {
  const user = {
    name: 'Lakshmi',
    balance: 128320,
    savings: 45600,
    income: 128320,
    expenses: 128320
  };

  const savingsGoals = [
    { name: 'Gaming PC', amount: 309, target: 1200 },
    { name: 'New house', amount: 950, target: 5000 },
    { name: 'Summer trip', amount: 550, target: 1500 },
    { name: 'Wedding', amount: 620, target: 2000 }
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const dailyTip = {
    title: "Today's Financial Tip",
    content: "Consider the 50/30/20 rule: Spend 50% on needs, 30% on wants, and save 20% of your income."
  };

  const newsHighlight = {
    title: "Market Update",
    content: "Global markets show positive trends with tech stocks leading the rally."
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Greeting Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{getGreeting()}, {user.name}!</h1>
          <p className="text-gray-600">Here's your financial overview</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'My Balance', value: user.balance, color: 'text-blue-600', icon: DollarSign, trend: '23.12%', trendColor: 'text-green-500', trendIcon: ArrowUpRight },
            { label: 'Income', value: user.income, color: 'text-green-600', icon: TrendingUp, trend: '11.02%', trendColor: 'text-green-500', trendIcon: ArrowUpRight },
            { label: 'Savings', value: user.savings, color: 'text-yellow-600', icon: PiggyBank, trend: '11.02%', trendColor: 'text-green-500', trendIcon: ArrowUpRight },
            { label: 'Expenses', value: user.expenses, color: 'text-red-600', icon: Send, trend: '23.12%', trendColor: 'text-red-500', trendIcon: ArrowDownRight }
          ].map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-500">{stat.label}</h3>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold">${stat.value.toLocaleString()}</p>
              <span className={`${stat.trendColor} text-sm flex items-center`}>
                <stat.trendIcon className="h-4 w-4 mr-1" /> {stat.trend}
              </span>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Learn', 'Plan', 'Support', 'Opportunities'].map((action) => (
                  <button
                    key={action}
                    className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <BookOpen className="h-6 w-6 text-blue-600 mb-2" />
                    <span className="text-sm font-medium">{action}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tips and News */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[dailyTip, newsHighlight].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    {index === 0 ? (
                      <Lightbulb className="h-5 w-5 text-yellow-500" />
                    ) : (
                      <Newspaper className="h-5 w-5 text-blue-500" />
                    )}
                    <h3 className="font-semibold">{item.title}</h3>
                  </div>
                  <p className="text-gray-600">{item.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Savings Goals */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Savings Goals</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700">View all</button>
            </div>
            <div className="space-y-6">
              {savingsGoals.map((goal) => (
                <div key={goal.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">{goal.name}</span>
                    <span className="font-medium">${goal.amount}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${(goal.amount / goal.target) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
