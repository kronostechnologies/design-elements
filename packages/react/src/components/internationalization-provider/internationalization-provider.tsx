import { i18n } from '@design-elements/i18n/i18n';
import React, { ReactElement, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';

interface IntlProviderProps {
    children: ReactElement;
    language?: string;
}

export function IntlProvider({ children, language }: IntlProviderProps): ReactElement {
    const newInstance = i18n.cloneInstance();

    useEffect(() => {
        language && newInstance.changeLanguage(language);
    }, [language]);

    return (
        <I18nextProvider i18n={newInstance}>
            {children}
        </I18nextProvider>
    );
}
