import { createI18n } from '@design-elements/i18n/i18n';
import { i18n as i18nType } from 'i18next';
import React, { createContext, ReactElement, useContext, useEffect, useState } from 'react';

interface IntlProviderProps {
    children: ReactElement;
    language?: string;
}

interface IntlContextProps {
    i18n: i18nType
}

const IntlContext = createContext<IntlContextProps>({ i18n: createI18n() });

export function IntlProvider({ children, language }: IntlProviderProps): ReactElement {
    const [i18n] = useState(createI18n);

    useEffect(() => {
        if (language) {
            // noinspection JSIgnoredPromiseFromCall
            i18n.changeLanguage(language);
        }
    }, [i18n, language]);

    return (
        <IntlContext.Provider value={{ i18n }}>
            {children}
        </IntlContext.Provider>
    );
}

export function useIntlContext(): IntlContextProps {
    return useContext(IntlContext);
}
