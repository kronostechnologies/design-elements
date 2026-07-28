import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderer';
import { PasswordInput } from './password-input';

jest.mock('../../utils/uuid', () => ({
    v4: () => 'mocked-uuid',
}));

describe('PasswordInput', () => {
    it('matches the snapshot (Normal)', () => {
        const { asFragment } = renderWithProviders(<PasswordInput value="Pass123" />);

        expect(asFragment()).toMatchSnapshot();
    });

    it('matches the snapshot (Disabled)', () => {
        const { asFragment } = renderWithProviders(<PasswordInput value="Pass123" disabled />);

        expect(asFragment()).toMatchSnapshot();
    });

    it('matches the snapshot (Invalid)', () => {
        const { asFragment } = renderWithProviders(
            <PasswordInput value="Pass123" validationErrorMessage="This is an error message" />,
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it('has controllable data-test-id', () => {
        renderWithProviders(<PasswordInput data-testid="a-password-input" />);

        expect(screen.getByTestId('a-password-input')).toBeInTheDocument();
    });

    it('has controllable value', () => {
        renderWithProviders(<PasswordInput data-testid="a-password-input" value="Pass123" />);

        expect(screen.getByTestId('a-password-input')).toHaveValue('Pass123');
    });

    it('sets password type to password when not showing password', () => {
        const onChange = jest.fn();

        renderWithProviders(<PasswordInput onChange={onChange} />);

        expect(screen.getByTestId('password-input')).toHaveAttribute('type', 'password');
    });

    it('sets password type to text when show password button is clicked', async () => {
        const onChange = jest.fn();
        const user = userEvent.setup();

        renderWithProviders(<PasswordInput onChange={onChange} />);

        await user.click(screen.getByTestId('show-password-button'));

        expect(screen.getByTestId('password-input')).toHaveAttribute('type', 'text');
    });
});
