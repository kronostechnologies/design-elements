import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event/dist/cjs/index.js';
import { renderWithProviders } from '../../test-utils/renderer';
import { MaskedInput } from './masked-input';

const PHONE_MASK = '(___) ___-____';
const PHONE_PATTERN = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

function getMaskedInput(): HTMLInputElement {
    return screen.getByTestId('masked-text-input');
}

describe('addTrailingFixedCharsPostprocessor', () => {
    it('does not re-add trailing fixed chars after deletion', async () => {
        const user = userEvent.setup();
        renderWithProviders(<MaskedInput mask={PHONE_MASK} pattern={PHONE_PATTERN} defaultValue="1234" />);
        const input = getMaskedInput();
        input.focus();
        input.setSelectionRange(7, 7);

        await user.keyboard('{Backspace}');

        expect(input).toHaveValue('(123');
    });

    it('adds trailing fixed chars when replacing a multi-char selection with fewer chars', async () => {
        const user = userEvent.setup();
        renderWithProviders(<MaskedInput mask={PHONE_MASK} pattern={PHONE_PATTERN} defaultValue="123456" />);
        const input = getMaskedInput();
        input.focus();
        input.setSelectionRange(3, 9);

        await user.keyboard('7');

        expect(input).toHaveValue('(127) ');
    });

    it('does not re-add trailing fixed chars after forward deletion', async () => {
        const user = userEvent.setup();
        renderWithProviders(<MaskedInput mask={PHONE_MASK} pattern={PHONE_PATTERN} defaultValue="1234" />);
        const input = getMaskedInput();
        input.focus();
        input.setSelectionRange(6, 6);

        await user.keyboard('{Delete}');

        expect(input).toHaveValue('(123');
    });

    it('does not re-add trailing fixed chars when deleting a multi-char selection', async () => {
        const user = userEvent.setup();
        renderWithProviders(<MaskedInput mask={PHONE_MASK} pattern={PHONE_PATTERN} defaultValue="123456" />);
        const input = getMaskedInput();
        input.focus();
        input.setSelectionRange(6, 9);

        await user.keyboard('{Backspace}');

        expect(input).toHaveValue('(123');
    });

    it(
        'adds trailing fixed chars at the dash boundary when replacing a selection with fewer chars',
        async () => {
            const user = userEvent.setup();
            renderWithProviders(<MaskedInput mask={PHONE_MASK} pattern={PHONE_PATTERN} defaultValue="1234567" />);
            const input = getMaskedInput();
            input.focus();
            input.setSelectionRange(8, 11);

            await user.keyboard('6');

            expect(input).toHaveValue('(123) 456-');
        },
    );
});
