import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, RefObject } from 'react';
import { renderWithProviders } from '../../test-utils/renderer';
import { Datepicker, DatepickerHandles } from './date-picker';

describe('Datepicker', () => {
    it('matches snapshot (data-testid)', () => {
        const { baseElement } = renderWithProviders(
            <Datepicker data-testid="some-data-test-id" label="date" />,
            'desktop',
        );

        expect(baseElement).toMatchSnapshot();
    });

    it('matches snapshot (desktop)', () => {
        const { baseElement } = renderWithProviders(<Datepicker label="date" />, 'desktop');

        expect(baseElement).toMatchSnapshot();
    });

    it('matches snapshot (mobile)', () => {
        const { baseElement } = renderWithProviders(<Datepicker label="date" />, 'mobile');

        expect(baseElement).toMatchSnapshot();
    });

    it('has openToDate', () => {
        const { baseElement } = renderWithProviders(
            <Datepicker label="date" openToDate={new Date('1995-05-05, 12:00')} />,
            'mobile',
        );

        expect(baseElement).toMatchSnapshot();
    });

    it('matches snapshot (open, desktop)', () => {
        const { baseElement } = renderWithProviders(
            <Datepicker label="date" open maxDate={new Date('2010-10-10, 12:00')} />,
            'desktop',
        );

        expect(baseElement).toMatchSnapshot();
    });

    it('matches snapshot (open, mobile)', () => {
        const { baseElement } = renderWithProviders(
            <Datepicker label="date" startOpen maxDate={new Date('2010-10-10, 12:00')} />,
            'mobile',
        );

        expect(baseElement).toMatchSnapshot();
    });

    it('matches snapshot (open, hasTodayButton)', () => {
        const { baseElement } = renderWithProviders(
            <Datepicker label="date" hasTodayButton startOpen maxDate={new Date('2010-10-10, 12:00')} />,
        );

        expect(baseElement).toMatchSnapshot();
    });

    it('matches snapshot (invalid)', () => {
        const { baseElement } = renderWithProviders(<Datepicker label="date" valid={false} />);

        expect(baseElement).toMatchSnapshot();
    });

    it('matches snapshot (disabled)', () => {
        const { baseElement } = renderWithProviders(<Datepicker label="date" disabled />);

        expect(baseElement).toMatchSnapshot();
    });

    describe('Interactions', () => {
        it('onChange callback is called when input changed', async () => {
            const callback = jest.fn();
            const user = userEvent.setup();
            renderWithProviders(<Datepicker onChange={callback} label="date" />);

            const input = screen.getByTestId('text-input');
            await user.type(input, '2002-02-02');

            expect(callback).toHaveBeenCalled();
            expect(callback.mock.calls[0][0].toISOString()).toStartWith('2002-02-02');
        });

        it('onFocus callback is called when input focused', async () => {
            const callback = jest.fn();
            const user = userEvent.setup();
            renderWithProviders(<Datepicker onFocus={callback} label="date" />);

            const input = screen.getByTestId('text-input');
            await user.click(input);

            expect(callback).toHaveBeenCalledTimes(1);
        });

        it('onBlur callback is called when input blurred', async () => {
            const callback = jest.fn();
            const user = userEvent.setup();
            renderWithProviders(<Datepicker onBlur={callback} label="date" />);

            const input = screen.getByTestId('text-input');
            await user.click(input);
            await user.tab();

            expect(callback).toHaveBeenCalledTimes(1);
        });

        describe('Calendar button', () => {
            it('onCalendarClose callback is called when calendar closes', async () => {
                const callback = jest.fn();
                const user = userEvent.setup();
                renderWithProviders(<Datepicker onCalendarClose={callback} startOpen label="date" />);

                const button = screen.getByTestId('calendar-button');
                await user.click(button);

                await waitFor(() => expect(callback).toHaveBeenCalledTimes(1));
            });

            it('onCalendarOpen callback is called when calendar opens', async () => {
                const callback = jest.fn();
                const user = userEvent.setup();
                renderWithProviders(<Datepicker onCalendarOpen={callback} label="date" />);

                const button = screen.getByTestId('calendar-button');
                await user.click(button);

                await waitFor(() => expect(callback).toHaveBeenCalledTimes(1));
            });

            it('calendar should open when calendar button is clicked', async () => {
                const user = userEvent.setup();
                renderWithProviders(<Datepicker />);

                const button = screen.getByTestId('calendar-button');
                await user.click(button);

                await waitFor(() => expect(screen.getByTestId('calendar-header')).toBeInTheDocument());
            });

            it('calendar should close when calendar button is clicked (start open)', async () => {
                const user = userEvent.setup();
                renderWithProviders(<Datepicker startOpen />);

                const button = screen.getByTestId('calendar-button');
                await user.click(button);

                await waitFor(() => expect(screen.queryByTestId('calendar-header')).not.toBeInTheDocument());
            });
        });

        it('input value should format on blur', async () => {
            const user = userEvent.setup();
            renderWithProviders(<Datepicker />);

            const input = screen.getByTestId('text-input');
            await user.type(input, '2002 02 02');
            await user.tab();

            expect(input).toHaveValue('2002-02-02');
        });

        it('calendar should be opened when startOpen prop is truthy', () => {
            renderWithProviders(<Datepicker startOpen />);

            expect(screen.getByTestId('calendar-header')).toBeInTheDocument();
        });

        it('calendar should not open when input is clicked', async () => {
            const user = userEvent.setup();
            renderWithProviders(<Datepicker />);

            const input = screen.getByTestId('text-input');
            await user.click(input);

            expect(screen.queryByTestId('calendar-header')).not.toBeInTheDocument();
        });

        it('calendar should not open when input is focused', async () => {
            renderWithProviders(<Datepicker />);

            const input = screen.getByTestId('text-input');
            act(() => input.focus());

            expect(screen.queryByTestId('calendar-header')).not.toBeInTheDocument();
        });

        it('calendar should open on calendar button keydown (Enter)', async () => {
            const user = userEvent.setup();
            renderWithProviders(<Datepicker />);

            const button = screen.getByTestId('calendar-button');
            button.focus();
            await user.keyboard('{Enter}');

            await waitFor(() => expect(screen.getByTestId('calendar-header')).toBeInTheDocument());
        });

        it('calendar should open on calendar button keydown (Space bar)', async () => {
            const user = userEvent.setup();
            renderWithProviders(<Datepicker />);

            const button = screen.getByTestId('calendar-button');
            button.focus();
            await user.keyboard(' ');

            await waitFor(() => expect(screen.getByTestId('calendar-header')).toBeInTheDocument());
        });

        it('month select value should change when month-previous button is clicked', async () => {
            const user = userEvent.setup();
            renderWithProviders(<Datepicker openToDate={new Date('2000-05-05')} label="date" open />);

            const prevButton = screen.getByTestId('month-previous');
            await user.click(prevButton);

            expect(screen.getByTestId('month-select')).toHaveTextContent('Apr');
        });

        it('month select value should change when month-next button is clicked', async () => {
            const user = userEvent.setup();
            renderWithProviders(<Datepicker openToDate={new Date('2000-05-05')} label="date" open />);

            const nextButton = screen.getByTestId('month-next');
            await user.click(nextButton);

            expect(screen.getByTestId('month-select')).toHaveTextContent('Jun');
        });

        it(
            'year select value should change when month-previous button is clicked on first month of the year',
            async () => {
                const user = userEvent.setup();
                renderWithProviders(<Datepicker openToDate={new Date('2000-01-12')} label="date" open />);

                const prevButton = screen.getByTestId('month-previous');
                await user.click(prevButton);

                expect(screen.getByTestId('year-select')).toHaveTextContent('1999');
            },
        );

        it('year select value should change when month-next button is clicked on last month of the year', async () => {
            const user = userEvent.setup();
            renderWithProviders(<Datepicker openToDate={new Date('2000-12-12')} label="date" open />);

            const nextButton = screen.getByTestId('month-next');
            await user.click(nextButton);

            expect(screen.getByTestId('year-select')).toHaveTextContent('2001');
        });

        it('today-button should select current date', async () => {
            const user = userEvent.setup();
            renderWithProviders(<Datepicker startOpen hasTodayButton />);

            const todayButton = screen.getByTestId('today-button');
            await user.click(todayButton);

            const input = screen.getByTestId('text-input');
            const today = new Date().toLocaleDateString('en-CA');

            expect(input).toHaveValue(today);
        });

        it('should reset date to defaultDate when reset is called on ref', async () => {
            const ref: RefObject<DatepickerHandles> = createRef();
            const user = userEvent.setup();
            renderWithProviders(<Datepicker ref={ref} defaultDate={new Date('2002-02-02, 12:00')} />);

            const input = screen.getByTestId('text-input');
            await user.clear(input);
            await user.type(input, '2010-07-07');
            await user.tab();

            expect(input).toHaveValue('2010-07-07');

            act(() => ref.current?.reset());

            await waitFor(() => expect(input).toHaveValue('2002-02-02'));
        });

        it('should set date when setDate is called on ref', async () => {
            const ref: RefObject<DatepickerHandles> = createRef();
            renderWithProviders(<Datepicker ref={ref} />);

            act(() => ref.current?.setDate(new Date('2002-02-02, 12:00')));

            const input = screen.getByTestId('text-input');
            await waitFor(() => expect(input).toHaveValue('2002-02-02'));
        });
    });
});
