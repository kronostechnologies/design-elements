import { mount } from 'enzyme';
import React from 'react';
import { renderWithProviders } from '../../test-utils/renderer';
import { ThemeWrapped } from '../../test-utils/theme-wrapped';
import { Datepicker } from './date-picker';

describe('Datepicker', () => {
    test('onChange callback is called when input changed', () => {
        const callback = jest.fn();
        const wrapper = mount(
            ThemeWrapped(<Datepicker onChange={callback} label="date"/>),
        );

        wrapper.find('input').simulate('change', { target: { value: '2002-02-02' } });
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('onFocus callback is called when input focused', () => {
        const callback = jest.fn();
        const wrapper = mount(
            ThemeWrapped(<Datepicker onFocus={callback} label="date"/>),
        );

        wrapper.find('input').simulate('focus');
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('onBlur callback is called when input blurred', () => {
        const callback = jest.fn();
        const wrapper = mount(
            ThemeWrapped(<Datepicker onBlur={callback} label="date"/>),
        );

        wrapper.find('input').simulate('blur');
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('matches snapshot', () => {
        const tree = renderWithProviders(<Datepicker label="date"/>);

        expect(tree).toMatchSnapshot();
    });

    test('is disabled', () => {
        const tree = renderWithProviders(<Datepicker label="date" disabled/>);

        expect(tree).toMatchSnapshot();
    });
});
