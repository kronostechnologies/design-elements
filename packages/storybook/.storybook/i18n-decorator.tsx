import type { Decorator } from '@storybook/react';
import { useEffect, useState } from 'react';
import { i18n } from '../core/i18n';

export const i18nDecorator: Decorator = (Story, context) => {
    const { locale } = context.globals;
    const [_, setLanguage] = useState(locale);

    useEffect(() => {
        i18n.changeLanguage(locale).then(() => {
            setLanguage(locale);
        });
    }, [locale]);

    return (
        <Story />
    );
};
