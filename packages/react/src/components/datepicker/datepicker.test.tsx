import { getByTestId } from '@design-elements/test-utils/enzyme-selectors';
import { mount } from 'enzyme';
import React from 'react';

import { renderWithProviders } from '../../test-utils/renderer';
import { ThemeWrapped } from '../../test-utils/theme-wrapped';
import { Datepicker } from './datepicker';
jest.mock('uuid/v4');

describe('Datepicker', () => {
    test('onChange callback is called when input changed', () => {
        const callback = jest.fn();
        const wrapper = mount(
            ThemeWrapped(<Datepicker onChange={callback} label="date"/>),
        );

        getByTestId(wrapper, 'text-input').simulate('change', { target: { value: '2002-02-02' } });

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('onFocus callback is called when input focused', () => {
        const callback = jest.fn();
        const wrapper = mount(
            ThemeWrapped(<Datepicker onFocus={callback} label="date"/>),
        );

        getByTestId(wrapper, 'text-input').simulate('focus');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('onBlur callback is called when input blurred', () => {
        const callback = jest.fn();
        const wrapper = mount(
            ThemeWrapped(<Datepicker onBlur={callback} label="date"/>),
        );

        getByTestId(wrapper, 'text-input').simulate('blur');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('onCalendarClose callback is called when calendar closes', () => {
        const callback = jest.fn();
        const wrapper = mount(
            ThemeWrapped(<Datepicker onCalendarClose={callback} startOpen label="date"/>),
        );

        getByTestId(wrapper, 'calendar-button').simulate('mousedown');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('onCalendarOpen callback is called when calendar opens', () => {
        const callback = jest.fn();
        const wrapper = mount(
            ThemeWrapped(<Datepicker onCalendarOpen={callback} label="date"/>),
        );

        getByTestId(wrapper, 'calendar-button').simulate('mousedown');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('input value should format on blur', () => {
        const wrapper = mount(ThemeWrapped(<Datepicker />));

        getByTestId(wrapper, 'text-input').simulate('change', { target: { value: '2002 02 02' } });
        getByTestId(wrapper, 'text-input').simulate('blur');

        expect(getByTestId(wrapper, 'text-input').props().value).toBe('2002-02-02');
    });

    test('input value should format when startDate changes', () => {
        const wrapper = mount(ThemeWrapped(<Datepicker startDate={new Date('2010-10-10, 12:00')} />));

        wrapper.setProps({ children: <Datepicker startDate={new Date('2020-10-20, 12:00')} /> });
        wrapper.update();

        expect(getByTestId(wrapper, 'text-input').props().value).toBe('2020-10-20');
    });

    test('calendar should be opened when startOpen prop is truthy', () => {
        const wrapper = mount(ThemeWrapped(<Datepicker startOpen/>));

        expect(getByTestId(wrapper, 'calendar-header').exists()).toBeTruthy();
    });

    test('calendar should not open when input is clicked', () => {
        const wrapper = mount(ThemeWrapped(<Datepicker />));

        getByTestId(wrapper, 'text-input').simulate('click');

        expect(getByTestId(wrapper, 'calendar-header').exists()).toBeFalsy();
    });

    test('calendar should not open when input is focused', () => {
        const wrapper = mount(ThemeWrapped(<Datepicker />));

        getByTestId(wrapper, 'text-input').simulate('focus');

        expect(getByTestId(wrapper, 'calendar-header').exists()).toBeFalsy();
    });

    test('calendar should open when calendar button is clicked', () => {
        const wrapper = mount(ThemeWrapped(<Datepicker />));

        getByTestId(wrapper, 'calendar-button').simulate('mousedown');

        expect(getByTestId(wrapper, 'calendar-header').exists()).toBeTruthy();
    });

    test('calendar should close when calendar button is clicked (start open)', () => {
        const wrapper = mount(ThemeWrapped(<Datepicker startOpen/>));

        getByTestId(wrapper, 'calendar-button').simulate('mousedown');

        expect(getByTestId(wrapper, 'calendar-header').exists()).toBeFalsy();
    });

    test('calendar should open on calendar button keydown (Enter)', () => {
        const wrapper = mount(ThemeWrapped(<Datepicker />));

        getByTestId(wrapper, 'calendar-button').simulate('keydown', { key: 'Enter' });

        expect(getByTestId(wrapper, 'calendar-header').exists()).toBeTruthy();
    });

    test('calendar should open on calendar button keydown (Spacebar)', () => {
        const wrapper = mount(ThemeWrapped(<Datepicker />));

        getByTestId(wrapper, 'calendar-button').simulate('keydown', { key: ' ' });

        expect(getByTestId(wrapper, 'calendar-header').exists()).toBeTruthy();
    });

    test('month select value should change when month-previous button is clicked', () => {
        const wrapper = mount(
            ThemeWrapped(<Datepicker startDate={new Date('2000-05-05')} label="date" open/>),
        );

        getByTestId(wrapper, 'month-previous').simulate('click');

        expect(getByTestId(wrapper, 'month-select').props().value).toBe('april');
    });

    test('month select value should change when month-next button is clicked', () => {
        const wrapper = mount(
            ThemeWrapped(<Datepicker startDate={new Date('2000-05-05')} label="date" open/>),
        );

        getByTestId(wrapper, 'month-next').simulate('click');

        expect(getByTestId(wrapper, 'month-select').props().value).toBe('june');
    });

    test('year select value should change when month-previous button is clicked on first month of the year', () => {
        const wrapper = mount(
            ThemeWrapped(<Datepicker startDate={new Date('2000-01-12')} label="date" open/>),
        );

        getByTestId(wrapper, 'month-previous').simulate('click');

        expect(getByTestId(wrapper, 'year-select').props().value).toBe('1999');
    });

    test('year select value should change when month-next button is clicked on last month of the year', () => {
        const wrapper = mount(
            ThemeWrapped(<Datepicker startDate={new Date('2000-12-12')} label="date" open/>),
        );

        getByTestId(wrapper, 'month-next').simulate('click');

        expect(getByTestId(wrapper, 'year-select').props().value).toBe('2001');
    });

    test('today-button should select current date', () => {
        const wrapper = mount(ThemeWrapped(<Datepicker startOpen hasTodayButton/>));

        getByTestId(wrapper, 'today-button').simulate('click');

        expect(getByTestId(wrapper, 'text-input').props().value).toBe(new Date().toLocaleDateString('en-CA'));
    });

    test('matches snapshot (desktop)', () => {
        const tree = renderWithProviders(<Datepicker label="date"/>, 'desktop');

        expect(tree).toMatchSnapshot();
    });

    test('matches snapshot (mobile)', () => {
        const tree = renderWithProviders(<Datepicker label="date"/>, 'mobile');

        expect(tree).toMatchSnapshot();
    });

    test('has startDate', () => {
        const tree = renderWithProviders(
            <Datepicker label="date" startDate={new Date('1995-05-05, 12:00')}/>,
            'mobile',
        );

        expect(tree).toMatchSnapshot();
    });

    test('matches snapshot (open, desktop)', () => {
        const tree = renderWithProviders(<Datepicker label="date" open maxDate={new Date('2010-10-10, 12:00')}/>, 'desktop');

        expect(tree).toMatchSnapshot();
    });

    test('matches snapshot (open, mobile)', () => {
        const tree = renderWithProviders(<Datepicker label="date" startOpen maxDate={new Date('2010-10-10, 12:00')}/>, 'mobile');

        expect(tree).toMatchSnapshot();
    });

    test('matches snapshot (open, hasTodayButton)', () => {
        const tree = renderWithProviders(<Datepicker label="date" hasTodayButton startOpen maxDate={new Date('2010-10-10, 12:00')}/>);

        expect(tree).toMatchSnapshot();
    });

    test('matches snapshot (invalid)', () => {
        const tree = renderWithProviders(<Datepicker label="date" valid={false}/>);

        expect(tree).toMatchSnapshot();
    });

    test('matches snapshot (disabled)', () => {
        const tree = renderWithProviders(<Datepicker label="date" disabled/>);

        expect(tree).toMatchSnapshot();
    });
});
