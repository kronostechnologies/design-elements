import { shallow } from 'enzyme';
import React from 'react';
import { mountWithTheme, renderWithProviders } from '../../test-utils/renderer';
import { IconButton } from './icon-button';

describe('Icon Button', () => {
    test('onClick callback is called when clicked', () => {
        const callback = jest.fn();
        const wrapper = shallow(
            <IconButton
                label="home"
                iconName="home"
                buttonType="primary"
                onClick={callback}
            />,
        );

        wrapper.simulate('click');
        expect(callback).toHaveBeenCalled();
    });

    test('onClick callback cannot be called when disabled', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(
            <IconButton
                label="home"
                iconName="home"
                onClick={callback}
                buttonType="primary"
                disabled
            />,
        );

        wrapper.find(IconButton).simulate('click');
        expect(callback).not.toHaveBeenCalled();
    });

    test('Has disabled styles', () => {
        const tree = renderWithProviders(
            <IconButton
                label="home"
                iconName="home"
                buttonType="primary"
                disabled
            />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('Has primary styles', () => {
        const tree = renderWithProviders(
            <IconButton
                label="home"
                iconName="home"
                buttonType="primary"
            />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('Has secondary styles', () => {
        const tree = renderWithProviders(
            <IconButton
                label="home"
                iconName="home"
                buttonType="secondary"
            />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('Has tertiary styles', () => {
        const tree = renderWithProviders(
            <IconButton
                label="home"
                iconName="home"
                buttonType="tertiary"
            />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('Has mobile styles', () => {
        const tree = renderWithProviders(
            <IconButton
                label="home"
                iconName="home"
                buttonType="primary"
            />,
            'mobile',
        );

        expect(tree).toMatchSnapshot();
    });
});
