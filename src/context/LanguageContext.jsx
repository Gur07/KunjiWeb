import { createContext, useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n/config';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const { t } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(() => {
        return i18n.language || 'en';
    });

    const handleLanguageChange = (lang) => {
        setCurrentLanguage(lang);
        i18n.changeLanguage(lang);
        localStorage.setItem('i18nextLng', lang);
    };

    useEffect(() => {
        // Sync with i18next language changes
        const handleLanguageChanged = (lng) => {
            setCurrentLanguage(lng);
        };

        i18n.on('languageChanged', handleLanguageChanged);

        return () => {
            i18n.off('languageChanged', handleLanguageChanged);
        };
    }, []);

    const value = {
        currentLanguage,
        setLanguage: handleLanguageChange,
        t
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
