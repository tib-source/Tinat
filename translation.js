import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            home: {
                welcome: 'Welcome!',
                greeting: 'Hello, {{name}}!',
                days: {
                    monday: 'Mon',
                    tuesday: 'Tue',
                    wednesday: 'Wed',
                    thursday: 'Thur',
                    friday: 'Fri',
                    saturday: 'Sat',
                    sunday: 'Sun',
                },
                progress: 'verses read',
                daily_verse: 'Daily Verse',
            },
            bible: {
                headerTitle: 'Explore The Bible',
            },
        }
    },
    amh: {
        translation: {
            home: {
                welcome: 'ሰላም!',
                greeting: 'ሰላም, {{name}}!',
                days: {
                    monday: 'ሰኞ',
                    tuesday: 'ማ/ኞ',
                    wednesday: 'ረቡዕ',
                    thursday: 'ሐሙስ',
                    friday: 'አርብ',
                    saturday: 'ቅዳሜ',
                    sunday: 'እሁድ',
                },
                progress: 'ጥቅሶች አንብበዋል',
                daily_verse: 'የዕለቱ ቃል እግዚአብሔር',
            },
            bible: {
                headerTitle: 'Explore The Bible',
            },
        }
    }
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