import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import { DeviceContextWrapped } from '../../test-utils/device-context-wrapped';
import { ThemeWrapped } from '../../test-utils/theme-wrapped';
import { Banner } from './banner';

describe('Banner', () => {
    test('Matches snapshot (desktop)', () => {
        const tree = renderer.create(
            DeviceContextWrapped(
                ThemeWrapped(
                    <Banner type="warning">
                        WARNING! Lorem ipsum
                    </Banner>,
                ), 'desktop'),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Matches snapshot (mobile)', () => {
        const tree = renderer.create(
            DeviceContextWrapped(
                ThemeWrapped(
                    <Banner type="error" device="mobile">
                        ERROR! Lorem ipsum
                    </Banner>,
                ), 'mobile'),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('X button closes the component', () => {
        const wrapper = mount(
            ThemeWrapped(<Banner type="warning" >WARNING! test test</Banner>),
        );

        const close = wrapper.find('[data-testid="closeButton"]').at(1);
        close.simulate('click');

        expect(wrapper.exists('[data-testid="container"]')).toBeFalsy();
    });

    describe('Hidden property', () => {
        test('hides the component', () => {
            const wrapper = mount(
                ThemeWrapped(<Banner type="warning" hidden={true}>WARNING! test test</Banner>),
            );

            expect(wrapper.exists('[data-testid="container"]')).toBeFalsy();
        });

        test('does not hide by default', () => {
            const wrapper = mount(
                ThemeWrapped(<Banner type="warning">WARNING! test test</Banner>),
            );

            expect(wrapper.exists('[data-testid="container"]')).toBeTruthy();
        });
    });
});
