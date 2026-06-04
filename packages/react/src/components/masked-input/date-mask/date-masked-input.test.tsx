import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../test-utils/renderer';
import { DateMaskedInput } from './date-masked-input';

function getInput(): HTMLInputElement {
    return screen.getByTestId('masked-text-input');
}

describe('DateMaskedInput', () => {
    it('renders an empty input by default', () => {
        renderWithProviders(<DateMaskedInput />);

        expect(getInput()).toHaveValue('');
    });

    it('renders with a label', () => {
        renderWithProviders(<DateMaskedInput label="Date" />);

        expect(screen.getByText('Date')).toBeInTheDocument();
    });

    describe('with format yyyy-mm-dd', () => {
        it('formats digits as they are typed', async () => {
            const user = userEvent.setup();
            renderWithProviders(<DateMaskedInput format="yyyy-mm-dd" />);

            await user.type(getInput(), '20260219');

            expect(getInput()).toHaveValue('2026-02-19');
        });

        it(
            'calls onChange with a parsed Date, rawValue and formattedValue when a complete date is entered',
            async () => {
                const user = userEvent.setup();
                const onChange = jest.fn();
                renderWithProviders(<DateMaskedInput format="yyyy-mm-dd" onChange={onChange} />);

                await user.type(getInput(), '20260219');

                expect(onChange).toHaveBeenLastCalledWith(
                    new Date(2026, 1, 19),
                    '20260219',
                    '2026-02-19',
                );
            },
        );

        it('calls onChange with null when the date is incomplete', async () => {
            const user = userEvent.setup();
            const onChange = jest.fn();
            renderWithProviders(<DateMaskedInput format="yyyy-mm-dd" onChange={onChange} />);

            await user.type(getInput(), '2026');

            expect(onChange).toHaveBeenLastCalledWith(null, '2026', '2026-');
        });
    });

    describe('with format dd/mm/yyyy', () => {
        it('formats digits as they are typed using / separator', async () => {
            const user = userEvent.setup();
            renderWithProviders(<DateMaskedInput format="dd/mm/yyyy" />);

            await user.type(getInput(), '19022026');

            expect(getInput()).toHaveValue('19/02/2026');
        });

        it('calls onChange with a parsed Date when a complete date is entered', async () => {
            const user = userEvent.setup();
            const onChange = jest.fn();
            renderWithProviders(<DateMaskedInput format="dd/mm/yyyy" onChange={onChange} />);

            await user.type(getInput(), '19022026');

            expect(onChange).toHaveBeenLastCalledWith(
                new Date(2026, 1, 19),
                '19022026',
                '19/02/2026',
            );
        });
    });

    describe('with format dd.mm.yyyy', () => {
        it('formats digits as they are typed using . separator', async () => {
            const user = userEvent.setup();
            renderWithProviders(<DateMaskedInput format="dd.mm.yyyy" />);

            await user.type(getInput(), '19022026');

            expect(getInput()).toHaveValue('19.02.2026');
        });

        it('calls onChange with a parsed Date when a complete date is entered', async () => {
            const user = userEvent.setup();
            const onChange = jest.fn();
            renderWithProviders(<DateMaskedInput format="dd.mm.yyyy" onChange={onChange} />);

            await user.type(getInput(), '19022026');

            expect(onChange).toHaveBeenLastCalledWith(
                new Date(2026, 1, 19),
                '19022026',
                '19.02.2026',
            );
        });
    });

    describe('with format mm/dd/yyyy', () => {
        it('calls onChange with a parsed Date when a complete date is entered', async () => {
            const user = userEvent.setup();
            const onChange = jest.fn();
            renderWithProviders(<DateMaskedInput format="mm/dd/yyyy" onChange={onChange} />);

            await user.type(getInput(), '02192026');

            expect(onChange).toHaveBeenLastCalledWith(
                new Date(2026, 1, 19),
                '02192026',
                '02/19/2026',
            );
        });
    });

    it('formats the updated value when used in controlled mode', () => {
        const { rerender } = renderWithProviders(<DateMaskedInput format="yyyy-mm-dd" value="2026" />);

        expect(screen.getByTestId('unfilled-mask')).toHaveTextContent('-MM-DD');

        rerender(<DateMaskedInput format="yyyy-mm-dd" value="20261231" />);

        expect(screen.getByTestId('unfilled-mask')).toHaveTextContent('');
        expect(getInput()).toHaveValue('2026-12-31');
    });

    it('supports a Date value in controlled mode', () => {
        const { rerender } = renderWithProviders(<DateMaskedInput format="yyyy-mm-dd" value="2026" />);

        expect(screen.getByTestId('unfilled-mask')).toHaveTextContent('-MM-DD');

        rerender(<DateMaskedInput format="yyyy-mm-dd" value={new Date(2026, 11, 31)} />);

        expect(screen.getByTestId('unfilled-mask')).toHaveTextContent('');
        expect(getInput()).toHaveValue('2026-12-31');
    });

    it('does not call onChange when onChange prop is not provided', async () => {
        const user = userEvent.setup();
        renderWithProviders(<DateMaskedInput format="yyyy-mm-dd" />);

        await expect(user.type(getInput(), '20260219')).resolves.not.toThrow();
    });

    it.each([
        ['en', 'YYYY-MM-DD'],
        ['en-CA', 'YYYY-MM-DD'],
        ['en-US', 'MM/DD/YYYY'],
        ['fr', 'AAAA-MM-JJ'],
        ['fr-FR', 'JJ/MM/AAAA'],
        ['fr-CA', 'AAAA-MM-JJ'],
        ['en-ES', 'DD/MM/YYYY'],
    ])('uses locale-based mask when no format is provided (%s → %s)', (locale, expected) => {
        renderWithProviders(<DateMaskedInput />, undefined, locale);

        const maskText = screen.getByTestId('unfilled-mask');

        expect(maskText).toHaveTextContent(expected);
    });
});
