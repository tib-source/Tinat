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
                chapters : 'chapters',
                books: 'books',
                progress: 'progress',
                testament: {
                    new: 'New Testament',
                    old: 'Old Test'
                }
            },
        }
    },
    amh: {
        translation: {
            home: {
                welcome: 'እንኳን ደህና መጡ!',
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
                daily_verse: 'የዕለቱ ቃል',
            },
            bible: {
                headerTitle: 'መጽሐፍ ቅዱስን ያስሱ',
                chapters : 'ምዕራፎች',
                chapter: 'ምዕራፍ',
                verses: 'ጥቅሶች',
                books: 'መጻሕፍት',
                progress: 'ተካያሄደ',
                testament: {
                    new: 'አዲስ ኪዳን',
                    old: 'ብሉይ ኪዳን'
                }
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