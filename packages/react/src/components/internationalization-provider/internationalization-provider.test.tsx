import { render, screen, waitFor } from '@testing-library/react';
import { FC } from 'react';
import { useTranslation } from '../../i18n/use-translation';
import { IntlProvider } from './internationalization-provider';

const TestButton: FC = () => {
    const { i18n } = useTranslation();
    return <button type="button" value={i18n.language} />;
};

describe('Internationalization Provider', () => {
    it.each([
        [undefined, 'en-CA'],
        ['en', 'en-CA'],
        ['en-CA', 'en-CA'],
        ['en-US', 'en-US'],
        ['fr', 'fr-CA'],
        ['fr-CA', 'fr-CA'],
        ['fr-FR', 'fr-FR'],
        ['de', 'en-CA'],
        ['de-DE', 'en-CA'],
    ])('maps %s to %s', async (language, expected) => {
        render(<IntlProvider language={language}><TestButton /></IntlProvider>);

        await waitFor(() => expect(screen.getByRole('button')).toHaveValue(expected));
    });

    it('language should switch', async () => {
        const { rerender } = render(<IntlProvider language="fr"><TestButton /></IntlProvider>);

        rerender(<IntlProvider language="en"><TestButton /></IntlProvider>);

        await waitFor(() => expect(screen.getByRole('button')).toHaveValue('en-CA'));
    });
});
