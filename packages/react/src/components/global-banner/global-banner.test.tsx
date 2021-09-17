import React from 'react';
import { mountWithTheme, renderWithProviders } from '../../test-utils/renderer';
import { ActionButton, GlobalBanner, MessageType } from './global-banner';
import { getByTestId } from '../../test-utils/enzyme-selectors';

const defaultActionButton: ActionButton = {
    label: 'Test button',
    onClick: jest.fn(),
};

const messageTypeArray: MessageType[] = ['alert', 'warning', 'info'];

describe('GlobalBanner', () => {
    messageTypeArray.forEach((type): void => {
        test(`Matches snapshot (desktop, ${type})`, () => {
            const tree = renderWithProviders(
                <GlobalBanner actionButton={defaultActionButton} label={type} type={type}>
                    Test content
                </GlobalBanner>,
                'desktop',
            );

            expect(tree).toMatchSnapshot();
        });

        test(`Matches snapshot (mobile, ${type})`, () => {
            const tree = renderWithProviders(
                <GlobalBanner actionButton={defaultActionButton} label={type} type={type}>
                    Test content
                </GlobalBanner>,
                'mobile',
            );

            expect(tree).toMatchSnapshot();
        });
    });

    test('Should call action-button onClick callback when action-button is clicked', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(
            <GlobalBanner
                actionButton={{
                    label: 'Test button',
                    onClick: callback,
                }}
                label="Test"
                type="warning"
            >
                Test
            </GlobalBanner>,
        );

        getByTestId(wrapper, 'action-button').simulate('click');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('Ignore-button hides the banner', () => {
        const wrapper = mountWithTheme(
            <GlobalBanner
                actionButton={defaultActionButton}
                label="Test"
                type="warning"
            >
                WARNING! test test
            </GlobalBanner>,
        );

        getByTestId(wrapper, 'ignore-button').simulate('click');

        expect(getByTestId(wrapper, 'container').exists()).toBe(false);
    });

    describe('Hidden property', () => {
        test('hides the component', () => {
            const wrapper = mountWithTheme(
                <GlobalBanner
                    actionButton={defaultActionButton}
                    label="Test"
                    type="warning"
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
                    type="warning"
                >
                    WARNING! test test
                </GlobalBanner>,
            );

            expect(getByTestId(wrapper, 'container').exists()).toBe(true);
        });
    });
});
