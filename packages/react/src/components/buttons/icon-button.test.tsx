import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeWrapped } from '../../test-utils/theme-wrapped';
import { IconButton } from './icon-button';

describe('Button', () => {
    test('onClick callback is called when clicked', () => {
        const callback = jest.fn();
        const wrapper = mount(
            ThemeWrapped(
                <IconButton
                    label="home"
                    iconName="home"
                    onClick={callback}
                    buttonType="primary"
                />,
            ),
        );
        wrapper.find(IconButton).simulate('click');
        expect(callback).toHaveBeenCalled();
    });

    test('onClick callback cannot be called when disabled', () => {
        const callback = jest.fn();
        const wrapper = mount(
            ThemeWrapped(
                <IconButton
                    label="home"
                    iconName="home"
                    onClick={callback}
                    buttonType="primary"
                    disabled
                />,
            ),
        );
        wrapper.find(IconButton).simulate('click');
        expect(callback).not.toHaveBeenCalled();
    });

    test('Is disabled', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <IconButton
                    label="home"
                    iconName="home"
                    buttonType="primary"
                    disabled
                />,
            ),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Has primary styles', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <IconButton
                    label="home"
                    iconName="home"
                    buttonType="primary"
                />,
            ),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Has secondary styles', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <IconButton
                    label="home"
                    iconName="home"
                    buttonType="secondary"
                />,
            ),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Has tertiary styles', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <IconButton
                    label="home"
                    iconName="home"
                    buttonType="tertiary"
                />,
            ),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Has mobile styles', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <IconButton
                    label="home"
                    iconName="home"
                    buttonType="primary"
                    device="mobile"
                />,
            ),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
