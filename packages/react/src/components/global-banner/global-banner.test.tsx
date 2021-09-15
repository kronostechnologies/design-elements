import React from 'react';
import { mountWithTheme, renderWithProviders } from '../../test-utils/renderer';
import { GlobalBanner } from './global-banner';
import { getByTestId } from '../../test-utils/enzyme-selectors';

describe('GlobalBanner', () => {
    test('Matches snapshot (desktop)', () => {
        const tree = renderWithProviders(
            <GlobalBanner label="Test" type="warning">
                WARNING! Lorem ipsum
            </GlobalBanner>,
            'desktop',
        );

        expect(tree).toMatchSnapshot();
    });

    test('Matches snapshot (mobile)', () => {
        const tree = renderWithProviders(
            <GlobalBanner label="Test" type="alert">
                ERROR! Lorem ipsum
            </GlobalBanner>,
            'mobile',
        );

        expect(tree).toMatchSnapshot();
    });

    test('Ignore button hides the banner', () => {
        const wrapper = mountWithTheme(
            <GlobalBanner label="Test" type="warning">WARNING! test test</GlobalBanner>,
        );

        getByTestId(wrapper, 'ignore-button').simulate('click');

        expect(getByTestId(wrapper, 'container').exists()).toBe(false);
    });

    describe('Hidden property', () => {
        test('hides the component', () => {
            const wrapper = mountWithTheme(
                <GlobalBanner label="Test" type="warning" hidden>WARNING! test test</GlobalBanner>,
            );

            expect(getByTestId(wrapper, 'container').exists()).toBe(false);
        });

        test('does not hide by default', () => {
            const wrapper = mountWithTheme(
                <GlobalBanner label="Test" type="warning">WARNING! test test</GlobalBanner>,
            );

            expect(getByTestId(wrapper, 'container').exists()).toBe(true);
        });
    });
});
