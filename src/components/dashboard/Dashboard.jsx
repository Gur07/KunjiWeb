import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Home, BookOpen, PiggyBank, MessageSquare, Users, User,
  TrendingUp, ArrowUpRight, ArrowDownRight, Bell,
  Send, Lightbulb, Newspaper
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const DashboardPage = () => {
  const { t, i18n } = useTranslation();
  
  console.log("Current language:", i18n.language);
  console.log("Available languages:", i18n.languages);
  console.log("Translation test:", {
    morning: t('dashboard.welcome.morning'),
    balance: t('dashboard.balance'),
    savingsGoals: t('dashboard.savingsGoals')
  });

  const user = {
    name: 'Lakshmi',
    balance: 128320,
    savings: 45600,
    income: 128320,
    expenses: 128320
  };

  const savingsGoals = [
    { name: t('dashboard.savingsGoal1'), amount: 20000, target: 50000 },
    { name: t('dashboard.savingsGoal2'), amount: 30000, target: 75000 },
    { name: t('dashboard.savingsGoal3'), amount: 15000, target: 50000 },
    { name: t('dashboard.savingsGoal4'), amount: 10000, target: 40000 }
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('dashboard.welcome.morning');
    if (hour < 18) return t('dashboard.welcome.afternoon');
    return t('dashboard.welcome.evening');
  };
  console.log("First"+t('dashboard.welcome.morning'));
 console.log( "Second"+t('dashboard.balance'));
  const dailyTip = {
    title: t('dashboard.financialTip'),
    content: t('dashboard.tipContent')
  };

  const newsHighlight = {
    title: t('dashboard.marketUpdate'),
    content: t('dashboard.marketContent')
  };

  const quickActions = [
    { name: t('dashboard.actions.learn'), icon: BookOpen },
    { name: t('dashboard.actions.budget'), icon: PiggyBank },
    { name: t('dashboard.actions.loans'), icon: TrendingUp },
    { name: t('dashboard.actions.insurance'), icon: Bell }
  ];

  const stats = [
    { 
      label: t('dashboard.balance'), 
      value: user.balance, 
      color: 'text-blue-600', 
      trend: '15.5%', 
      trendColor: 'text-green-500', 
      trendIcon: ArrowUpRight,
      trendType: 'up'
    },
    { 
      label: t('dashboard.income'), 
      value: user.income, 
      color: 'text-green-600', 
      trend: '10.2%', 
      trendColor: 'text-green-500', 
      trendIcon: ArrowUpRight,
      trendType: 'up'
    },
    { 
      label: t('dashboard.savings'), 
      value: user.savings, 
      color: 'text-yellow-600', 
      trend: '8.1%', 
      trendColor: 'text-green-500', 
      trendIcon: ArrowUpRight,
      trendType: 'up'
    },
    { 
      label: t('dashboard.expenses'), 
      value: user.expenses, 
      color: 'text-red-600', 
      trend: '5.2%', 
      trendColor: 'text-red-500', 
      trendIcon: ArrowDownRight,
      trendType: 'down'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Greeting Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{getGreeting()}, {user.name}!</h1>
          <p className="text-gray-600">{t('dashboard.subtitle')}</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-500">{stat.label}</h3>
                <span className={`text-2xl ${stat.color}`}>₹</span>
              </div>
              <p className="text-2xl font-bold">₹{stat.value.toLocaleString()}</p>
              <span className={`${stat.trendColor} text-sm flex items-center`}>
                <stat.trendIcon className="h-4 w-4 mr-1" />
                {t(`dashboard.stats.trend.${stat.trendType}`)} {stat.trend}
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
              <h2 className="text-lg font-semibold mb-4">{t('dashboard.quickActions')}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action) => (
                  <button
                    key={action.name}
                    className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <action.icon className="h-6 w-6 text-blue-600 mb-2" />
                    <span className="text-sm font-medium">{action.name}</span>
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
              <h2 className="text-lg font-semibold">{t('dashboard.savingsGoals')}</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700">{t('dashboard.viewAll')}</button>
            </div>
            <div className="space-y-6">
              {savingsGoals.map((goal) => (
                <div key={goal.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">{goal.name}</span>
                    <span className="font-medium">₹{goal.amount}</span>
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
