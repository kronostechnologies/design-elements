import { SectionalBanner } from '@equisoft/design-elements-react';
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

export const HomePage: FunctionComponent = () => {
    const { t } = useTranslation();

    return (
        <SectionalBanner type="info">
            {t('helloWorld')}
        </SectionalBanner>
    );
};
