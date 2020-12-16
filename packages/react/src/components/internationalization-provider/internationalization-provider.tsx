import { i18n } from '@design-elements/i18n/i18n';
import { ReactElement, useEffect } from 'react';

interface IntlProviderProps {
    children: ReactElement;
    language?: string;
}

export function IntlProvider({ children, language }: IntlProviderProps): ReactElement {
    useEffect(() => {
        if (language) {
            // noinspection JSIgnoredPromiseFromCall
            i18n.changeLanguage(language);
        }
    }, [language]);

    return children;
}
