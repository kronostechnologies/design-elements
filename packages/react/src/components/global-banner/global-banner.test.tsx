import React from 'react';
import { mountWithTheme, renderWithProviders } from '../../test-utils/renderer';
import { ActionButton, GlobalBanner, GlobalBannerType } from './global-banner';
import { getByTestId } from '../../test-utils/enzyme-selectors';

const defaultActionButton: ActionButton = {
    label: 'Test button',
    onClick: jest.fn(),
};

const bannerTypesArray: GlobalBannerType[] = ['alert', 'warning', 'info', 'default'];

describe('GlobalBanner', () => {
    bannerTypesArray.forEach((type) => {
        test(`matches snapshot (desktop, ${type})`, () => {
            const tree = renderWithProviders(
                <GlobalBanner actionButton={defaultActionButton} dismissable label={type} type={type}>
                    Test content
                </GlobalBanner>,
                'desktop',
            );

            expect(tree).toMatchSnapshot();
        });

        test(`matches snapshot (mobile, ${type})`, () => {
            const tree = renderWithProviders(
                <GlobalBanner actionButton={defaultActionButton} dismissable label={type} type={type}>
                    Test content
                </GlobalBanner>,
                'mobile',
            );

            expect(tree).toMatchSnapshot();
        });
    });

    test('should call action-button onClick callback when action-button is clicked', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(
            <GlobalBanner
                actionButton={{
                    label: 'Test button',
                    onClick: callback,
                }}
                label="Test"
            >
                Test
            </GlobalBanner>,
        );

        getByTestId(wrapper, 'action-button').simulate('click');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('should call secondary-action-button onClick callback when secondary-action-button is clicked', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(
            <GlobalBanner
                secondaryActionButton={{
                    label: 'Test button',
                    onClick: callback,
                }}
                label="Test"
            >
                Test
            </GlobalBanner>,
        );

        getByTestId(wrapper, 'secondary-action-button').simulate('click');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('dimiss-button hides the banner', () => {
        const wrapper = mountWithTheme(
            <GlobalBanner
                actionButton={defaultActionButton}
                label="Test"
                dismissable
            >
                WARNING! test test
            </GlobalBanner>,
        );

        getByTestId(wrapper, 'dismiss-button').simulate('click');

        expect(getByTestId(wrapper, 'container').exists()).toBe(false);
    });

    test('should not have dismiss-button when type is alert', () => {
        const wrapper = mountWithTheme(
            <GlobalBanner
                label="Test"
                type="alert"
                dismissable
            >
                Test content
            </GlobalBanner>,
        );

        expect(getByTestId(wrapper, 'dimiss-button').exists()).toBe(false);
    });

    test('should not have dimiss-button when dismissable is set to false', () => {
        const wrapper = mountWithTheme(
            <GlobalBanner
                label="Test"
                dismissable={false}
            >
                Test content
            </GlobalBanner>,
        );

        expect(getByTestId(wrapper, 'dimiss-button').exists()).toBe(false);
    });

    describe('hidden property', () => {
        test('hides the component', () => {
            const wrapper = mountWithTheme(
                <GlobalBanner
                    actionButton={defaultActionButton}
                    label="Test"
                    hidden
                >
                    WARNING! test test
                </GlobalBanner>,
            );

            expect(getByTestId(wrapper, 'container').exists()).toBe(false);
        });

        test('does not hide by default', () => {
            const wrapper = mountWithTheme(
                <GlobalBanner
                    actionButton={defaultActionButton}
                    label="Test"
                >
                    WARNING! test test
                </GlobalBanner>,
            );

            expect(getByTestId(wrapper, 'container').exists()).toBe(true);
        });
    });
});
