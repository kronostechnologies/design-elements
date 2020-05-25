import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Translations } from './translations';

void i18n
    .use(initReactI18next)
    .init({
        resources: Translations,
        lng: 'en',
        fallbackLng: 'en',

        interpolation: {
            escapeValue: false,
        },
    });

export { i18n };
