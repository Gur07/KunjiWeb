import { Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { supportedLanguages } from '../../i18n/config';

const LanguageSwitcher = () => {
    const { currentLanguage, setLanguage } = useLanguage();

    return (
        <div className="flex items-center">
            <Globe className="h-5 w-5 text-gray-400 mr-2" />
            <select
                value={currentLanguage}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {supportedLanguages.map(({ code, name }) => (
                    <option key={code} value={code} className="bg-white text-gray-900">
                        {name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSwitcher;
