import { createRef, RefObject } from 'react';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { actAndWaitForEffects, mountWithTheme, renderWithProviders } from '../../test-utils/renderer';
import { Datepicker, DatepickerHandles } from './date-picker';

describe('Datepicker', () => {
    test('onChange callback is called when input changed', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(<Datepicker onChange={callback} label="date" />);

        const inputTarget = document.createElement('input');
        inputTarget.value = '2002-02-02';

        getByTestId(wrapper, 'text-input').simulate('change', { target: inputTarget });

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('onFocus callback is called when input focused', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(<Datepicker onFocus={callback} label="date" />);

        getByTestId(wrapper, 'text-input').simulate('focus');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('onBlur callback is called when input blurred', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(<Datepicker onBlur={callback} label="date" />);

        getByTestId(wrapper, 'text-input').simulate('blur');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    describe('Calendar button', () => {
        beforeEach(() => {
            jest.useFakeTimers();
        });

        test('onCalendarClose callback is called when calendar closes', async () => {
            const callback = jest.fn();
            const wrapper = mountWithTheme(<Datepicker onCalendarClose={callback} startOpen label="date" />);

            getByTestId(wrapper, 'calendar-button').simulate('mousedown');
            jest.runAllTimers();

            expect(callback).toHaveBeenCalledTimes(1);
        });

        test('onCalendarOpen callback is called when calendar opens', async () => {
            const callback = jest.fn();
            const wrapper = mountWithTheme(<Datepicker onCalendarOpen={callback} label="date" />);

            getByTestId(wrapper, 'calendar-button').simulate('mousedown');
            jest.runAllTimers();

            expect(callback).toHaveBeenCalledTimes(1);
        });

        test('calendar should open when calendar button is clicked', async () => {
            const wrapper = mountWithTheme(<Datepicker />);

            await actAndWaitForEffects(wrapper, () => {
                getByTestId(wrapper, 'calendar-button').simulate('mousedown');
                jest.runAllTimers();
            });

            expect(getByTestId(wrapper, 'calendar-header').exists()).toBeTruthy();
        });

        test('calendar should close when calendar button is clicked (start open)', async () => {
            const wrapper = mountWithTheme(<Datepicker startOpen />);

            await actAndWaitForEffects(wrapper, () => {
                getByTestId(wrapper, 'calendar-button').simulate('mousedown');
                jest.runAllTimers();
            });

            expect(getByTestId(wrapper, 'calendar-header').exists()).toBeFalsy();
        });
    });

    test('input value should format on blur', () => {
        const wrapper = mountWithTheme(<Datepicker />);

        const inputTarget = document.createElement('input');
        inputTarget.value = '2002 02 02';

        getByTestId(wrapper, 'text-input').simulate('change', { target: inputTarget });
        getByTestId(wrapper, 'text-input').simulate('blur');

        expect(getByTestId(wrapper, 'text-input').props().value).toBe('2002-02-02');
    });

    test('calendar should be opened when startOpen prop is truthy', () => {
        const wrapper = mountWithTheme(<Datepicker startOpen />);

        expect(getByTestId(wrapper, 'calendar-header').exists()).toBeTruthy();
    });

    test('calendar should not open when input is clicked', () => {
        const wrapper = mountWithTheme(<Datepicker />);

        getByTestId(wrapper, 'text-input').simulate('click');

        expect(getByTestId(wrapper, 'calendar-header').exists()).toBeFalsy();
    });

    test('calendar should not open when input is focused', () => {
        const wrapper = mountWithTheme(<Datepicker />);

        getByTestId(wrapper, 'text-input').simulate('focus');

        expect(getByTestId(wrapper, 'calendar-header').exists()).toBeFalsy();
    });

    test('calendar should open on calendar button keydown (Enter)', () => {
        const wrapper = mountWithTheme(<Datepicker />);

        getByTestId(wrapper, 'calendar-button').simulate('keydown', { key: 'Enter' });

        expect(getByTestId(wrapper, 'calendar-header').exists()).toBeTruthy();
    });

    test('calendar should open on calendar button keydown (Space bar)', () => {
        const wrapper = mountWithTheme(<Datepicker />);

        getByTestId(wrapper, 'calendar-button').simulate('keydown', { key: ' ' });

        expect(getByTestId(wrapper, 'calendar-header').exists()).toBeTruthy();
    });

    test('month select value should change when month-previous button is clicked', () => {
        const wrapper = mountWithTheme(<Datepicker openToDate={new Date('2000-05-05')} label="date" open />);

        getByTestId(wrapper, 'month-previous').simulate('click');

        expect(getByTestId(wrapper, 'month-select').props().value).toBe('april');
    });

    test('month select value should change when month-next button is clicked', () => {
        const wrapper = mountWithTheme(<Datepicker openToDate={new Date('2000-05-05')} label="date" open />);

        getByTestId(wrapper, 'month-next').simulate('click');

        expect(getByTestId(wrapper, 'month-select').props().value).toBe('june');
    });

    test('year select value should change when month-previous button is clicked on first month of the year', () => {
        const wrapper = mountWithTheme(<Datepicker openToDate={new Date('2000-01-12')} label="date" open />);

        getByTestId(wrapper, 'month-previous').simulate('click');

        expect(getByTestId(wrapper, 'year-select').props().value).toBe('1999');
    });

    test('year select value should change when month-next button is clicked on last month of the year', () => {
        const wrapper = mountWithTheme(<Datepicker openToDate={new Date('2000-12-12')} label="date" open />);

        getByTestId(wrapper, 'month-next').simulate('click');

        expect(getByTestId(wrapper, 'year-select').props().value).toBe('2001');
    });

    test('today-button should select current date', () => {
        const wrapper = mountWithTheme(<Datepicker startOpen hasTodayButton />);

        getByTestId(wrapper, 'today-button').simulate('click');

        expect(getByTestId(wrapper, 'text-input').props().value).toBe(new Date().toLocaleDateString('en-CA'));
    });

    test('should reset date to defaultDate when reset is called on ref', async () => {
        const ref: RefObject<DatepickerHandles> = createRef();
        const wrapper = mountWithTheme(<Datepicker ref={ref} defaultDate={new Date('2002-02-02, 12:00')} />);

        getByTestId(wrapper, 'text-input').simulate('change', { target: { value: '2010-07-07' } });

        await actAndWaitForEffects(wrapper, () => {
            ref.current?.reset();
        });

        expect(getByTestId(wrapper, 'text-input').props().value).toBe('2002-02-02');
    });

    test('should set date when setDate is called on ref', async () => {
        const ref: RefObject<DatepickerHandles> = createRef();
        const wrapper = mountWithTheme(<Datepicker ref={ref} />);

        await actAndWaitForEffects(wrapper, () => {
            ref.current?.setDate(new Date('2002-02-02, 12:00'));
        });

        expect(getByTestId(wrapper, 'text-input').props().value).toBe('2002-02-02');
    });

    test('has controllable data-testid)', () => {
        const wrapper = mountWithTheme(<Datepicker data-testid="some-data-test-id" label="date" />);

        expect(getByTestId(wrapper, 'some-data-test-id').exists()).toBeTruthy();
    });

    test('matches snapshot (data-testid)', () => {
        const { container } = renderWithProviders(
            <Datepicker data-testid="some-data-test-id" label="date" />,
            'desktop',
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot (desktop)', () => {
        const { container } = renderWithProviders(<Datepicker label="date" />, 'desktop');

        expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot (mobile)', () => {
        const { container } = renderWithProviders(<Datepicker label="date" />, 'mobile');

        expect(container.firstChild).toMatchSnapshot();
    });

    test('has openToDate', () => {
        const { container } = renderWithProviders(
            <Datepicker label="date" openToDate={new Date('1995-05-05, 12:00')} />,
            'mobile',
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot (open, desktop)', () => {
        const { container } = renderWithProviders(
            <Datepicker label="date" open maxDate={new Date('2010-10-10, 12:00')} />,
            'desktop',
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot (open, mobile)', () => {
        const { container } = renderWithProviders(
            <Datepicker label="date" startOpen maxDate={new Date('2010-10-10, 12:00')} />,
            'mobile',
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot (open, hasTodayButton)', () => {
        const { container } = renderWithProviders(
            <Datepicker label="date" hasTodayButton startOpen maxDate={new Date('2010-10-10, 12:00')} />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot (invalid)', () => {
        const { container } = renderWithProviders(<Datepicker label="date" valid={false} />);

        expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot (disabled)', () => {
        const { container } = renderWithProviders(<Datepicker label="date" disabled />);

        expect(container.firstChild).toMatchSnapshot();
    });
});
