import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderer';
import { StepperButton } from './stepper-button';

const TEST_IDS = {
    DECREMENT: 'stepper-button-decrement',
    INCREMENT: 'stepper-button-increment',
} as const;

describe('StepperButton', () => {
    it('calls onPress when decrement button is clicked', async () => {
        const callback = jest.fn();
        const user = userEvent.setup();
        renderWithProviders(<StepperButton type="decrement" onPress={callback} />);

        await user.click(screen.getByTestId(TEST_IDS.DECREMENT));

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('calls onPress when increment button is clicked', async () => {
        const callback = jest.fn();
        const user = userEvent.setup();
        renderWithProviders(<StepperButton type="increment" onPress={callback} />);

        await user.click(screen.getByTestId(TEST_IDS.INCREMENT));

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('calls onPress when activated with the keyboard', async () => {
        const callback = jest.fn();
        const user = userEvent.setup();
        renderWithProviders(<StepperButton type="increment" onPress={callback} />);

        const button = screen.getByTestId(TEST_IDS.INCREMENT);
        button.focus();
        await user.keyboard('{Enter}');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('calls onStop when button is mouse up clicked', async () => {
        const callback = jest.fn();
        const user = userEvent.setup();
        renderWithProviders(<StepperButton type="increment" onStop={callback} />);
        const button = screen.getByTestId(TEST_IDS.INCREMENT);

        await user.pointer({ keys: '[MouseLeft>]', target: button });
        await user.pointer({ keys: '[/MouseLeft]', target: button });

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('calls onStop when button is mouse leave clicked', async () => {
        const callback = jest.fn();
        const user = userEvent.setup();
        renderWithProviders(<StepperButton type="decrement" onStop={callback} />);
        const button = screen.getByTestId(TEST_IDS.DECREMENT);

        await user.hover(button);
        await user.unhover(button);

        expect(callback).toHaveBeenCalledTimes(1);
    });
});
