import React from 'react';
import { Icon } from '../..';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithProviders } from '../../test-utils/renderer';
import { Tooltip } from './tooltip';

jest.mock('../../utils/uuid');

describe('Tooltip', () => {
    describe('desktop', () => {
        test('opens on mouseEnter', () => {
            const wrapper = mountWithProviders(
                <Tooltip label="Test Content" />,
                { wrappingComponentProps: { staticDevice: 'desktop' } },
            );

            getByTestId(wrapper, 'tooltip').simulate('mouseenter');

            expect(getByTestId(wrapper, 'tooltip-content-container').prop('visible')).toBe(true);
        });

        test('closes on mouseLeave given tooltip is open', () => {
            const wrapper = mountWithProviders(
                <Tooltip label="Test Content" defaultOpen />,
                { wrappingComponentProps: { staticDevice: 'desktop' } },
            );

            getByTestId(wrapper, 'tooltip').simulate('mouseleave');

            expect(getByTestId(wrapper, 'tooltip-content-container').prop('visible')).toBe(false);
        });

        test('does not open on mouseEnter given tooltip is disabled', () => {
            const wrapper = mountWithProviders(
                <Tooltip label="Test Content" disabled />,
                { wrappingComponentProps: { staticDevice: 'desktop' } },
            );

            getByTestId(wrapper, 'tooltip').simulate('mouseenter');

            expect(getByTestId(wrapper, 'tooltip-content-container').prop('visible')).toBe(false);
        });

        test('opens on focus', () => {
            const wrapper = mountWithProviders(
                <Tooltip label="Test Content" />,
                { wrappingComponentProps: { staticDevice: 'desktop' } },
            );

            getByTestId(wrapper, 'tooltip').simulate('focus');

            expect(getByTestId(wrapper, 'tooltip-content-container').prop('visible')).toBe(true);
        });

        test('closes on blur given tooltip is open', () => {
            const wrapper = mountWithProviders(
                <Tooltip label="Test Content" defaultOpen />,
                { wrappingComponentProps: { staticDevice: 'desktop' } },
            );

            getByTestId(wrapper, 'tooltip').simulate('blur');

            expect(getByTestId(wrapper, 'tooltip-content-container').prop('visible')).toBe(false);
        });

        test('does not open on focus given tooltip is disabled', () => {
            const wrapper = mountWithProviders(
                <Tooltip label="Test Content" disabled />,
                { wrappingComponentProps: { staticDevice: 'desktop' } },
            );

            getByTestId(wrapper, 'tooltip').simulate('focus');

            expect(getByTestId(wrapper, 'tooltip-content-container').prop('visible')).toBe(false);
        });
    });

    test('Has default desktop styles', () => {
        const tree = mountWithProviders(
            <Tooltip label="Test Content" />,
            { wrappingComponentProps: { staticDevice: 'desktop' } },
        );

        expect(tree).toMatchSnapshot();
    });

    test('Has default desktop styles (defaultOpen)', () => {
        const tree = mountWithProviders(
            <Tooltip defaultOpen label="Test Content" />,
            { wrappingComponentProps: { staticDevice: 'desktop' } },
        );

        expect(tree).toMatchSnapshot();
    });

    test('Has mobile styles', () => {
        const tree = mountWithProviders(
            <Tooltip label="Test Content" />,
            { wrappingComponentProps: { staticDevice: 'mobile' } },
        );

        expect(tree).toMatchSnapshot();
    });

    test('Has mobile styles (defaultOpen)', () => {
        const tree = mountWithProviders(
            <Tooltip defaultOpen label="Test Content" />,
            { wrappingComponentProps: { staticDevice: 'mobile' } },
        );

        expect(tree).toMatchSnapshot();
    });

    test('Renders label', () => {
        const wrapper = mountWithProviders(
            <Tooltip defaultOpen label="Test Content" />,
            { wrappingComponentProps: { staticDevice: 'mobile' } },
        );

        expect(getByTestId(wrapper, 'tooltip-content-container').text()).toBe('Test Content');
    });

    test('Renders children icon', () => {
        const wrapper = mountWithProviders(
            <Tooltip defaultOpen label="Test Content">
                <Icon data-testid="icon-children" aria-hidden="true" name="settings" size="20" />
            </Tooltip>,
            { wrappingComponentProps: { staticDevice: 'mobile' } },
        );

        const iconChildren = getByTestId(wrapper, 'icon-children');

        expect(iconChildren.exists()).toBe(true);
    });
});
