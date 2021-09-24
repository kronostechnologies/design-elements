import React from 'react';
import { Icon } from '../..';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithProviders } from '../../test-utils/renderer';
import { Tooltip } from './tooltip';

jest.mock('../../utils/uuid');

describe('Tooltip', () => {
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
