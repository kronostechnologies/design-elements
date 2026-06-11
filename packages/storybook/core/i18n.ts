/* eslint-disable storybook/prefer-pascal-case */
import { createInstance, type TFunction } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { Translations } from './translations';

interface UseTranslationResponse {
    t: TFunction;
}

export const i18n = createInstance().use(LanguageDetector);

i18n.init({
    defaultNS: 'translations',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
    react: {
        useSuspense: false,
    },
    resources: Translations,
    returnNull: false,
});

export function useTranslation(ns?: string): UseTranslationResponse {
    return { t: ns ? i18n.getFixedT(i18n.language, ns) : i18n.t };
}
