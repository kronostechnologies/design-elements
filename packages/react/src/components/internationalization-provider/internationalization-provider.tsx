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

/**
 * @deprecated Use {@link DesignSystem} instead
 */
export const IntlProvider: FunctionComponent<PropsWithChildren<IntlProviderProps>> = ({ children, language }) => {
    const [i18n] = useState(() => createI18n(language));

    useEffect(() => {
        if (language) {
            // noinspection JSIgnoredPromiseFromCall
            i18n.changeLanguage(language);
        }
    }, [i18n, language]);

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
