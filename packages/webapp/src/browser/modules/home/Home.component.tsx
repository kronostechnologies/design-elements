import { Button, SectionalBanner } from '@equisoft/design-elements-react';
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

export const HomePage: FunctionComponent = () => {
    const { t, i18n } = useTranslation();
    const language: string = i18n.language;
    const nextLanguage = language === 'fr' ? 'en' : 'fr';
    const rotateLanguage: () => void = () => i18n.changeLanguage(nextLanguage);

    return (
        <>
            <SectionalBanner type="info">
                {t('helloWorld')}
            </SectionalBanner>
            <Button buttonType="primary" onClick={rotateLanguage}>
                {t('nav:changeLanguageTo', { lng: language, nextLanguage })}
            </Button>
        </>
    );
};
