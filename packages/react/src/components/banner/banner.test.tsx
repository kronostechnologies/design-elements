import { mountWithTheme, renderWithProviders } from '@design-elements/test-utils/renderer';
import React from 'react';
import { Banner } from './banner';

describe('Banner', () => {
    test('Matches snapshot (desktop)', () => {
        const tree = renderWithProviders(
            <Banner type="warning">
                WARNING! Lorem ipsum
            </Banner>,
            'desktop',
        );

        expect(tree).toMatchSnapshot();
    });

    test('Matches snapshot (mobile)', () => {
        const tree = renderWithProviders(
            <Banner type="error">
                ERROR! Lorem ipsum
            </Banner>,
            'mobile',
        );

        expect(tree).toMatchSnapshot();
    });

    test('X button closes the component', () => {
        const wrapper = mountWithTheme(
            <Banner type="warning">WARNING! test test</Banner>,
        );

        const close = wrapper.find('[data-testid="closeButton"]').at(1);
        close.simulate('click');

        expect(wrapper.exists('[data-testid="container"]')).toBeFalsy();
    });

    describe('Hidden property', () => {
        test('hides the component', () => {
            const wrapper = mountWithTheme(
                <Banner type="warning" hidden>WARNING! test test</Banner>,
            );

            expect(wrapper.exists('[data-testid="container"]')).toBeFalsy();
        });

        test('does not hide by default', () => {
            const wrapper = mountWithTheme(
                <Banner type="warning">WARNING! test test</Banner>,
            );

            expect(wrapper.exists('[data-testid="container"]')).toBeTruthy();
        });
    });
});
