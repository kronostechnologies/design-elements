import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderer';
import { StepperButtons } from './stepper-buttons';

describe('StepperButtons', () => {
    it('onIncrement callback should be called when button-increment is mouse down clicked', async () => {
        const callback = jest.fn();
        const user = userEvent.setup();
        renderWithProviders(<StepperButtons onIncrement={callback} />);
        const incrementButton = screen.getByTestId('stepper-button-increment');

        await user.pointer({ keys: '[MouseLeft>]', target: incrementButton });

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('onDecrement callback should be called when button-decrement is mouse down clicked', async () => {
        const callback = jest.fn();
        const user = userEvent.setup();
        renderWithProviders(<StepperButtons onDecrement={callback} />);
        const decrementButton = screen.getByTestId('stepper-button-decrement');

        await user.pointer({ keys: '[MouseLeft>]', target: decrementButton });

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('onStop callback should be called when button-increment is mouse up clicked', async () => {
        const callback = jest.fn();
        const user = userEvent.setup();
        renderWithProviders(<StepperButtons onStop={callback} />);
        const incrementButton = screen.getByTestId('stepper-button-increment');

        await user.pointer({ keys: '[MouseLeft>]', target: incrementButton });
        await user.pointer({ keys: '[/MouseLeft]', target: incrementButton });

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('onStop callback should be called when button-decrement is mouse up clicked', async () => {
        const callback = jest.fn();
        const user = userEvent.setup();
        renderWithProviders(<StepperButtons onStop={callback} />);
        const decrementButton = screen.getByTestId('stepper-button-decrement');

        await user.pointer({ keys: '[MouseLeft>]', target: decrementButton });
        await user.pointer({ keys: '[/MouseLeft]', target: decrementButton });

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('onStop callback should be called when button-increment is mouse leave clicked', async () => {
        const callback = jest.fn();
        const user = userEvent.setup();
        renderWithProviders(<StepperButtons onStop={callback} />);
        const incrementButton = screen.getByTestId('stepper-button-increment');

        await user.hover(incrementButton);
        await user.unhover(incrementButton);

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('onStop callback should be called when button-decrement is mouse leave clicked', async () => {
        const callback = jest.fn();
        const user = userEvent.setup();
        renderWithProviders(<StepperButtons onStop={callback} />);
        const decrementButton = screen.getByTestId('stepper-button-decrement');

        await user.hover(decrementButton);
        await user.unhover(decrementButton);

        expect(callback).toHaveBeenCalledTimes(1);
    });
});
