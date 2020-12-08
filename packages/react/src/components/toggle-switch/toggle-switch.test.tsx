import { mountWithProviders, renderWithProviders } from '@design-elements/test-utils/renderer';
import React from 'react';
import { ToggleSwitch } from './toggle-switch';
jest.mock('uuid/v4');

describe('ToggleSwitch', () => {
    test('toggled is updated when clicked', () => {
        const wrapper = mountWithProviders(<ToggleSwitch label="Switch" />);

        wrapper.find('button').simulate('click');

        expect(wrapper.find('button').prop('aria-checked')).toEqual(true);
    });

    test('toggled cannot be updated when disabled', () => {
        const wrapper = mountWithProviders(<ToggleSwitch disabled toggled label="Switch" />);

        wrapper.find('button').simulate('click');

        expect(wrapper.find('button').prop('aria-checked')).toEqual(true);
    });

    test('onToggle callback is called when clicked', () => {
        const callback = jest.fn();
        const wrapper = mountWithProviders(<ToggleSwitch onToggle={callback} label="Switch" />);

        wrapper.find('button').simulate('click');

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(true);
    });

    test('onToggle callback cannot be called when disabled', () => {
        const callback = jest.fn();
        const wrapper = mountWithProviders(<ToggleSwitch onToggle={callback} disabled label="Switch" />);

        wrapper.find('button').simulate('click');

        expect(callback).toHaveBeenCalledTimes(0);
    });

    test('has disabled styles', () => {
        const tree = renderWithProviders(<ToggleSwitch disabled label="Switch" />);

        expect(tree).toMatchSnapshot();
    });

    test('Matches snapshot (desktop)', () => {
        const tree = renderWithProviders(
            <ToggleSwitch label="Switch" />,
            'desktop',
        );

        expect(tree).toMatchSnapshot();
    });

    test('Matches snapshot (mobile)', () => {
        const tree = renderWithProviders(
            <ToggleSwitch label="Switch" />,
            'mobile',
        );

        expect(tree).toMatchSnapshot();
    });
});
