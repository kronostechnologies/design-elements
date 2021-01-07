import { shallow } from 'enzyme';
import React from 'react';
import { renderWithProviders } from '../../test-utils/renderer';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { ListOption, TagMedium } from './tag-medium';

const option: ListOption = {
    label: 'Test',
    focusIndex: 0,
    buttonRef: React.createRef<HTMLButtonElement>(),
};

const optionWithIcon: ListOption = {
    iconName: 'home',
    label: 'Test',
    focusIndex: 0,
    buttonRef: React.createRef<HTMLButtonElement>(),
};

const optionSameIconAndLabel: ListOption = {
    iconName: 'home',
    label: 'Home',
    focusIndex: 0,
    buttonRef: React.createRef<HTMLButtonElement>(),
};

describe('Tag Medium', () => {
    test('onDelete callback is called when delete-button is clicked', () => {
        const callback = jest.fn();
        const wrapper = shallow(
            <TagMedium option={option} onDelete={callback} />,
        );

        getByTestId(wrapper, 'Test-delete-button').simulate('click');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('Icon should have aria-hidden="false" and an aria-label when the label is not the same as iconName', () => {
        const wrapper = shallow(
            <TagMedium option={optionWithIcon} />,
        );

        const testIconWrapper = getByTestId(wrapper, 'Test-icon');
        expect(testIconWrapper.prop('aria-label')).toBe('home');
        expect(testIconWrapper.prop('aria-hidden')).toBe(false);
    });

    test('Icon should have aria-hidden="true" and no label when the label is the same as the iconName', () => {
        const wrapper = shallow(
            <TagMedium option={optionSameIconAndLabel} />,
        );

        const testIconWrapper = getByTestId(wrapper, 'Home-icon');
        expect(testIconWrapper.prop('aria-label')).toBe(undefined);
        expect(testIconWrapper.prop('aria-hidden')).toBe(true);
    });

    test('matches snapshot (desktop)', () => {
        const tree = renderWithProviders(<TagMedium option={option} />, 'desktop');

        expect(tree).toMatchSnapshot();
    });

    test('matches snapshot (mobile)', () => {
        const tree = renderWithProviders(<TagMedium option={option} />, 'mobile');

        expect(tree).toMatchSnapshot();
    });

    test('matches snapshot (with icons)', () => {
        const tree = renderWithProviders(<TagMedium option={optionWithIcon} />);

        expect(tree).toMatchSnapshot();
    });

    test('matches snapshot (deletable)', () => {
        const tree = renderWithProviders(<TagMedium option={option} onDelete={jest.fn()} />);

        expect(tree).toMatchSnapshot();
    });
});
