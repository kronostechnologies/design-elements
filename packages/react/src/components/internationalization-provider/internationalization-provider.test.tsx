import { render, screen, waitFor } from '@testing-library/react';
import { FC } from 'react';
import { useTranslation } from '../../i18n/use-translation';
import { IntlProvider } from './internationalization-provider';

const TestButton: FC = () => {
    const { i18n } = useTranslation();
    return <button type="button" value={i18n.language} />;
};

describe('Internationalization Provider', () => {
    it('language should be en', () => {
        render(<IntlProvider><TestButton /></IntlProvider>);

        expect(screen.getByRole('button')).toHaveValue('en');
    });

    it('language should be fr', () => {
        render(<IntlProvider language="fr"><TestButton /></IntlProvider>);

        expect(screen.getByRole('button')).toHaveValue('fr');
    });

    it('language should switch', async () => {
        const { rerender } = render(<IntlProvider language="fr"><TestButton /></IntlProvider>);

        rerender(<IntlProvider language="en"><TestButton /></IntlProvider>);

        await waitFor(() => expect(screen.getByRole('button')).toHaveValue('en'));
    });
});
