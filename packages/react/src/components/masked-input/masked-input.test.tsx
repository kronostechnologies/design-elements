import { type RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { FC } from 'react';
import { renderWithProviders } from '../../test-utils/renderer';
import { useDateMask, usePostalCodeMask } from './common-masks';
import { MaskedInput, type MaskedInputProps } from './masked-input';

const PHONE_MASK = '(___) ___-____';
const PHONE_PATTERN = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

function getMaskedInput(): HTMLInputElement {
    return screen.getByTestId('masked-text-input');
}

describe('MaskedInput', () => {
    const A_MASK = '____';
    const A_PATTERN = /^.{0,4}$/;

    it('has controllable data-testid', () => {
        renderWithProviders(<MaskedInput data-testid="custom-test-id" mask={A_MASK} pattern={A_PATTERN} />);

        expect(screen.getByTestId('custom-test-id').tagName).toBe('INPUT');
    });

    it('does not show validation message onBlur when input is empty and required', async () => {
        const user = userEvent.setup();
        renderWithProviders(
            <form>
                <MaskedInput
                    mask={A_MASK}
                    pattern={A_PATTERN}
                    label="test"
                    required
                    validationErrorMessage="This field is required"
                />
                <button data-testid="submit-button" type="submit">Submit</button>
            </form>,
        );

        await user.clear(getMaskedInput());
        await user.tab();
        expect(screen.queryByTestId('invalid-field')).toBeNull();

        await user.click(screen.getByTestId('submit-button'));
        expect(screen.getByTestId('invalid-field')).not.toBeNull();
    });

    describe('with phone mask', () => {
        function renderPhoneInput(props?: Partial<MaskedInputProps>): RenderResult {
            return renderWithProviders(<MaskedInput mask={PHONE_MASK} pattern={PHONE_PATTERN} {...props} />);
        }

        it('has an empty value when no defaultValue is provided', () => {
            renderPhoneInput();

            expect(getMaskedInput()).toHaveValue('');
        });

        it('formats the defaultValue', () => {
            renderPhoneInput({ defaultValue: '123AAA4567890' });

            expect(getMaskedInput()).toHaveValue('(123) 456-7890');
        });

        it('accepts a pre-formatted defaultValue', () => {
            renderPhoneInput({ defaultValue: '(123) 456-7890' });

            expect(getMaskedInput()).toHaveValue('(123) 456-7890');
        });

        it('trims defaultValue chars that exceed the pattern max length', () => {
            renderPhoneInput({ defaultValue: '12345678901234' });

            expect(getMaskedInput()).toHaveValue('(123) 456-7890');
        });

        it('formats digits as they are typed', async () => {
            const user = userEvent.setup();
            renderPhoneInput();

            const input = getMaskedInput();
            await user.type(input, '1234567890');

            expect(input).toHaveValue('(123) 456-7890');
        });

        it('automatically inserts trailing fixed chars', async () => {
            const user = userEvent.setup();
            renderPhoneInput();

            const input = getMaskedInput();
            await user.type(input, '123');

            expect(input).toHaveValue('(123) ');
        });

        it('rejects letters when pattern only allows digits', async () => {
            const user = userEvent.setup();
            renderPhoneInput();

            const input = getMaskedInput();
            await user.type(input, 'abc1234567890');

            expect(input).toHaveValue('(123) 456-7890');
        });

        it('inserts a digit in the middle of an existing full value will shift value and trim last char', async () => {
            const user = userEvent.setup();
            renderPhoneInput({ defaultValue: '(123) 456-7890' });

            const input = getMaskedInput();
            input.focus();
            input.setSelectionRange(6, 6);
            await user.keyboard('0');

            expect(input).toHaveValue('(123) 045-6789');
        });

        it('reinserts mask char when backspacing on the first mask char', async () => {
            const user = userEvent.setup();
            renderPhoneInput({ defaultValue: '(123) 456-7890' });

            const input = getMaskedInput();
            input.focus();
            input.setSelectionRange(1, 1);
            await user.keyboard('{backspace}');

            expect(input).toHaveValue('(123) 456-7890');
        });

        it('calls onChange with raw value stripped of separators', async () => {
            const user = userEvent.setup();
            const onChange = jest.fn();
            renderPhoneInput({ onChange });

            const input = getMaskedInput();
            await user.type(input, '1234567890');

            expect(onChange).toHaveBeenLastCalledWith('1234567890', '(123) 456-7890', expect.any(Object));
        });

        it('removes previous digit following mask char removal when removing char with backspace', async () => {
            const user = userEvent.setup();
            renderPhoneInput({ defaultValue: '(123) 456-7890' });

            const input = getMaskedInput();
            input.focus();
            input.setSelectionRange(5, 5);
            await user.keyboard('{backspace}');

            expect(input).toHaveValue('(124) 567-890');
        });

        it('removes next digit following mask char removal when removing char with delete', async () => {
            const user = userEvent.setup();
            renderPhoneInput({ defaultValue: '(123) 456-7890' });

            const input = getMaskedInput();
            input.focus();
            input.setSelectionRange(4, 4);
            await user.keyboard('{delete}');

            expect(input).toHaveValue('(123) 567-890');
        });
    });

    describe('with date mask (YYYY-MM-DD)', () => {
        type DateMaskedInputProps = Partial<MaskedInputProps> & { min?: Date; max?: Date };

        const DateMaskedInput: FC<DateMaskedInputProps> = ({ min, max, ...props }) => {
            const { dateMask } = useDateMask({ format: 'YYYY-MM-DD', min, max });
            return <MaskedInput {...props} dateMask={dateMask} />;
        };

        it('has an empty value when no defaultValue is provided', () => {
            renderWithProviders(<DateMaskedInput />);

            expect(getMaskedInput()).toHaveValue('');
        });

        it('does not reposition the cursor on focus when the mask starts with a fillable slot', async () => {
            const user = userEvent.setup();
            renderWithProviders(<DateMaskedInput />);

            const input = getMaskedInput();
            await user.click(input);

            expect(input.selectionStart).toBe(0);
        });

        it('displays the defaultValue formatted as a full date', () => {
            renderWithProviders(<DateMaskedInput defaultValue="20260219" />);

            expect(getMaskedInput()).toHaveValue('2026-02-19');
        });

        it('accepts a pre-formatted defaultValue', () => {
            renderWithProviders(<DateMaskedInput defaultValue="2026-02-19" />);

            expect(getMaskedInput()).toHaveValue('2026-02-19');
        });

        it('trims defaultValue chars that exceed the pattern max length', () => {
            renderWithProviders(<DateMaskedInput defaultValue="202602191234" />);

            expect(getMaskedInput()).toHaveValue('2026-02-19');
        });

        it('formats digits as they are typed', async () => {
            const user = userEvent.setup();
            renderWithProviders(<DateMaskedInput />);

            const input = getMaskedInput();
            await user.type(input, '20260219');

            expect(input).toHaveValue('2026-02-19');
        });

        it('rejects letters', async () => {
            const user = userEvent.setup();
            renderWithProviders(<DateMaskedInput />);

            const input = getMaskedInput();
            await user.type(input, 'abcd20260219');

            expect(input).toHaveValue('2026-02-19');
        });

        it('resets to min date when a fully entered date is before the minimum', async () => {
            const user = userEvent.setup();
            renderWithProviders(<DateMaskedInput min={new Date(2025, 0, 1)} />);

            const input = getMaskedInput();
            await user.type(input, '20241220');

            expect(input).toHaveValue('2025-01-01');
        });

        it('does not reset to min date when a fully entered date is after the minimum', async () => {
            const user = userEvent.setup();
            renderWithProviders(<DateMaskedInput min={new Date(2025, 0, 1)} />);

            const input = getMaskedInput();
            await user.type(input, '20251220');

            expect(input).toHaveValue('2025-12-20');
        });

        it('resets to max date when a fully entered date is after the max', async () => {
            const user = userEvent.setup();
            renderWithProviders(<DateMaskedInput max={new Date(2025, 0, 1)} />);

            const input = getMaskedInput();
            await user.type(input, '20250710');

            expect(input).toHaveValue('2025-01-01');
        });

        it('does not reset to max date when a fully entered date is before the max', async () => {
            const user = userEvent.setup();
            renderWithProviders(<DateMaskedInput max={new Date(2025, 0, 1)} />);

            const input = getMaskedInput();
            await user.type(input, '20241210');

            expect(input).toHaveValue('2024-12-10');
        });
    });

    describe('with locale-dependent date mask format', () => {
        const LocaleDateMaskedInput: FC<Partial<MaskedInputProps>> = (props) => {
            const { dateMask } = useDateMask({});
            return <MaskedInput {...props} dateMask={dateMask} />;
        };

        it('uses YYYY-MM-DD mask format when locale is en', () => {
            renderWithProviders(<LocaleDateMaskedInput />, undefined, 'en');

            const maskText = screen.getByTestId('unfilled-mask');

            expect(maskText).toHaveTextContent('YYYY-MM-DD');
        });

        it('can fill date when locale is en', async () => {
            const user = userEvent.setup();
            renderWithProviders(<LocaleDateMaskedInput />, undefined, 'en');

            const input = getMaskedInput();
            await user.type(input, '20241210');

            expect(input).toHaveValue('2024-12-10');
        });

        it('uses AAAA-MM-JJ mask format when locale is fr', () => {
            renderWithProviders(<LocaleDateMaskedInput />, undefined, 'fr');

            const maskText = screen.getByTestId('unfilled-mask');

            expect(maskText).toHaveTextContent('AAAA-MM-JJ');
        });

        it('can fill date when locale is fr', async () => {
            const user = userEvent.setup();
            renderWithProviders(<LocaleDateMaskedInput />, undefined, 'fr');

            const input = getMaskedInput();
            await user.type(input, '20241210');

            expect(input).toHaveValue('2024-12-10');
        });
    });

    describe('with date mask (DD/MM/YYYY)', () => {
        const DateSlashMaskedInput: FC<Partial<MaskedInputProps>> = (props) => {
            const { dateMask } = useDateMask({ format: 'DD/MM/YYYY', separator: '/' });
            return <MaskedInput {...props} dateMask={dateMask} />;
        };

        it('uses / as a separator', async () => {
            const user = userEvent.setup();
            renderWithProviders(<DateSlashMaskedInput />);

            const input = getMaskedInput();
            await user.type(input, '20022026');

            expect(input).toHaveValue('20/02/2026');
        });

        it('formats the defaultValue with / separator', () => {
            renderWithProviders(<DateSlashMaskedInput defaultValue="20022026" />);

            expect(getMaskedInput()).toHaveValue('20/02/2026');
        });
    });

    describe('with postal code mask (A1A 1A1)', () => {
        const PostalCodeMaskedInput: FC<Partial<MaskedInputProps>> = (props) => {
            const postalCodeProps = usePostalCodeMask();
            return <MaskedInput {...props} {...postalCodeProps} />;
        };

        it('has an empty value when no defaultValue is provided', () => {
            renderWithProviders(<PostalCodeMaskedInput />);

            expect(getMaskedInput()).toHaveValue('');
        });

        it('formats alphanumeric input as it is typed', async () => {
            const user = userEvent.setup();
            renderWithProviders(<PostalCodeMaskedInput />);

            const input = getMaskedInput();
            await user.type(input, 'H3Z2Y7');

            expect(input).toHaveValue('H3Z 2Y7');
        });

        it('rejects digits in letter slots', async () => {
            const user = userEvent.setup();
            renderWithProviders(<PostalCodeMaskedInput />);

            const input = getMaskedInput();
            await user.type(input, '13Z2Y7');

            expect(input).toHaveValue('Z2Y 7');
        });

        it('rejects letters in digit slots', async () => {
            const user = userEvent.setup();
            renderWithProviders(<PostalCodeMaskedInput />);

            const input = getMaskedInput();
            await user.type(input, 'HXZ2Y7');

            expect(input).toHaveValue('H2Y 7');
        });

        it('displays the defaultValue', () => {
            renderWithProviders(<PostalCodeMaskedInput defaultValue="H3Z2Y7" />);

            expect(getMaskedInput()).toHaveValue('H3Z 2Y7');
        });

        it('formats to uppercase as it is typed', async () => {
            const user = userEvent.setup();
            renderWithProviders(<PostalCodeMaskedInput />);

            const input = getMaskedInput();
            await user.type(input, 'h3z2y7');

            expect(input).toHaveValue('H3Z 2Y7');
        });

        describe('character deletion', () => {
            it(
                'deletes the preceding non-fixed char when backspacing onto the fixed space and removes now invalid char', // eslint-disable-line max-len
                async () => {
                    const user = userEvent.setup();
                    renderWithProviders(<PostalCodeMaskedInput defaultValue="H3Z2Y7" />);
                    const input = getMaskedInput();
                    input.focus();
                    input.setSelectionRange(4, 4);

                    await user.keyboard('{Backspace}');

                    expect(input).toHaveValue('H3Y 7');
                },
            );

            it(
                'deletes the following non-fixed char when pressing Delete on the fixed space and removes now invalid char', // eslint-disable-line max-len
                async () => {
                    const user = userEvent.setup();
                    renderWithProviders(<PostalCodeMaskedInput defaultValue="H3Z2Y7" />);
                    const input = getMaskedInput();
                    input.focus();
                    input.setSelectionRange(3, 3);

                    await user.keyboard('{Delete}');

                    expect(input).toHaveValue('H3Z 7');
                },
            );

            it('does not delete any real char when pressing Delete past the trailing fixed space', async () => {
                const user = userEvent.setup();
                renderWithProviders(<PostalCodeMaskedInput defaultValue="H3Z " />);
                const input = getMaskedInput();
                input.focus();
                input.setSelectionRange(4, 4);

                await user.keyboard('{Delete}');

                expect(input).toHaveValue('H3Z ');
            });

            it('also deletes now invalid characters when backspacing on a non-fixed char', async () => {
                const user = userEvent.setup();
                renderWithProviders(<PostalCodeMaskedInput defaultValue="H3Z2Y7" />);
                const input = getMaskedInput();
                input.focus();
                input.setSelectionRange(6, 6);

                await user.keyboard('{Backspace}');

                expect(input).toHaveValue('H3Z 2');
            });

            it('also deletes now invalid characters when backspacing on a selection', async () => {
                const user = userEvent.setup();
                renderWithProviders(<PostalCodeMaskedInput defaultValue="H3Z2Y7" />);
                const input = getMaskedInput();
                input.focus();
                input.setSelectionRange(4, 7);

                await user.keyboard('{Backspace}');

                expect(input).toHaveValue('H3Z');
            });
        });
    });

    describe('with time mask (HH-MM-SS)', () => {
        const TIME_MASK = 'HH-MM-SS';
        const TIME_PATTERN: Array<RegExp | string> = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

        it('has an empty value when no defaultValue is provided', () => {
            renderWithProviders(<MaskedInput mask={TIME_MASK} pattern={TIME_PATTERN} />);

            expect(getMaskedInput()).toHaveValue('');
        });

        it('formats digits as they are typed', async () => {
            const user = userEvent.setup();
            renderWithProviders(<MaskedInput mask={TIME_MASK} pattern={TIME_PATTERN} />);

            const input = getMaskedInput();
            await user.type(input, '142536');

            expect(input).toHaveValue('14-25-36');
        });

        it('displays the defaultValue', () => {
            renderWithProviders(<MaskedInput mask={TIME_MASK} pattern={TIME_PATTERN} defaultValue="142536" />);

            expect(getMaskedInput()).toHaveValue('14-25-36');
        });
    });

    describe('with credit card mask (NNNN NNNN NNNN NNNN)', () => {
        const CC_MASK = 'NNNN NNNN NNNN NNNN';
        const CC_PATTERN: Array<RegExp | string> = [/\d/,
            /\d/,
            /\d/,
            /\d/,
            ' ',
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            ' ',
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            ' ',
            /\d/,
            /\d/,
            /\d/,
            /\d/];

        it('has an empty value when no defaultValue is provided', () => {
            renderWithProviders(<MaskedInput mask={CC_MASK} pattern={CC_PATTERN} />);

            expect(getMaskedInput()).toHaveValue('');
        });

        it('formats 16 digits as they are typed', async () => {
            const user = userEvent.setup();
            renderWithProviders(<MaskedInput mask={CC_MASK} pattern={CC_PATTERN} />);

            const input = getMaskedInput();
            await user.type(input, '1234567890123456');

            expect(input).toHaveValue('1234 5678 9012 3456');
        });

        it('displays the defaultValue', () => {
            renderWithProviders(
                <MaskedInput mask={CC_MASK} pattern={CC_PATTERN} defaultValue="1234567890123456" />,
            );

            expect(getMaskedInput()).toHaveValue('1234 5678 9012 3456');
        });

        it('trims digits beyond 16', () => {
            renderWithProviders(
                <MaskedInput mask={CC_MASK} pattern={CC_PATTERN} defaultValue="12345678901234567890" />,
            );

            expect(getMaskedInput()).toHaveValue('1234 5678 9012 3456');
        });
    });

    describe('with SSN mask (NNN-NN-NNNN)', () => {
        const SSN_MASK = 'NNN-NN-NNNN';
        const SSN_PATTERN: Array<RegExp | string> = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

        it('has an empty value when no defaultValue is provided', () => {
            renderWithProviders(<MaskedInput mask={SSN_MASK} pattern={SSN_PATTERN} />);

            expect(getMaskedInput()).toHaveValue('');
        });

        it('formats 9 digits as they are typed', async () => {
            const user = userEvent.setup();
            renderWithProviders(<MaskedInput mask={SSN_MASK} pattern={SSN_PATTERN} />);

            const input = getMaskedInput();
            await user.type(input, '123456789');

            expect(input).toHaveValue('123-45-6789');
        });

        it('displays the defaultValue', () => {
            renderWithProviders(<MaskedInput mask={SSN_MASK} pattern={SSN_PATTERN} defaultValue="123456789" />);

            expect(getMaskedInput()).toHaveValue('123-45-6789');
        });
    });

    describe('with mixed separators mask (NNN-NNN NN)', () => {
        const MIXED_MASK = 'NNN-NNN NN';
        const MIXED_PATTERN: Array<RegExp | string> = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, ' ', /\d/, /\d/];

        it('has an empty value when no defaultValue is provided', () => {
            renderWithProviders(<MaskedInput mask={MIXED_MASK} pattern={MIXED_PATTERN} />);

            expect(getMaskedInput()).toHaveValue('');
        });

        it('formats digits as they are typed', async () => {
            const user = userEvent.setup();
            renderWithProviders(<MaskedInput mask={MIXED_MASK} pattern={MIXED_PATTERN} />);

            const input = getMaskedInput();
            await user.type(input, '12345678');

            expect(input).toHaveValue('123-456 78');
        });

        it('displays the defaultValue', () => {
            renderWithProviders(<MaskedInput mask={MIXED_MASK} pattern={MIXED_PATTERN} defaultValue="12345678" />);

            expect(getMaskedInput()).toHaveValue('123-456 78');
        });
    });

    describe('with custom separator', () => {
        const DOT_MASK = 'NNNxNNNxNNN';
        const DOT_PATTERN: Array<RegExp | string> = [/\d/, /\d/, /\d/, 'x', /\d/, /\d/, /\d/, 'x', /\d/, /\d/, /\d/];

        it('treats x as a separator when separators="x"', async () => {
            const user = userEvent.setup();
            renderWithProviders(
                <MaskedInput mask={DOT_MASK} pattern={DOT_PATTERN} separators="x" />,
            );

            const input = getMaskedInput();
            await user.type(input, '123456789');

            expect(input).toHaveValue('123x456x789');
        });

        it('passes rawValue without the custom separator to onChange', async () => {
            const user = userEvent.setup();
            const onChange = jest.fn();
            renderWithProviders(
                <MaskedInput mask={DOT_MASK} pattern={DOT_PATTERN} separators="x" onChange={onChange} />,
            );

            const input = getMaskedInput();
            await user.type(input, '123456789');

            expect(onChange).toHaveBeenLastCalledWith('123456789', '123x456x789', expect.any(Object));
        });
    });
});
