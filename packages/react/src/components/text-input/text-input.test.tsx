import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderer';
import { Icon } from '../icon';
import { TextInput } from './text-input';

describe('TextInput', () => {
    const initialProps = {
        label: 'See console for callbacks',
        placeholder: 'Ex.: Hello',
        required: true,
        validationErrorMessage: 'This field is required',
        defaultValue: 'foo',
    };

    it('can override data-testid on input', () => {
        const aCustomTestId = 'my-test-id';
        const aValue = 'a value';

        renderWithProviders(<TextInput label="test" name="test" value={aValue} data-testid={aCustomTestId} />);

        const input = screen.getByTestId(aCustomTestId);
        expect(input).toHaveValue(aValue);
    });

    it('input has name property when name prop is set on TextInput', () => {
        renderWithProviders(<TextInput label="test" name="test" />);

        const input = screen.getByRole('textbox');
        expect(input).toHaveAttribute('name', 'test');
    });

    it('should be valid by default', async () => {
        renderWithProviders(<TextInput {...initialProps} />);

        const input = screen.getByTestId('text-input');

        expect(input).not.toHaveAttribute('aria-invalid');
    });

    it('should set as invalid when invalid event is triggered', () => {
        renderWithProviders(<TextInput {...initialProps} />);

        const input = screen.getByTestId('text-input');
        fireEvent.invalid(input);

        expect(input).toBeInvalid();
    });

    it('should set as invalid when valid prop is false', () => {
        renderWithProviders(<TextInput valid={false} />);

        const input = screen.getByTestId('text-input');
        expect(input).toBeInvalid();
    });

    it('should set as valid when valid prop is true', () => {
        renderWithProviders(<TextInput valid />);

        const input = screen.getByTestId('text-input');
        expect(input).not.toBeInvalid();
    });

    it('should set as invalid when valid prop is false and input trigger blur with checkValidity is true', async () => {
        const user = userEvent.setup();
        renderWithProviders(<TextInput valid={false} defaultValue="valid" required />);

        const input = screen.getByTestId('text-input');
        await user.click(input);
        await user.tab();

        expect(input).toBeInvalid();
    });

    it('should set as valid when valid prop is true and input trigger blur with checkValidity is true', async () => {
        const user = userEvent.setup();
        renderWithProviders(<TextInput valid defaultValue="valid" required />);

        const input = screen.getByTestId('text-input');
        await user.click(input);
        await user.tab();

        expect(input).not.toHaveAttribute('aria-invalid');
    });

    it('should set as valid when valid prop is true and input trigger blur with checkValidity is false', async () => {
        const user = userEvent.setup();
        renderWithProviders(<TextInput valid required defaultValue="" />);

        const input = screen.getByTestId('text-input');
        await user.click(input);
        await user.tab();

        expect(input).not.toHaveAttribute('aria-invalid');
    });

    it(
        'should set as invalid when valid prop is false and input trigger blur with checkValidity is false',
        async () => {
            const user = userEvent.setup();
            renderWithProviders(<TextInput valid={false} required defaultValue="" />);

            const input = screen.getByTestId('text-input');
            await user.click(input);
            await user.tab();

            expect(input).toBeInvalid();
        },
    );

    it('onChange callback is called when content is changed', async () => {
        const callback = jest.fn();
        const user = userEvent.setup();

        renderWithProviders(<TextInput {...initialProps} onChange={callback} />);

        const input = screen.getByRole('textbox');
        await user.type(input, 'bar');

        expect(callback).toHaveBeenCalled();
    });

    it('onChange callback can\'t be called when input disabled', async () => {
        const callback = jest.fn();
        const user = userEvent.setup();

        renderWithProviders(<TextInput {...initialProps} onChange={callback} disabled />);

        const input = screen.getByRole('textbox');
        await user.type(input, 'bar');

        expect(callback).not.toHaveBeenCalled();
    });

    it('onBlur callback is called when content is blurred', async () => {
        const callback = jest.fn();
        const user = userEvent.setup();

        renderWithProviders(<TextInput {...initialProps} onBlur={callback} />);

        const input = screen.getByRole('textbox');
        await user.click(input);
        await user.tab();

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('onBlur callback cannot be called when input disabled', async () => {
        const callback = jest.fn();
        const user = userEvent.setup();

        renderWithProviders(<TextInput {...initialProps} onBlur={callback} disabled />);

        const input = screen.getByRole('textbox');

        // User cannot focus disabled input, so cannot blur it
        await user.tab();
        expect(input).not.toHaveFocus();
    });

    it('onFocus callback is called when content is focused', async () => {
        const callback = jest.fn();
        const user = userEvent.setup();

        renderWithProviders(<TextInput {...initialProps} onFocus={callback} />);

        const input = screen.getByRole('textbox');
        await user.click(input);

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('matches the snapshot', () => {
        const { asFragment } = renderWithProviders(
            <TextInput
                label="Telephone"
                pattern="[0-9]{3}-?[0-9]{3}-?[0-9]{4}"
                placeholder="Ex.: 555-123-4567"
                type="tel"
                validationErrorMessage="Please enter a valid phone number"
                defaultValue="foo"
            />,
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it('matches the snapshot adornment text', () => {
        const { asFragment } = renderWithProviders(
            <TextInput
                label="Telephone"
                pattern="[0-9]{3}-?[0-9]{3}-?[0-9]{4}"
                placeholder="Ex.: 555-123-4567"
                type="tel"
                validationErrorMessage="Please enter a valid phone number"
                defaultValue="foo"
                leftAdornment="#"
            />,
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it('matches the snapshot adornment icon', () => {
        const { asFragment } = renderWithProviders(
            <TextInput
                label="Telephone"
                pattern="[0-9]{3}-?[0-9]{3}-?[0-9]{4}"
                placeholder="Ex.: 555-123-4567"
                type="tel"
                validationErrorMessage="Please enter a valid phone number"
                defaultValue="foo"
                leftAdornment={<Icon name="phone" />}
            />,
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it('matches the snapshot (Normal - Adornment at end)', () => {
        const { asFragment } = renderWithProviders(
            <TextInput
                label="Telephone"
                pattern="[0-9]{3}-?[0-9]{3}-?[0-9]{4}"
                placeholder="Ex.: 555-123-4567"
                type="tel"
                validationErrorMessage="Please enter a valid phone number"
                defaultValue="foo"
                leftAdornment="#"
                rightAdornment="end"
            />,
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it('matches the snapshot [disabled = true]', () => {
        const { asFragment } = renderWithProviders(
            <TextInput
                label="Telephone"
                pattern="[0-9]{3}-?[0-9]{3}-?[0-9]{4}"
                placeholder="Ex.: 555-123-4567"
                type="tel"
                validationErrorMessage="Please enter a valid phone number"
                defaultValue="foo"
                disabled
            />,
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it('matches the snapshot [required = true]', () => {
        const { asFragment } = renderWithProviders(
            <TextInput
                label="Telephone"
                pattern="[0-9]{3}-?[0-9]{3}-?[0-9]{4}"
                placeholder="Ex.: 555-123-4567"
                type="tel"
                validationErrorMessage="Please enter a valid phone number"
                defaultValue="foo"
                required
            />,
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it('should not show validation message when input is empty and required onBlur', async () => {
        const user = userEvent.setup();
        renderWithProviders(
            <form>
                <TextInput label="test" required validationErrorMessage="This field is required" />
                <button data-testid="submit-button" type="submit">Submit</button>
            </form>,
        );

        const input = screen.getByTestId('text-input');
        await user.click(input);
        await user.tab();
        expect(screen.queryByTestId('invalid-field')).not.toBeInTheDocument();

        const submitButton = screen.getByTestId('submit-button');
        await user.click(submitButton);
        expect(screen.getByTestId('invalid-field')).toBeInTheDocument();
    });
});
