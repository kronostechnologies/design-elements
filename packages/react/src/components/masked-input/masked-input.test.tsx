import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderer';
import { MaskedInput } from './masked-input';

const PHONE_MASK = '(___) ___-____';
const PHONE_PATTERN = '\\(\\d\\d\\d\\) \\d\\d\\d-\\d\\d\\d\\d';
const DATE_MASK = 'YYYY-MM-DD';
const DATE_PATTERN = '\\d\\d\\d\\d-\\d\\d-\\d\\d';

describe('MaskedInput', () => {
    describe('with phone mask', () => {
        it('should have an empty value when no defaultValue is provided', () => {
            renderWithProviders(<MaskedInput mask={PHONE_MASK} pattern={PHONE_PATTERN} />);

            expect(screen.getByTestId('masked-text-input')).toHaveValue('');
        });

        it('should display the defaultValue', () => {
            renderWithProviders(<MaskedInput mask={PHONE_MASK} pattern={PHONE_PATTERN} defaultValue="1234567890" />);

            expect(screen.getByTestId('masked-text-input')).toHaveValue('(123) 456-7890');
        });

        it('should trim defaultValue chars that exceed the pattern max length', () => {
            renderWithProviders(
                <MaskedInput mask={PHONE_MASK} pattern={PHONE_PATTERN} defaultValue="12345678901234" />,
            );

            expect(screen.getByTestId('masked-text-input')).toHaveValue('(123) 456-7890');
        });

        it('should format digits as they are typed', async () => {
            const user = userEvent.setup();
            renderWithProviders(<MaskedInput mask={PHONE_MASK} pattern={PHONE_PATTERN} />);

            const input = screen.getByTestId('masked-text-input');
            await user.type(input, '1234567890');

            expect(input).toHaveValue('(123) 456-7890');
        });

        it('should reject letters when pattern only allows digits', async () => {
            const user = userEvent.setup();
            renderWithProviders(<MaskedInput mask={PHONE_MASK} pattern={PHONE_PATTERN} />);

            const input = screen.getByTestId('masked-text-input');
            await user.type(input, 'abc1234567890');

            expect(input).toHaveValue('(123) 456-7890');
        });

        it('should advance past separator characters automatically while typing', async () => {
            const user = userEvent.setup();
            renderWithProviders(<MaskedInput mask={PHONE_MASK} pattern={PHONE_PATTERN} />);

            const input = screen.getByTestId('masked-text-input');
            await user.type(input, '123');

            expect(input).toHaveValue('(123) ');
        });

        it('should insert a digit in the middle of an existing value', async () => {
            const user = userEvent.setup();
            renderWithProviders(
                <MaskedInput mask={PHONE_MASK} pattern={PHONE_PATTERN} defaultValue="(123) 456-7890" />,
            );

            const input = screen.getByTestId('masked-text-input') as HTMLInputElement;
            input.focus();
            input.setSelectionRange(6, 6);
            await user.keyboard('0');

            expect(input).toHaveValue('(123) 045-6789');
        });

        it('should remove previous digit on backspace over a mask char', async () => {
            const user = userEvent.setup();
            renderWithProviders(
                <MaskedInput mask={PHONE_MASK} pattern={PHONE_PATTERN} defaultValue="(123) 456-7890" />,
            );

            const input = screen.getByTestId('masked-text-input') as HTMLInputElement;
            input.focus();
            input.setSelectionRange(5, 5);
            await user.keyboard('{backspace}');

            expect(input).toHaveValue('(124) 567-890');
            expect(input.selectionStart).toBe(4);
        });

        it('should remove next digit on delete over a mask char', async () => {
            const user = userEvent.setup();
            renderWithProviders(
                <MaskedInput mask={PHONE_MASK} pattern={PHONE_PATTERN} defaultValue="(123) 456-7890" />,
            );

            const input = screen.getByTestId('masked-text-input') as HTMLInputElement;
            input.focus();
            input.setSelectionRange(4, 4);
            await user.keyboard('{delete}');

            expect(input).toHaveValue('(123) 567-890');
        });

        it('should keep the mask char when backspacing at its position', async () => {
            const user = userEvent.setup();
            renderWithProviders(
                <MaskedInput mask={PHONE_MASK} pattern={PHONE_PATTERN} defaultValue="(123) 456-7890" />,
            );

            const input = screen.getByTestId('masked-text-input') as HTMLInputElement;
            input.focus();
            input.setSelectionRange(1, 1);
            await user.keyboard('{backspace}');

            expect(input).toHaveValue('(123) 456-7890');
        });
    });

    describe('with date mask (YYYY-MM-DD)', () => {
        it('should have an empty value when no defaultValue is provided', () => {
            renderWithProviders(<MaskedInput mask={DATE_MASK} pattern={DATE_PATTERN} />);

            expect(screen.getByTestId('masked-text-input')).toHaveValue('');
        });

        it('should not reposition the cursor on focus when the mask starts with a fillable slot', async () => {
            const user = userEvent.setup();
            renderWithProviders(<MaskedInput mask={DATE_MASK} pattern={DATE_PATTERN} />);

            const input = screen.getByTestId('masked-text-input') as HTMLInputElement;
            await user.click(input);

            expect(input.selectionStart).toBe(0);
        });

        it('should display the defaultValue formatted as a full date', () => {
            renderWithProviders(<MaskedInput mask={DATE_MASK} pattern={DATE_PATTERN} defaultValue="20260219" />);

            expect(screen.getByTestId('masked-text-input')).toHaveValue('2026-02-19');
        });

        it('should accept a pre-formatted defaultValue', () => {
            renderWithProviders(<MaskedInput mask={DATE_MASK} pattern={DATE_PATTERN} defaultValue="2026-02-19" />);

            expect(screen.getByTestId('masked-text-input')).toHaveValue('2026-02-19');
        });

        it('should trim defaultValue chars that exceed the pattern max length', () => {
            renderWithProviders(<MaskedInput mask={DATE_MASK} pattern={DATE_PATTERN} defaultValue="202602191234" />);

            expect(screen.getByTestId('masked-text-input')).toHaveValue('2026-02-19');
        });

        it('should format digits as they are typed', async () => {
            const user = userEvent.setup();
            renderWithProviders(<MaskedInput mask={DATE_MASK} pattern={DATE_PATTERN} />);

            const input = screen.getByTestId('masked-text-input');
            await user.type(input, '20260219');

            expect(input).toHaveValue('2026-02-19');
        });

        it('should advance past separator characters automatically while typing', async () => {
            const user = userEvent.setup();
            renderWithProviders(<MaskedInput mask={DATE_MASK} pattern={DATE_PATTERN} />);

            const input = screen.getByTestId('masked-text-input');
            await user.type(input, '2026');

            expect(input).toHaveValue('2026-');
        });

        it('should remove previous digit on backspace over a mask char', async () => {
            const user = userEvent.setup();
            renderWithProviders(<MaskedInput mask={DATE_MASK} pattern={DATE_PATTERN} defaultValue="20260219" />);

            const input = screen.getByTestId('masked-text-input') as HTMLInputElement;
            input.focus();
            input.setSelectionRange(5, 5);
            await user.keyboard('{backspace}');

            expect(input).toHaveValue('2020-21-9');
        });

        it('should remove next digit on delete over a mask char', async () => {
            const user = userEvent.setup();
            renderWithProviders(<MaskedInput mask={DATE_MASK} pattern={DATE_PATTERN} defaultValue="20260219" />);

            const input = screen.getByTestId('masked-text-input') as HTMLInputElement;
            input.focus();
            input.setSelectionRange(4, 4);
            await user.keyboard('{delete}');

            expect(input).toHaveValue('2026-21-9');
        });
    });

    describe('with date mask and quantifier pattern (YYYY-MM-DD / \\d{4}-\\d{1,2}-\\d{1,2})', () => {
        const QUANTIFIER_DATE_MASK = 'YYYY-MM-DD';
        const QUANTIFIER_DATE_PATTERN = '\\d{4}-\\d{1,2}-\\d{1,2}';

        it('should have an empty value when no defaultValue is provided', () => {
            renderWithProviders(<MaskedInput mask={QUANTIFIER_DATE_MASK} pattern={QUANTIFIER_DATE_PATTERN} />);

            expect(screen.getByTestId('masked-text-input')).toHaveValue('');
        });

        it('should format digits as they are typed', async () => {
            const user = userEvent.setup();
            renderWithProviders(<MaskedInput mask={QUANTIFIER_DATE_MASK} pattern={QUANTIFIER_DATE_PATTERN} />);

            const input = screen.getByTestId('masked-text-input');
            await user.type(input, '20260219');

            expect(input).toHaveValue('2026-02-19');
        });

        it('should display the defaultValue', () => {
            renderWithProviders(
                <MaskedInput mask={QUANTIFIER_DATE_MASK} pattern={QUANTIFIER_DATE_PATTERN} defaultValue="20260219" />,
            );

            expect(screen.getByTestId('masked-text-input')).toHaveValue('2026-02-19');
        });

        it('should reject letters', async () => {
            const user = userEvent.setup();
            renderWithProviders(<MaskedInput mask={QUANTIFIER_DATE_MASK} pattern={QUANTIFIER_DATE_PATTERN} />);

            const input = screen.getByTestId('masked-text-input');
            await user.type(input, 'abcd20260219');

            expect(input).toHaveValue('2026-02-19');
        });
    });

    describe('with postal code mask (A1A 1A1)', () => {
        const POSTAL_MASK = 'A1A 1A1';
        const POSTAL_PATTERN = '[A-Z]\\d[A-Z] \\d[A-Z]\\d';

        it('should have an empty value when no defaultValue is provided', () => {
            renderWithProviders(<MaskedInput mask={POSTAL_MASK} pattern={POSTAL_PATTERN} />);

            expect(screen.getByTestId('masked-text-input')).toHaveValue('');
        });

        it('should format alphanumeric input as it is typed', async () => {
            const user = userEvent.setup();
            renderWithProviders(<MaskedInput mask={POSTAL_MASK} pattern={POSTAL_PATTERN} />);

            const input = screen.getByTestId('masked-text-input');
            await user.type(input, 'H3Z2Y7');

            expect(input).toHaveValue('H3Z 2Y7');
        });

        it('should reject digits in letter slots', async () => {
            const user = userEvent.setup();
            renderWithProviders(<MaskedInput mask={POSTAL_MASK} pattern={POSTAL_PATTERN} />);

            const input = screen.getByTestId('masked-text-input');
            await user.type(input, '13Z2Y7');

            expect(input).toHaveValue('Z2Y 7');
        });

        it('should reject letters in digit slots', async () => {
            const user = userEvent.setup();
            renderWithProviders(<MaskedInput mask={POSTAL_MASK} pattern={POSTAL_PATTERN} />);

            const input = screen.getByTestId('masked-text-input');
            await user.type(input, 'HXZ2Y7');

            expect(input).toHaveValue('H2Y 7');
        });

        it('should display the defaultValue', () => {
            renderWithProviders(<MaskedInput mask={POSTAL_MASK} pattern={POSTAL_PATTERN} defaultValue="H3Z2Y7" />);

            expect(screen.getByTestId('masked-text-input')).toHaveValue('H3Z 2Y7');
        });
    });

    describe('with ZIP+4 mask (NNNNN-NNNN)', () => {
        const ZIP_PLUS4_MASK = 'NNNNN-NNNN';
        const ZIP_PLUS4_PATTERN = '\\d\\d\\d\\d\\d-\\d\\d\\d\\d';

        it('should have an empty value when no defaultValue is provided', () => {
            renderWithProviders(<MaskedInput mask={ZIP_PLUS4_MASK} pattern={ZIP_PLUS4_PATTERN} />);

            expect(screen.getByTestId('masked-text-input')).toHaveValue('');
        });

        it('should format digits as they are typed', async () => {
            const user = userEvent.setup();
            renderWithProviders(<MaskedInput mask={ZIP_PLUS4_MASK} pattern={ZIP_PLUS4_PATTERN} />);

            const input = screen.getByTestId('masked-text-input');
            await user.type(input, '123456789');

            expect(input).toHaveValue('12345-6789');
        });

        it('should display the defaultValue', () => {
            renderWithProviders(
                <MaskedInput mask={ZIP_PLUS4_MASK} pattern={ZIP_PLUS4_PATTERN} defaultValue="123456789" />,
            );

            expect(screen.getByTestId('masked-text-input')).toHaveValue('12345-6789');
        });
    });

    it('should have controllable data-testid', () => {
        renderWithProviders(<MaskedInput data-testid="custom-test-id" mask={DATE_MASK} pattern={DATE_PATTERN} />);

        expect(screen.getByTestId('custom-test-id').tagName).toBe('INPUT');
    });

    it('should not show validation message when input is empty and required onBlur', async () => {
        const user = userEvent.setup();
        const { getByTestId: byTestId, queryByTestId } = renderWithProviders(
            <form>
                <MaskedInput
                    mask={PHONE_MASK}
                    pattern={PHONE_PATTERN}
                    label="test"
                    required
                    validationErrorMessage="This field is required"
                />
                <button data-testid="submit-button" type="submit">Submit</button>
            </form>,
        );

        await user.clear(byTestId('masked-text-input'));
        await user.tab();
        expect(queryByTestId('invalid-field')).toBeNull();

        await user.click(byTestId('submit-button'));
        expect(byTestId('invalid-field')).not.toBeNull();
    });

    it('should log an error when pattern is not a valid regex', () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {
        });

        renderWithProviders(<MaskedInput mask={DATE_MASK} pattern="[invalid" />);

        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('[invalid'));
        consoleSpy.mockRestore();
    });

    describe('with time mask (HH-MM-SS)', () => {
        const TIME_MASK = 'HH-MM-SS';
        const TIME_PATTERN = '\\d\\d-\\d\\d-\\d\\d';

        it('should have an empty value when no defaultValue is provided', () => {
            renderWithProviders(<MaskedInput mask={TIME_MASK} pattern={TIME_PATTERN} />);

            expect(screen.getByTestId('masked-text-input')).toHaveValue('');
        });

        it('should format digits as they are typed', async () => {
            const user = userEvent.setup();
            renderWithProviders(<MaskedInput mask={TIME_MASK} pattern={TIME_PATTERN} />);

            const input = screen.getByTestId('masked-text-input');
            await user.type(input, '142536');

            expect(input).toHaveValue('14-25-36');
        });

        it('should display the defaultValue', () => {
            renderWithProviders(<MaskedInput mask={TIME_MASK} pattern={TIME_PATTERN} defaultValue="142536" />);

            expect(screen.getByTestId('masked-text-input')).toHaveValue('14-25-36');
        });

        it('should advance past both separators automatically while typing', async () => {
            const user = userEvent.setup();
            renderWithProviders(<MaskedInput mask={TIME_MASK} pattern={TIME_PATTERN} />);

            const input = screen.getByTestId('masked-text-input');
            await user.type(input, '1425');

            expect(input).toHaveValue('14-25-');
        });
    });

    describe('with credit card mask (NNNN NNNN NNNN NNNN)', () => {
        const CC_MASK = 'NNNN NNNN NNNN NNNN';
        const CC_PATTERN = '\\d\\d\\d\\d \\d\\d\\d\\d \\d\\d\\d\\d \\d\\d\\d\\d';

        it('should have an empty value when no defaultValue is provided', () => {
            renderWithProviders(<MaskedInput mask={CC_MASK} pattern={CC_PATTERN} />);

            expect(screen.getByTestId('masked-text-input')).toHaveValue('');
        });

        it('should format 16 digits as they are typed', async () => {
            const user = userEvent.setup();
            renderWithProviders(<MaskedInput mask={CC_MASK} pattern={CC_PATTERN} />);

            const input = screen.getByTestId('masked-text-input');
            await user.type(input, '1234567890123456');

            expect(input).toHaveValue('1234 5678 9012 3456');
        });

        it('should display the defaultValue', () => {
            renderWithProviders(<MaskedInput mask={CC_MASK} pattern={CC_PATTERN} defaultValue="1234567890123456" />);

            expect(screen.getByTestId('masked-text-input')).toHaveValue('1234 5678 9012 3456');
        });

        it('should trim digits beyond 16', () => {
            renderWithProviders(
                <MaskedInput mask={CC_MASK} pattern={CC_PATTERN} defaultValue="12345678901234567890" />,
            );

            expect(screen.getByTestId('masked-text-input')).toHaveValue('1234 5678 9012 3456');
        });
    });

    describe('with SSN mask (NNN-NN-NNNN)', () => {
        const SSN_MASK = 'NNN-NN-NNNN';
        const SSN_PATTERN = '\\d\\d\\d-\\d\\d-\\d\\d\\d\\d';

        it('should have an empty value when no defaultValue is provided', () => {
            renderWithProviders(<MaskedInput mask={SSN_MASK} pattern={SSN_PATTERN} />);

            expect(screen.getByTestId('masked-text-input')).toHaveValue('');
        });

        it('should format 9 digits as they are typed', async () => {
            const user = userEvent.setup();
            renderWithProviders(<MaskedInput mask={SSN_MASK} pattern={SSN_PATTERN} />);

            const input = screen.getByTestId('masked-text-input');
            await user.type(input, '123456789');

            expect(input).toHaveValue('123-45-6789');
        });

        it('should display the defaultValue', () => {
            renderWithProviders(<MaskedInput mask={SSN_MASK} pattern={SSN_PATTERN} defaultValue="123456789" />);

            expect(screen.getByTestId('masked-text-input')).toHaveValue('123-45-6789');
        });

        it('should remove previous digit on backspace over a mask char', async () => {
            const user = userEvent.setup();
            renderWithProviders(<MaskedInput mask={SSN_MASK} pattern={SSN_PATTERN} defaultValue="123456789" />);

            const input = screen.getByTestId('masked-text-input') as HTMLInputElement;
            input.focus();
            input.setSelectionRange(4, 4);
            await user.keyboard('{backspace}');

            expect(input).toHaveValue('124-56-789');
            expect(input.selectionStart).toBe(3);
        });

        it('should remove next digit on delete over a mask char', async () => {
            const user = userEvent.setup();
            renderWithProviders(<MaskedInput mask={SSN_MASK} pattern={SSN_PATTERN} defaultValue="123456789" />);

            const input = screen.getByTestId('masked-text-input') as HTMLInputElement;
            input.focus();
            input.setSelectionRange(3, 3);
            await user.keyboard('{delete}');

            expect(input).toHaveValue('123-56-789');
        });
    });

    describe('with mixed separators mask (NNN-NNN NN)', () => {
        const MIXED_MASK = 'NNN-NNN NN';
        const MIXED_PATTERN = '\\d\\d\\d-\\d\\d\\d \\d\\d';

        it('should have an empty value when no defaultValue is provided', () => {
            renderWithProviders(<MaskedInput mask={MIXED_MASK} pattern={MIXED_PATTERN} />);

            expect(screen.getByTestId('masked-text-input')).toHaveValue('');
        });

        it('should format digits as they are typed', async () => {
            const user = userEvent.setup();
            renderWithProviders(<MaskedInput mask={MIXED_MASK} pattern={MIXED_PATTERN} />);

            const input = screen.getByTestId('masked-text-input');
            await user.type(input, '12345678');

            expect(input).toHaveValue('123-456 78');
        });

        it('should display the defaultValue', () => {
            renderWithProviders(<MaskedInput mask={MIXED_MASK} pattern={MIXED_PATTERN} defaultValue="12345678" />);

            expect(screen.getByTestId('masked-text-input')).toHaveValue('123-456 78');
        });
    });

    describe('with forward slash separator (DD/MM/YYYY)', () => {
        const DATE_SLASH_MASK = 'DD/MM/YYYY';
        const DATE_SLASH_PATTERN = '\\d\\d/\\d\\d/\\d\\d\\d\\d';

        it('should treat / as a separator by default', async () => {
            const user = userEvent.setup();
            renderWithProviders(<MaskedInput mask={DATE_SLASH_MASK} pattern={DATE_SLASH_PATTERN} />);

            const input = screen.getByTestId('masked-text-input');
            await user.type(input, '20022026');

            expect(input).toHaveValue('20/02/2026');
        });

        it('should display the defaultValue with / separator by default', () => {
            renderWithProviders(
                <MaskedInput mask={DATE_SLASH_MASK} pattern={DATE_SLASH_PATTERN} defaultValue="20022026" />,
            );

            expect(screen.getByTestId('masked-text-input')).toHaveValue('20/02/2026');
        });
    });

    describe('with custom separators prop', () => {
        it('should treat . as a separator when separators="."', async () => {
            const user = userEvent.setup();
            renderWithProviders(<MaskedInput mask="NNN.NNN.NNN" pattern={'\\d\\d\\d\\.\\d\\d\\d\\.\\d\\d\\d'} separators="." />);

            const input = screen.getByTestId('masked-text-input');
            await user.type(input, '123456789');

            expect(input).toHaveValue('123.456.789');
        });
    });
});
