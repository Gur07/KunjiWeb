import React from 'react'
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { languages } from '../../i18n/languages';

import {
    Home, BookOpen, PiggyBank, Newspaper, User,
    CreditCard, Briefcase
} from 'lucide-react';

function Navbar() {
    const { t, i18n } = useTranslation();

    const handleLanguageChange = (e) => {
        i18n.changeLanguage(e.target.value);
    };

    const navItems = [
        { path: '/', icon: <Home size={20} />, label: t('nav.home') },
        { path: '/courses', icon: <BookOpen size={20} />, label: t('nav.courses') },
        { path: '/budget', icon: <PiggyBank size={20} />, label: t('nav.budget') },
        { path: '/opportunities', icon: <Briefcase size={20} />, label: t('nav.opportunities') },
        { path: '/articles', icon: <Newspaper size={20} />, label: t('nav.article') },
        { path: '/profile', icon: <User size={20} />, label: t('nav.profile') },
    ];

    return (
        <nav className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <CreditCard className="h-8 w-8 text-blue-600" />
                        <span className="ml-2 text-xl font-medium">KUNJI</span>
                    </div>
                    <div className="flex items-center space-x-8">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({isActive}) =>
                                    `flex items-center space-x-1 py-2 pr-4 pl-3 duration-200 ${isActive ? 'text-orange-700' : 'text-gray-700'} hover:text-orange-700`
                                }
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </NavLink>
                        ))}

                        <select
                            onChange={handleLanguageChange}
                            value={i18n.language}
                            className="border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                            {Object.entries(languages).map(([code, name]) => (
                                <option key={code} value={code}>
                                    {name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;