import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils/renderer';
import { Label } from './label';

describe('Label', () => {
    it('contains tooltip when tooltip prop is defined', () => {
        renderWithProviders(<Label forId="test" tooltip={{ label: 'test' }}>Test</Label>);

        expect(screen.getByTestId('tooltip')).toBeInTheDocument();
    });

    it('contains asterisk when required', () => {
        renderWithProviders(<Label forId="test" required requiredLabelType='asterisk'>Test</Label>);

        expect(screen.getByTestId('required-asterisk')).toBeInTheDocument();
    });

    it('matches the snapshot', () => {
        const { asFragment } = renderWithProviders(
            <Label forId="test-id">
                Children
            </Label>,
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
