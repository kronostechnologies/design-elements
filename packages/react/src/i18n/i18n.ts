import i18next, { i18n as i18nType, TFunction } from 'i18next';
import { useEffect, useState } from 'react';
import { Translations } from './translations';

export const i18n = i18next.createInstance();

void i18n.init({
    resources: Translations,
    lng: 'en',
    fallbackLng: 'en',

    interpolation: {
        escapeValue: false,
    },
});

export interface UseTranslationResponse {
    t: TFunction;
    i18n: i18nType;
}

interface UseTranslationState {
    t: TFunction;
}

export function useTranslation(namespace?: string): UseTranslationResponse {
    function createState(): UseTranslationState {
        return { t: i18n.getFixedT(null, namespace || i18n.options?.defaultNS || []) };
    }

    function onLanguageChanged(): void {
        setState(createState());
    }

    const [state, setState] = useState<UseTranslationState>(createState());

    useEffect(() => {
        i18n.on('languageChanged', onLanguageChanged);

        return () => i18n.off('languageChanged', onLanguageChanged);
    }, []);

    return {
        i18n,
        t: state.t,
    };
}
