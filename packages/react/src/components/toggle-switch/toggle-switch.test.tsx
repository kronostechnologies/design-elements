import { renderWithProviders } from '@design-elements/test-utils/renderer';
import React from 'react';
import { shallow } from 'enzyme';
import { ToggleSwitch } from './toggle-switch';
import { getByTestId } from '../../test-utils/enzyme-selectors';

jest.mock('uuid/v4');

describe('ToggleSwitch', () => {
    test('onToggle callback is called when clicked', () => {
        const callback = jest.fn();
        const wrapper = shallow(<ToggleSwitch onToggle={callback} label="Switch" toggled />);

        getByTestId(wrapper, 'test-toggle-switch').simulate('click');

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(false);
    });

    test('onToggle callback cannot be called when disabled', () => {
        const callback = jest.fn();
        const wrapper = shallow(<ToggleSwitch onToggle={callback} disabled label="Switch" toggled />);

        getByTestId(wrapper, 'test-toggle-switch').simulate('click');

        expect(callback).toHaveBeenCalledTimes(0);
    });

    test('has disabled styles', () => {
        const onToggle = (): void => undefined;
        const tree = renderWithProviders(<ToggleSwitch disabled label="Switch" toggled onToggle={onToggle} />);

        expect(tree).toMatchSnapshot();
    });

    test('Matches snapshot (desktop)', () => {
        const onToggle = (): void => undefined;
        const tree = renderWithProviders(
            <ToggleSwitch label="Switch" toggled onToggle={onToggle} />, 'desktop',
        );

        expect(tree).toMatchSnapshot();
    });

    test('Matches snapshot (mobile)', () => {
        const onToggle = (): void => undefined;
        const tree = renderWithProviders(
            <ToggleSwitch label="Switch" toggled onToggle={onToggle} />, 'mobile',
        );

        expect(tree).toMatchSnapshot();
    });
});
