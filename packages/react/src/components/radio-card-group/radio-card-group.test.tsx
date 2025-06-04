import { renderWithProviders } from '../../test-utils/renderer';
import { RadioCard } from './radio-card';
import { RadioCardGroup } from './radio-card-group';

describe('Radio Card', () => {
    test('Matches snapshot (Default, Desktop)', () => {
        const { container } = renderWithProviders(
            <RadioCardGroup>
                <RadioCard name="test" label="Test" value="test">
                    Test description
                </RadioCard>
            </RadioCardGroup>,
            'desktop',
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('Matches snapshot (Label, Desktop)', () => {
        const { container } = renderWithProviders(
            <RadioCardGroup label="Test">
                <RadioCard name="test" label="Test" value="test">
                    Test description
                </RadioCard>
            </RadioCardGroup>,
            'desktop',
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('Matches snapshot (Checked, Desktop)', () => {
        const { container } = renderWithProviders(
            <RadioCardGroup>
                <RadioCard name="test" label="Test" value="test" checked>
                    Test description
                </RadioCard>
            </RadioCardGroup>,
            'desktop',
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('Matches snapshot (Disabled, Desktop)', () => {
        const { container } = renderWithProviders(
            <RadioCardGroup>
                <RadioCard name="test" label="Test" value="test" disabled>
                    Test description
                </RadioCard>
            </RadioCardGroup>,
            'desktop',
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('Matches snapshot (Default, Mobile)', () => {
        const { container } = renderWithProviders(
            <RadioCardGroup>
                <RadioCard name="test" label="Test" value="test">
                    Test description
                </RadioCard>
            </RadioCardGroup>,
            'mobile',
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('Matches snapshot (Label, Mobile)', () => {
        const { container } = renderWithProviders(
            <RadioCardGroup label="Test">
                <RadioCard name="test" label="Test" value="test">
                    Test description
                </RadioCard>
            </RadioCardGroup>,
            'mobile',
        );

        expect(container.firstChild).toMatchSnapshot();
    });
});
