import i18next, { i18n as i18nType, TFunction } from 'i18next';
import { useCallback, useEffect, useState } from 'react';
import { Translations } from './translations';

export const i18n = i18next.createInstance();

i18n.init({
    resources: Translations,
    lng: 'en',
    fallbackLng: 'en',

    interpolation: {
        escapeValue: false,
    },
}).catch(console.error);

export interface UseTranslationResponse {
    t: TFunction;
    i18n: i18nType;
}

interface UseTranslationState {
    t: TFunction;
}

export function useTranslation(namespace?: string): UseTranslationResponse {
    const createState: () => UseTranslationState = useCallback(() => ({
        t: i18n.getFixedT(null,
            namespace || i18n.options?.defaultNS || []),
    }), [namespace]);

    const [state, setState] = useState<UseTranslationState>(createState());
    const onLanguageChanged = useCallback(() => {
        setState(createState());
    }, [setState, createState]);

    useEffect(() => {
        i18n.on('languageChanged', onLanguageChanged);

        return () => i18n.off('languageChanged', onLanguageChanged);
    }, [onLanguageChanged]);

    return {
        i18n,
        t: state.t,
    };
}
