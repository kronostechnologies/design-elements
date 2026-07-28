import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderer';
import { RadioCard } from './radio-card';
import { RadioCardGroup } from './radio-card-group';

describe('Radio Card', () => {
    it('matches snapshot (Default, Desktop)', () => {
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

    it('matches snapshot (Label, Desktop)', () => {
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

    it('matches snapshot (Checked, Desktop)', () => {
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

    it('matches snapshot (Disabled, Desktop)', () => {
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

    it('matches snapshot (Default, Mobile)', () => {
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

    it('matches snapshot (Label, Mobile)', () => {
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

    it('onChange callback is called when input is changed', async () => {
        const callback = jest.fn();
        const user = userEvent.setup();

        renderWithProviders(
            <RadioCardGroup>
                <RadioCard name="test" label="Test" value="test" onChange={callback}>
                    Test description
                </RadioCard>
            </RadioCardGroup>,
        );

        await user.click(screen.getByRole('radio', { name: /Test/ }));

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('onChange callback is called when label is clicked', async () => {
        const callback = jest.fn();
        const user = userEvent.setup();

        renderWithProviders(
            <RadioCardGroup>
                <RadioCard name="test" label="Test" value="test" onChange={callback}>
                    Test description
                </RadioCard>
            </RadioCardGroup>,
        );

        await user.click(screen.getByText('Test'));

        expect(callback).toHaveBeenCalledTimes(1);
    });
});
