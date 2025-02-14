import React from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, Users, Target, Award } from 'lucide-react';

const opportunities = [
  {
    id: 1,
    icon: <TrendingUp className="h-6 w-6" />,
    title: 'opportunity.stockMarket',
    description: 'opportunity.stockMarketDesc',
    link: '/courses/stock-market',
  },
  {
    id: 2,
    icon: <Users className="h-6 w-6" />,
    title: 'opportunity.mutualFunds',
    description: 'opportunity.mutualFundsDesc',
    link: '/courses/mutual-funds',
  },
  {
    id: 3,
    icon: <Target className="h-6 w-6" />,
    title: 'opportunity.fixedDeposits',
    description: 'opportunity.fixedDepositsDesc',
    link: '/courses/fixed-deposits',
  },
  {
    id: 4,
    icon: <Award className="h-6 w-6" />,
    title: 'opportunity.goldInvestment',
    description: 'opportunity.goldInvestmentDesc',
    link: '/courses/gold-investment',
  },
];

const OpportunityCard = ({ icon, title, description, link }) => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3 text-blue-600">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">{t(title)}</h3>
          <p className="mt-1 text-sm text-gray-500">{t(description)}</p>
        </div>
      </div>
      <div className="mt-4">
        <a
          href={link}
          className="text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          {t('opportunity.learnMore')} &rarr;
        </a>
      </div>
    </div>
  );
};

const Opportunity = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            {t('opportunity.title')}
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {t('opportunity.subtitle')}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {opportunities.map((opportunity) => (
            <OpportunityCard key={opportunity.id} {...opportunity} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Opportunity;