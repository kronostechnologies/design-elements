import { i18n as i18nType } from 'i18next';
import { createContext, FunctionComponent, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { createI18n } from '../../i18n/i18n';

export interface IntlProviderProps {
    /**
     * @default en
     */
    language?: string;
}

interface IntlContextProps {
    i18n: i18nType;
}

const IntlContext = createContext<IntlContextProps>({ i18n: createI18n() });

function mapLanguageToLocale(language: string | undefined): string {
    if (language?.startsWith('fr') || language?.startsWith('en')) {
        return language.includes('-') ? language : `${language}-CA`;
    }

    return 'en-CA';
}

/**
 * @internal Use {@link DesignSystem} instead
 */
export const IntlProvider: FunctionComponent<PropsWithChildren<IntlProviderProps>> = ({ children, language }) => {
    const mappedLanguage = useMemo(() => mapLanguageToLocale(language), [language]);
    const [i18n] = useState(() => createI18n(mappedLanguage));

    useEffect(() => {
        if (mappedLanguage) {
            // noinspection JSIgnoredPromiseFromCall
            i18n.changeLanguage(mappedLanguage);
        }
    }, [i18n, mappedLanguage]);

    const value = useMemo(() => ({ i18n }), [i18n]);

    return (
        <IntlContext.Provider value={value}>
            {children}
        </IntlContext.Provider>
    );
};

IntlProvider.displayName = 'IntlProvider';

export function useIntlContext(): IntlContextProps {
    return useContext(IntlContext);
}
