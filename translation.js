import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            home: {
                welcome: 'Welcome!',
                greeting: 'Hello, {{name}}!',
            },
        }
    },
    amh: {
        translation: {
            home: {
                welcome: 'ሰላም!',
                greeting: 'ሰላም, {{name}}!',
            },
        }
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'amh', // Default language
        interpolation: {
            escapeValue: false, // React already escapes values
        },
    });

export default i18n;