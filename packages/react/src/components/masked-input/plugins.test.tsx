import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event/dist/cjs/index.js';
import { renderWithProviders } from '../../test-utils/renderer';
import { MaskedInput } from './masked-input';

const PHONE_MASK = '(___) ___-____';
const PHONE_PATTERN = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

function getMaskedInput(): HTMLInputElement {
    return screen.getByTestId('masked-text-input');
}

describe('deleteNextMaskedCharPlugin', () => {
    it('deletes the preceding non-fixed char when backspacing onto a fixed char', async () => {
        const user = userEvent.setup();
        renderWithProviders(<MaskedInput mask={PHONE_MASK} pattern={PHONE_PATTERN} defaultValue="1234567890" />);
        const input = getMaskedInput();
        input.focus();
        input.setSelectionRange(4, 4);

        await user.keyboard('{backspace}');

        expect(input).toHaveValue('(124) 567-890');
    });

    it('deletes the preceding non-fixed char when backspacing over consecutive fixed chars', async () => {
        const user = userEvent.setup();
        renderWithProviders(<MaskedInput mask={PHONE_MASK} pattern={PHONE_PATTERN} defaultValue="1234567890" />);
        const input = getMaskedInput();
        input.focus();
        input.setSelectionRange(5, 5);

        await user.keyboard('{backspace}');

        expect(input).toHaveValue('(124) 567-890');
    });

    it(
        'deletes the preceding non-fixed char when backspacing from after multiple consecutive fixed chars',
        async () => {
            const user = userEvent.setup();
            renderWithProviders(<MaskedInput mask={PHONE_MASK} pattern={PHONE_PATTERN} defaultValue="1234567890" />);
            const input = getMaskedInput();
            input.focus();
            input.setSelectionRange(6, 6);

            await user.keyboard('{backspace}');

            expect(input).toHaveValue('(124) 567-890');
        },
    );

    it('deletes the following non-fixed char when pressing Delete on a fixed char', async () => {
        const user = userEvent.setup();
        renderWithProviders(<MaskedInput mask={PHONE_MASK} pattern={PHONE_PATTERN} defaultValue="1234" />);
        const input = getMaskedInput();
        input.focus();
        input.setSelectionRange(4, 4);

        await user.keyboard('{Delete}');

        expect(input).toHaveValue('(123');
    });

    it(
        'does nothing when backspacing at the start of the value with no non-fixed char to the left',
        async () => {
            const user = userEvent.setup();
            renderWithProviders(
                <MaskedInput mask={PHONE_MASK} pattern={PHONE_PATTERN} defaultValue="1234567890" />,
            );
            const input = getMaskedInput();
            input.focus();
            input.setSelectionRange(1, 1);

            await user.keyboard('{Backspace}');

            expect(input).toHaveValue('(123) 456-7890');
        },
    );

    it('does not delete any real char when pressing Delete with no non-fixed char to the right', async () => {
        const user = userEvent.setup();
        renderWithProviders(<MaskedInput mask={PHONE_MASK} pattern={PHONE_PATTERN} defaultValue="123" />);
        const input = getMaskedInput();
        input.focus();
        input.setSelectionRange(4, 4);

        await user.keyboard('{Delete}');

        expect(input).toHaveValue('(123');
    });

    it('does not interfere when backspacing on a non-fixed char', async () => {
        const user = userEvent.setup();
        renderWithProviders(<MaskedInput mask={PHONE_MASK} pattern={PHONE_PATTERN} defaultValue="123" />);
        const input = getMaskedInput();
        input.focus();
        input.setSelectionRange(4, 4);

        await user.keyboard('{Backspace}');

        expect(input).toHaveValue('(12');
    });

    it('does not interfere when there is a selection', async () => {
        const user = userEvent.setup();
        renderWithProviders(<MaskedInput mask={PHONE_MASK} pattern={PHONE_PATTERN} defaultValue="123" />);
        const input = getMaskedInput();
        input.focus();
        input.setSelectionRange(4, 6);

        await user.keyboard('{Backspace}');

        expect(input).toHaveValue('(12');
    });
});
