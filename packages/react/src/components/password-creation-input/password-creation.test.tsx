import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Translations } from '../../i18n/translations';
import { renderWithProviders } from '../../test-utils/renderer';
import { PasswordCreationInput } from './password-creation-input';
import { getPasswordStrength } from './password-strength';
import { PasswordStrengthEnum } from './password-strength.enum';

jest.mock('./password-strength', () => ({
    getPasswordStrength: jest.fn(),
}));

describe('PasswordCreationInput', () => {
    it('has controllable data-test-id', () => {
        const onChange = jest.fn();
        renderWithProviders(<PasswordCreationInput data-testid="a-password-input" onChange={onChange} />);

        expect(screen.getByTestId('a-password-input')).toHaveAttribute('type', 'password');
    });

    it('sets password type to password when not showing password', () => {
        const onChange = jest.fn();
        renderWithProviders(<PasswordCreationInput onChange={onChange} />);

        expect(screen.getByTestId('password-input')).toHaveAttribute('type', 'password');
    });

    it('calls onChange with password and isValid to false when a custom validation is false', async () => {
        const user = userEvent.setup();
        const onChange = jest.fn();
        renderWithProviders(
            <PasswordCreationInput
                validations={[
                    {
                        label: 'contains numbers',
                        isValid: (password) => /\d/.test(password),
                    },
                ]}
                onChange={onChange}
            />,
        );
        const password = 'abc';

        await user.type(screen.getByTestId('password-input'), password);

        expect(onChange).toHaveBeenLastCalledWith(password, false, expect.anything());
    });

    it('calls onChange with password and isValid to true when a custom validation is true', async () => {
        const user = userEvent.setup();
        const onChange = jest.fn();
        renderWithProviders(
            <PasswordCreationInput
                validations={[
                    {
                        label: 'contains numbers',
                        isValid: (password) => /\d/.test(password),
                    },
                ]}
                onChange={onChange}
            />,
        );
        const password = '123';

        await user.type(screen.getByTestId('password-input'), password);

        expect(onChange).toHaveBeenLastCalledWith(password, true, expect.anything());
    });

    it('calls onChange with password and isValid to true when password changes to a valid password', async () => {
        const user = userEvent.setup();
        const onChange = jest.fn();
        renderWithProviders(<PasswordCreationInput onChange={onChange} />);
        const password = 'Pe2345678910';

        await user.type(screen.getByTestId('password-input'), password);

        expect(onChange).toHaveBeenLastCalledWith(password, true, expect.anything());
    });

    it('calls onChange with password and isValid to false when password changes to an invalid password', async () => {
        const user = userEvent.setup();
        const onChange = jest.fn();
        renderWithProviders(<PasswordCreationInput onChange={onChange} />);
        const password = 'Pe23';

        await user.type(screen.getByTestId('password-input'), password);

        expect(onChange).toHaveBeenLastCalledWith(password, false, expect.anything());
    });

    it('sets password type to text when show password button is clicked', async () => {
        const user = userEvent.setup();
        const onChange = jest.fn();
        renderWithProviders(<PasswordCreationInput onChange={onChange} />);

        await user.click(screen.getByTestId('show-password-button'));

        expect(screen.getByTestId('password-input')).toHaveAttribute('type', 'text');
    });

    it('sets password strength text to weak when strength is weak', async () => {
        const user = userEvent.setup();
        const onChange = jest.fn();
        jest.mocked(getPasswordStrength).mockReturnValue(PasswordStrengthEnum.WEAK);
        const expectedLabel = Translations.en['password-creation-input']['password-strength']
            + Translations.en['password-creation-input'].weak;
        renderWithProviders(<PasswordCreationInput onChange={onChange} />);

        await user.type(screen.getByTestId('password-input'), '12345678');

        expect(screen.getByTestId('password-strength')).toHaveTextContent(expectedLabel);
    });

    it('sets password strength text to fair when strength is fair', async () => {
        const user = userEvent.setup();
        const onChange = jest.fn();
        jest.mocked(getPasswordStrength).mockReturnValue(PasswordStrengthEnum.FAIR);
        const expectedLabel = Translations.en['password-creation-input']['password-strength']
            + Translations.en['password-creation-input'].fair;
        renderWithProviders(<PasswordCreationInput onChange={onChange} />);

        await user.type(screen.getByTestId('password-input'), 'P2345678');

        expect(screen.getByTestId('password-strength')).toHaveTextContent(expectedLabel);
    });

    it('sets password strength text to good when strength is good', async () => {
        const user = userEvent.setup();
        const onChange = jest.fn();
        jest.mocked(getPasswordStrength).mockReturnValue(PasswordStrengthEnum.GOOD);
        const expectedLabel = Translations.en['password-creation-input']['password-strength']
            + Translations.en['password-creation-input'].good;
        renderWithProviders(<PasswordCreationInput onChange={onChange} />);

        await user.type(screen.getByTestId('password-input'), 'Pe234567');

        expect(screen.getByTestId('password-strength')).toHaveTextContent(expectedLabel);
    });

    it('sets password strength to strong when strength is strong', async () => {
        const user = userEvent.setup();
        const onChange = jest.fn();
        jest.mocked(getPasswordStrength).mockReturnValue(PasswordStrengthEnum.STRONG);
        const expectedLabel = Translations.en['password-creation-input']['password-strength']
            + Translations.en['password-creation-input'].strong;
        renderWithProviders(<PasswordCreationInput onChange={onChange} />);

        await user.type(screen.getByTestId('password-input'), 'Pe2345678910');

        expect(screen.getByTestId('password-strength')).toHaveTextContent(expectedLabel);
    });

    describe('liveValidation', () => {
        it('hides strength bar when liveValidation is false', () => {
            const onChange = jest.fn();

            renderWithProviders(<PasswordCreationInput onChange={onChange} liveValidation={false} />);

            expect(screen.queryByTestId('password-strength')).not.toBeInTheDocument();
        });

        it('does not show validation on keystroke when liveValidation is false', async () => {
            const user = userEvent.setup();
            const onChange = jest.fn();

            const { container } = renderWithProviders(
                <PasswordCreationInput onChange={onChange} liveValidation={false} />,
            );
            await user.type(screen.getByTestId('password-input'), 'a');

            const validationRules = container.querySelectorAll('li');
            const hasNoErrors = Array.from(validationRules)
                .every((rule) => !rule.querySelector('[aria-label*="Error"]'));
            expect(hasNoErrors).toBe(true);
        });
    });

    describe('validateField', () => {
        it('triggers validation when validateField callback is called', async () => {
            const user = userEvent.setup();
            const onChange = jest.fn();
            let triggerValidation: (() => void) | null = null;

            const { container } = renderWithProviders(
                <PasswordCreationInput
                    onChange={onChange}
                    liveValidation={false}
                    validateField={(trigger) => {
                        triggerValidation = trigger;
                    }}
                />,
            );
            await user.type(screen.getByTestId('password-input'), 'a');

            triggerValidation!();

            await waitFor(() => {
                const validationRules = container.querySelectorAll('li');
                const hasErrors = Array.from(validationRules)
                    .some((rule) => rule.querySelector('[aria-label*="Error"]'));
                expect(hasErrors).toBe(true);
            });
        });

        it('freezes validation state after manual trigger', async () => {
            const user = userEvent.setup();
            const onChange = jest.fn();
            let triggerValidation: (() => void) | null = null;

            const { container } = renderWithProviders(
                <PasswordCreationInput
                    onChange={onChange}
                    liveValidation={false}
                    validateField={(trigger) => {
                        triggerValidation = trigger;
                    }}
                />,
            );
            await user.type(screen.getByTestId('password-input'), 'short');
            triggerValidation!();

            await waitFor(() => {
                const validationRulesBefore = container.querySelectorAll('li');
                const hasErrorsBefore = Array.from(validationRulesBefore).some(
                    (rule) => rule.querySelector('[aria-label*="Error"]'),
                );
                expect(hasErrorsBefore).toBe(true);
            });

            await user.type(screen.getByTestId('password-input'), 'VeryLongPassword123');

            const validationRulesAfter = container.querySelectorAll('li');
            const hasErrorsAfter = Array.from(validationRulesAfter).some(
                (rule) => rule.querySelector('[aria-label*="Error"]'),
            );
            expect(hasErrorsAfter).toBe(true);
        });
    });
});
