import { useState, useEffect } from 'react';
import { User, Mail, Phone, Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { supportedLanguages } from '../../i18n/config';

const ProfilePage = () => {
    const { currentLanguage, setLanguage, t } = useLanguage();
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        preferredLanguage: currentLanguage
    });

    useEffect(() => {
        // Load user data from localStorage or API
        const savedData = localStorage.getItem('userProfile');
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Update language immediately if changed
        if (name === 'preferredLanguage') {
            setLanguage(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Save to localStorage
        localStorage.setItem('userProfile', JSON.stringify(formData));
        // Here you would typically also save to your backend
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h1 className="text-2xl font-semibold text-gray-900">{t('profile.title')}</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="px-6 py-4 space-y-6">
                        <div>
                            <h2 className="text-xl font-medium text-gray-900 mb-4">
                                {t('profile.personalInfo')}
                            </h2>
                            
                            <div className="space-y-4">
                                {/* Name Field */}
                                <div className="flex items-center">
                                    <User className="h-5 w-5 text-gray-400 mr-2" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder={t('profile.namePlaceholder')}
                                        className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                {/* Email Field */}
                                <div className="flex items-center">
                                    <Mail className="h-5 w-5 text-gray-400 mr-2" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder={t('profile.emailPlaceholder')}
                                        className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                {/* Phone Field */}
                                <div className="flex items-center">
                                    <Phone className="h-5 w-5 text-gray-400 mr-2" />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder={t('profile.phonePlaceholder')}
                                        className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                {/* Language Preference */}
                                <div className="flex items-center">
                                    <Globe className="h-5 w-5 text-gray-400 mr-2" />
                                    <select
                                        name="preferredLanguage"
                                        value={formData.preferredLanguage}
                                        onChange={handleChange}
                                        className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        {supportedLanguages.map(({ code, name }) => (
                                            <option key={code} value={code}>
                                                {name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                {t('profile.saveChanges')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
