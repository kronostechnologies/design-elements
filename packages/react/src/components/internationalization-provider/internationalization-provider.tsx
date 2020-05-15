import React, { ReactElement } from 'react';
import { I18nextProvider } from 'react-i18next';
import { i18n } from '../../i18n/i18n';

interface IntlProviderProps {
    children: ReactElement;
    language?: string;
}

export function IntlProvider({ children, language }: IntlProviderProps): ReactElement {
    language && void i18n.changeLanguage(language);

    return (
        <I18nextProvider i18n={i18n}>
            {children}
        </I18nextProvider>
    );
}
