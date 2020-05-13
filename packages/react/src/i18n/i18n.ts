import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

void i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    'Welcome to React': 'Welcome to React and Jean-Bag',
                },
                'inline-message': {
                    Tips: 'Tips',
                    Success: 'Success',
                    Alert: 'Alert',
                    Error: 'Error',
                },
            },
            fr: {
                'inline-message': {
                    Tips: 'Astuce',
                    Success: 'Succès',
                    Alert: 'Alerte',
                    Error: 'Erreur',
                },
            },
        },
        lng: 'en',
        fallbackLng: 'en',

        interpolation: {
            escapeValue: false,
        },
    });

export { i18n };
