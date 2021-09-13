import React from 'react';
import { findByTestId, getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithProviders, renderWithProviders } from '../../test-utils/renderer';
import { DeviceType } from '../device-context-provider/device-context-provider';
import { SectionalBanner } from './sectional-banner';

describe('SectionalBanner', () => {
    it('should match snapshot (desktop)', () => {
        const tree = renderWithProviders(
            <SectionalBanner type="info">
                Test
            </SectionalBanner>,
            'desktop',
        );

        expect(tree).toMatchSnapshot();
    });

    it('should match snapshot (mobile)', () => {
        const tree = renderWithProviders(
            <SectionalBanner type="info">
                Test
            </SectionalBanner>,
            'mobile',
        );

        expect(tree).toMatchSnapshot();
    });

    (['mobile', 'desktop'] as DeviceType[]).forEach((device) => {
        it(`should not show dismiss button when type is alert (${device})`, () => {
            const wrapper = mountWithProviders(
                <SectionalBanner
                    type="alert"
                    onDismiss={jest.fn()}
                >
                    Test
                </SectionalBanner>,
                { wrappingComponentProps: { staticDevice: device } },
            );

            const dismissButton = findByTestId(wrapper, 'dismiss-button');

            expect(dismissButton.exists()).toBe(false);
        });

        it(`should show destructive button when type is alert (${device})`, () => {
            const wrapper = mountWithProviders(
                <SectionalBanner
                    type="alert"
                    buttonLabel="some button"
                    onButtonClicked={jest.fn()}
                >
                    Test
                </SectionalBanner>,
                { wrappingComponentProps: { staticDevice: device } },
            );

            const buttonWrapper = getByTestId(wrapper, `${device}-button`);
            const button = getByTestId(buttonWrapper, 'button');

            expect(button.prop('buttonType')).toBe('destructive');
        });

        it(`should call callback when dismiss button is clicked (${device})`, () => {
            const onDismiss = jest.fn();
            const wrapper = mountWithProviders(
                <SectionalBanner
                    type="info"
                    onDismiss={onDismiss}
                >
                    Test
                </SectionalBanner>,
                { wrappingComponentProps: { staticDevice: device } },
            );

            getByTestId(wrapper, 'dismiss-button').simulate('click');

            expect(onDismiss).toBeCalled();
        });

        it(`should call callback when button is clicked (${device})`, () => {
            const onButtonClicked = jest.fn();
            const wrapper = mountWithProviders(
                <SectionalBanner
                    type="info"
                    buttonLabel="some button"
                    onButtonClicked={onButtonClicked}
                >
                    Test
                </SectionalBanner>,
                { wrappingComponentProps: { staticDevice: device } },
            );

            getByTestId(wrapper, `${device}-button`).simulate('click');

            expect(onButtonClicked).toBeCalled();
        });
    });
});
