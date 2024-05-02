import i18next, { TFunction } from 'i18next';
import BrowserLanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { translations } from './translations';

const defaultNamespace = 'core';
const referenceLanguage = 'fr';

export async function initializeI18n(): Promise<TFunction> {
    return i18next
        .createInstance()
        .use(new BrowserLanguageDetector())
        .use(initReactI18next)
        .init({
            defaultNS: defaultNamespace,
            fallbackLng: [referenceLanguage],
            interpolation: {
                escapeValue: false,
            },
            resources: translations,
            returnNull: false,
        });
}
