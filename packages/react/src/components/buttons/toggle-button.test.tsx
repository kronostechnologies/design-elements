import { ReactElement, useState } from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils/renderer';
import { ToggleButton } from './toggle-button';

describe('ToggleButton', () => {
    it('has default style', () => {
        const { container } = renderWithProviders(
            <ToggleButton pressed={false} label="Lock" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has icon with label style', () => {
        const { container } = renderWithProviders(
            <ToggleButton iconName='lock' pressed={false} label="Lock" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has icon only style', () => {
        const { container } = renderWithProviders(
            <ToggleButton iconName='lock' pressed={false} ariaLabel="Lock" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has pressed default style', () => {
        const { container } = renderWithProviders(
            <ToggleButton pressed label="Lock" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has pressed icon with label style', () => {
        const { container } = renderWithProviders(
            <ToggleButton iconName='lock' pressed label="Lock" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has pressed icon only style', () => {
        const { container } = renderWithProviders(
            <ToggleButton iconName='lock' pressed ariaLabel="Lock" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has disabled style', () => {
        const { container } = renderWithProviders(
            <ToggleButton disabled pressed={false} label="Lock" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('toggles the pressed state on each click', async () => {
        const ParentComponent = (): ReactElement => {
            const [pressed, setPressed] = useState(false);

            return (
                <ToggleButton
                    pressed={pressed}
                    label="Lock"
                    onChange={setPressed}
                />
            );
        };

        const { container } = renderWithProviders(<ParentComponent />);
        const toggleButton = container.firstChild;

        expect(toggleButton).not.toBePressed();

        await userEvent.click(screen.getByRole('button'));
        expect(toggleButton).toBePressed();

        await userEvent.click(screen.getByRole('button'));
        expect(toggleButton).not.toBePressed();
    });
});
