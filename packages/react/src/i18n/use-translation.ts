import { i18n as i18nType, TFunction } from 'i18next';
import { useCallback, useEffect, useState } from 'react';
import { useIntlContext } from '../components/internationalization-provider/internationalization-provider';
import { UseTranslationResponse } from './i18n';

interface UseTranslationState {
    t: TFunction;
}

function getFallbackLang(i18n: i18nType): string | readonly string[] {
    const fallbackLng = i18n.options?.fallbackLng;
    return typeof fallbackLng === 'string' || Array.isArray(fallbackLng) ? fallbackLng : 'en';
}

export function useTranslation(namespace?: string): UseTranslationResponse {
    const { i18n } = useIntlContext();
    const createState: () => UseTranslationState = useCallback(() => ({
        t: i18n.getFixedT<string>(
            i18n.language || getFallbackLang(i18n),
            namespace || undefined,
        ),
    }), [i18n, namespace]);

    const [state, setState] = useState<UseTranslationState>(createState());
    const onLanguageChanged = useCallback(() => {
        setState(createState());
    }, [setState, createState]);

    useEffect(() => {
        i18n.on('languageChanged', onLanguageChanged);

        return () => i18n.off('languageChanged', onLanguageChanged);
    }, [i18n, onLanguageChanged]);

    return {
        i18n,
        t: state.t,
    };
}
