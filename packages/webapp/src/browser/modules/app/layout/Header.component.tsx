import { Button, GlobalHeader, Tooltip, UserProfile } from '@equisoft/design-elements-react';
import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

export const Header: FC = () => {
    const { t, i18n } = useTranslation();
    const language: string = i18n.language;
    const nextLanguage = language === 'fr' ? 'en' : 'fr';
    const rotateLanguage: () => void = () => i18n.changeLanguage(nextLanguage);

    const userOptions = [
        {
            label: 'Option A',
            value: 'optionA',
            href: '/',
        },
        {
            label: 'Option B',
            lozenge: 'New',
            value: 'optionB',
            href: '/',
        },
        {
            label: 'Option C',
            value: 'optionC',
            href: '/',
            disabled: true,
        },
        {
            label: 'My Account',
            value: 'My Account',
            href: 'https://www.google.ca',
            isExternalLink: true,
        },
    ];

    return (
        <GlobalHeader>
            <Tooltip
                desktopPlacement="bottom"
                label={t('nav:changeLanguage')}
            >
                <Button
                    buttonType="tertiary"
                    inverted
                    onClick={rotateLanguage}
                >
                    {language === 'fr' ? 'FR' : 'EN'}
                </Button>
            </Tooltip>
            <UserProfile
                options={userOptions}
                username="John Doe"
                userEmail="John.doe@gmail.com"
            />
        </GlobalHeader>
    );
};
