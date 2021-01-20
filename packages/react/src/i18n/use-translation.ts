import { TFunction } from 'i18next';
import { useCallback, useEffect, useState } from 'react';
import { useIntlContext } from '../components/internationalization-provider/internationalization-provider';
import { UseTranslationResponse } from './i18n';

interface UseTranslationState {
    t: TFunction;
}

export function useTranslation(namespace?: string): UseTranslationResponse {
    const { i18n } = useIntlContext();
    const createState: () => UseTranslationState = useCallback(() => ({
        t: i18n.getFixedT(null,
            namespace || i18n.options?.defaultNS || []),
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
