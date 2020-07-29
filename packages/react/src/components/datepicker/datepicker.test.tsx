import { getByTestId } from '@design-elements/test-utils/enzyme-selectors';
import { mount } from 'enzyme';
import React from 'react';
import DatePicker from 'react-datepicker';

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

    test('calendar should be opened when startOpen prop is truthy', () => {
        const wrapper = mount(ThemeWrapped(<Datepicker startOpen/>));
        const element = wrapper.find(DatePicker);

        expect(element.props().open).toBeTruthy();
    });

    test('calendar should open when calendar button is clicked', () => {
        const wrapper = mount(ThemeWrapped(<Datepicker />));

        getByTestId(wrapper, 'calendar-button').simulate('mousedown');

        const element = wrapper.find(DatePicker);
        expect(element.props().open).toBeTruthy();
    });

    test('calendar should open on calendar button keydown (Enter)', () => {
        const wrapper = mount(ThemeWrapped(<Datepicker />));

        getByTestId(wrapper, 'calendar-button').simulate('keydown', { key: 'Enter' });

        const element = wrapper.find(DatePicker);
        expect(element.props().open).toBeTruthy();
    });

    test('calendar should open on calendar button keydown (Spacebar)', () => {
        const wrapper = mount(ThemeWrapped(<Datepicker />));

        getByTestId(wrapper, 'calendar-button').simulate('keydown', { key: ' ' });

        const element = wrapper.find(DatePicker);
        expect(element.props().open).toBeTruthy();
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
        const tree = renderWithProviders(<Datepicker label="date" open maxDate={new Date('2010-10-10, 12:00')}/>, 'mobile');

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
