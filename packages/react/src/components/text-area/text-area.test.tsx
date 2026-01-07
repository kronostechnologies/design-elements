import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderer';
import { TextArea } from './text-area';

describe('TextArea', () => {
    it('should not show validation message when input is empty and required onBlur', async () => {
        const user = userEvent.setup();
        const { getByTestId: byTestId, queryByTestId } = renderWithProviders(
            <form>
                <TextArea label="test" required validationErrorMessage="This field is required" />
                <button data-testid="submit-button" type="submit">Submit</button>
            </form>,
        );

        const textarea = byTestId('textarea');
        await user.click(textarea);
        await user.tab();
        expect(queryByTestId('invalid-field')).toBeNull();

        await user.click(byTestId('submit-button'));
        expect(byTestId('invalid-field')).not.toBeNull();
    });

    const defaultProps = {
        defaultValue: 'foo',
        label: 'Comment',
        placeholder: 'Enter your comment',
        required: true,
        validationErrorMessage: 'Error message',
    };

    it('onChange callback is called when content is changed', async () => {
        const user = userEvent.setup();
        const callback = jest.fn();
        renderWithProviders(<TextArea onChange={callback} {...defaultProps} />);

        const textarea = screen.getByRole('textbox');
        await user.type(textarea, 'bar');

        expect(callback).toHaveBeenCalled();
    });

    it('onBlur callback is called when content is blurred', async () => {
        const user = userEvent.setup();
        const callback = jest.fn();
        renderWithProviders(<TextArea onBlur={callback} {...defaultProps} />);

        const textarea = screen.getByRole('textbox');
        await user.click(textarea);
        await user.tab();

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('onFocus callback is called when content is focused', async () => {
        const user = userEvent.setup();
        const callback = jest.fn();
        renderWithProviders(<TextArea onFocus={callback} {...defaultProps} />);

        const textarea = screen.getByRole('textbox');
        await user.click(textarea);

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('onFocus callback cannot be called when disabled', async () => {
        const user = userEvent.setup();
        const callback = jest.fn();
        renderWithProviders(<TextArea onFocus={callback} {...defaultProps} disabled />);

        const textarea = screen.getByRole('textbox');
        await user.click(textarea);

        expect(callback).not.toHaveBeenCalled();
    });

    it('matches the snapshot', () => {
        const { asFragment } = renderWithProviders(
            <TextArea data-testid="some-data-testid" onChange={jest.fn()} onBlur={jest.fn()} {...defaultProps} />,
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it('matches the snapshot when disabled', () => {
        const { asFragment } = renderWithProviders(
            <TextArea onChange={jest.fn()} onBlur={jest.fn()} {...defaultProps} disabled />,
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it('should flag input as invalid when length exceeds maxLength', async () => {
        const user = userEvent.setup();
        renderWithProviders(
            <TextArea label="Test Input" maxLength={20} />,
        );

        const textarea = screen.getByRole('textbox');
        const text = 'This text is longer than input length';
        await user.type(textarea, text);

        expect(screen.getByTestId('invalid-field')).toBeInTheDocument();
    });

    it('should display character count when maxLength is provided', () => {
        renderWithProviders(
            <TextArea label="Test Input" defaultValue="Default input text" maxLength={20} />,
        );

        expect(screen.getByTestId('char-counter')).toBeInTheDocument();
    });

    it('should not display character count when maxLength is not provided', () => {
        renderWithProviders(
            <TextArea label="Test Input" defaultValue="Default input text" />,
        );

        expect(screen.queryByTestId('char-counter')).not.toBeInTheDocument();
    });
});
