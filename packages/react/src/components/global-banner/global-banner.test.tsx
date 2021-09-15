import React from 'react';
import { mountWithTheme, renderWithProviders } from '../../test-utils/renderer';
import { GlobalBanner } from './global-banner';

describe('GlobalBanner', () => {
    test('Matches snapshot (desktop)', () => {
        const tree = renderWithProviders(
            <GlobalBanner type="warning">
                WARNING! Lorem ipsum
            </GlobalBanner>,
            'desktop',
        );

        expect(tree).toMatchSnapshot();
    });

    test('Matches snapshot (mobile)', () => {
        const tree = renderWithProviders(
            <GlobalBanner type="error">
                ERROR! Lorem ipsum
            </GlobalBanner>,
            'mobile',
        );

        expect(tree).toMatchSnapshot();
    });

    test('X button closes the component', () => {
        const wrapper = mountWithTheme(
            <GlobalBanner type="warning">WARNING! test test</GlobalBanner>,
        );

        const close = wrapper.find('[data-testid="closeButton"]').at(1);
        close.simulate('click');

        expect(wrapper.exists('[data-testid="container"]')).toBeFalsy();
    });

    describe('Hidden property', () => {
        test('hides the component', () => {
            const wrapper = mountWithTheme(
                <GlobalBanner type="warning" hidden>WARNING! test test</GlobalBanner>,
            );

            expect(wrapper.exists('[data-testid="container"]')).toBeFalsy();
        });

        test('does not hide by default', () => {
            const wrapper = mountWithTheme(
                <GlobalBanner type="warning">WARNING! test test</GlobalBanner>,
            );

            expect(wrapper.exists('[data-testid="container"]')).toBeTruthy();
        });
    });
});
