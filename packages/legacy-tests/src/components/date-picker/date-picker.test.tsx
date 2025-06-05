import { createRef, RefObject } from 'react';
import { Datepicker, DatepickerHandles } from '~/components/date-picker/date-picker';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { actAndWaitForEffects, mountWithTheme } from '../../test-utils/renderer';

describe('Datepicker', () => {
    it('onChange callback is called when input changed', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(<Datepicker onChange={callback} label="date" />);

        const inputTarget = document.createElement('input');
        inputTarget.value = '2002-02-02';

        getByTestId(wrapper, 'text-input').simulate('change', { target: inputTarget });

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('onFocus callback is called when input focused', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(<Datepicker onFocus={callback} label="date" />);

        getByTestId(wrapper, 'text-input').simulate('focus');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('onBlur callback is called when input blurred', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(<Datepicker onBlur={callback} label="date" />);

        getByTestId(wrapper, 'text-input').simulate('blur');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    describe('Calendar button', () => {
        beforeEach(() => {
            jest.useFakeTimers();
        });

        it('onCalendarClose callback is called when calendar closes', async () => {
            const callback = jest.fn();
            const wrapper = mountWithTheme(<Datepicker onCalendarClose={callback} startOpen label="date" />);

            getByTestId(wrapper, 'calendar-button').simulate('mousedown');
            jest.runAllTimers();

            expect(callback).toHaveBeenCalledTimes(1);
        });

        it('onCalendarOpen callback is called when calendar opens', async () => {
            const callback = jest.fn();
            const wrapper = mountWithTheme(<Datepicker onCalendarOpen={callback} label="date" />);

            getByTestId(wrapper, 'calendar-button').simulate('mousedown');
            jest.runAllTimers();

            expect(callback).toHaveBeenCalledTimes(1);
        });

        it('calendar should open when calendar button is clicked', async () => {
            const wrapper = mountWithTheme(<Datepicker />);

            await actAndWaitForEffects(wrapper, () => {
                getByTestId(wrapper, 'calendar-button').simulate('mousedown');
                jest.runAllTimers();
            });

            expect(getByTestId(wrapper, 'calendar-header').exists()).toBeTruthy();
        });

        it('calendar should close when calendar button is clicked (start open)', async () => {
            const wrapper = mountWithTheme(<Datepicker startOpen />);

            await actAndWaitForEffects(wrapper, () => {
                getByTestId(wrapper, 'calendar-button').simulate('mousedown');
                jest.runAllTimers();
            });

            expect(getByTestId(wrapper, 'calendar-header').exists()).toBeFalsy();
        });
    });

    it('input value should format on blur', () => {
        const wrapper = mountWithTheme(<Datepicker />);

        const inputTarget = document.createElement('input');
        inputTarget.value = '2002 02 02';

        getByTestId(wrapper, 'text-input').simulate('change', { target: inputTarget });
        getByTestId(wrapper, 'text-input').simulate('blur');

        expect(getByTestId(wrapper, 'text-input').props().value).toBe('2002-02-02');
    });

    it('calendar should be opened when startOpen prop is truthy', () => {
        const wrapper = mountWithTheme(<Datepicker startOpen />);

        expect(getByTestId(wrapper, 'calendar-header').exists()).toBeTruthy();
    });

    it('calendar should not open when input is clicked', () => {
        const wrapper = mountWithTheme(<Datepicker />);

        getByTestId(wrapper, 'text-input').simulate('click');

        expect(getByTestId(wrapper, 'calendar-header').exists()).toBeFalsy();
    });

    it('calendar should not open when input is focused', () => {
        const wrapper = mountWithTheme(<Datepicker />);

        getByTestId(wrapper, 'text-input').simulate('focus');

        expect(getByTestId(wrapper, 'calendar-header').exists()).toBeFalsy();
    });

    it('calendar should open on calendar button keydown (Enter)', () => {
        const wrapper = mountWithTheme(<Datepicker />);

        getByTestId(wrapper, 'calendar-button').simulate('keydown', { key: 'Enter' });

        expect(getByTestId(wrapper, 'calendar-header').exists()).toBeTruthy();
    });

    it('calendar should open on calendar button keydown (Space bar)', () => {
        const wrapper = mountWithTheme(<Datepicker />);

        getByTestId(wrapper, 'calendar-button').simulate('keydown', { key: ' ' });

        expect(getByTestId(wrapper, 'calendar-header').exists()).toBeTruthy();
    });

    it('month select value should change when month-previous button is clicked', () => {
        const wrapper = mountWithTheme(<Datepicker openToDate={new Date('2000-05-05')} label="date" open />);

        getByTestId(wrapper, 'month-previous').simulate('click');

        expect(getByTestId(wrapper, 'month-select').props().value).toBe('april');
    });

    it('month select value should change when month-next button is clicked', () => {
        const wrapper = mountWithTheme(<Datepicker openToDate={new Date('2000-05-05')} label="date" open />);

        getByTestId(wrapper, 'month-next').simulate('click');

        expect(getByTestId(wrapper, 'month-select').props().value).toBe('june');
    });

    it('year select value should change when month-previous button is clicked on first month of the year', () => {
        const wrapper = mountWithTheme(<Datepicker openToDate={new Date('2000-01-12')} label="date" open />);

        getByTestId(wrapper, 'month-previous').simulate('click');

        expect(getByTestId(wrapper, 'year-select').props().value).toBe('1999');
    });

    it('year select value should change when month-next button is clicked on last month of the year', () => {
        const wrapper = mountWithTheme(<Datepicker openToDate={new Date('2000-12-12')} label="date" open />);

        getByTestId(wrapper, 'month-next').simulate('click');

        expect(getByTestId(wrapper, 'year-select').props().value).toBe('2001');
    });

    it('today-button should select current date', () => {
        const wrapper = mountWithTheme(<Datepicker startOpen hasTodayButton />);

        getByTestId(wrapper, 'today-button').simulate('click');

        expect(getByTestId(wrapper, 'text-input').props().value).toBe(new Date().toLocaleDateString('en-CA'));
    });

    it('should reset date to defaultDate when reset is called on ref', async () => {
        const ref: RefObject<DatepickerHandles> = createRef();
        const wrapper = mountWithTheme(<Datepicker ref={ref} defaultDate={new Date('2002-02-02, 12:00')} />);

        getByTestId(wrapper, 'text-input').simulate('change', { target: { value: '2010-07-07' } });

        await actAndWaitForEffects(wrapper, () => {
            ref.current?.reset();
        });

        expect(getByTestId(wrapper, 'text-input').props().value).toBe('2002-02-02');
    });

    it('should set date when setDate is called on ref', async () => {
        const ref: RefObject<DatepickerHandles> = createRef();
        const wrapper = mountWithTheme(<Datepicker ref={ref} />);

        await actAndWaitForEffects(wrapper, () => {
            ref.current?.setDate(new Date('2002-02-02, 12:00'));
        });

        expect(getByTestId(wrapper, 'text-input').props().value).toBe('2002-02-02');
    });

    it('has controllable data-testid)', () => {
        const wrapper = mountWithTheme(<Datepicker data-testid="some-data-test-id" label="date" />);

        expect(getByTestId(wrapper, 'some-data-test-id').exists()).toBeTruthy();
    });
});
