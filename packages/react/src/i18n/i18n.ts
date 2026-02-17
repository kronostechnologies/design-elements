import i18next, { i18n as i18nType, TFunction } from 'i18next';
import { Translations } from './translations';

export function createI18n(language = 'en'): i18nType {
    const i18n = i18next.createInstance();

    i18n.init({
        defaultNS: 'common',
        resources: Translations,
        lng: language,
        fallbackLng: language,
        interpolation: {
            escapeValue: false,
        },
        returnNull: false,
        showSupportNotice: false,
    }).catch(console.error);

    return i18n;
}

export interface UseTranslationResponse {
    t: TFunction;
    i18n: i18nType;
}
