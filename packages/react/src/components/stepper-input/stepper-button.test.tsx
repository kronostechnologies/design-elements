import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderer';
import { StepperButton } from './stepper-button';

describe('StepperButton', () => {
    it('calls onPress when decrement button is mouse down clicked', async () => {
        const callback = jest.fn();
        const user = userEvent.setup();
        renderWithProviders(<StepperButton type="decrement" onPress={callback} />);

        await user.pointer({ keys: '[MouseLeft>]', target: screen.getByTestId('stepper-button-decrement') });

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('calls onPress when increment button is mouse down clicked', async () => {
        const callback = jest.fn();
        const user = userEvent.setup();
        renderWithProviders(<StepperButton type="increment" onPress={callback} />);

        await user.pointer({ keys: '[MouseLeft>]', target: screen.getByTestId('stepper-button-increment') });

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('calls onPress when activated with the keyboard', async () => {
        const callback = jest.fn();
        const user = userEvent.setup();
        renderWithProviders(<StepperButton type="increment" onPress={callback} />);

        const button = screen.getByTestId('stepper-button-increment');
        button.focus();
        await user.keyboard('{Enter}');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('calls onStop when button is mouse up clicked', async () => {
        const callback = jest.fn();
        const user = userEvent.setup();
        renderWithProviders(<StepperButton type="increment" onStop={callback} />);
        const button = screen.getByTestId('stepper-button-increment');

        await user.pointer({ keys: '[MouseLeft>]', target: button });
        await user.pointer({ keys: '[/MouseLeft]', target: button });

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('calls onStop when button is mouse leave clicked', async () => {
        const callback = jest.fn();
        const user = userEvent.setup();
        renderWithProviders(<StepperButton type="decrement" onStop={callback} />);
        const button = screen.getByTestId('stepper-button-decrement');

        await user.hover(button);
        await user.unhover(button);

        expect(callback).toHaveBeenCalledTimes(1);
    });
});
