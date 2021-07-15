import React from 'react';
import { mountWithProviders } from '../../test-utils/renderer';
import { Tooltip } from './tooltip';

jest.mock('../../utils/uuid');

describe('Tooltip', () => {
    test('Has default desktop styles', () => {
        const tree = mountWithProviders(
            <Tooltip>
                Test Content
            </Tooltip>,
            { wrappingComponentProps: { staticDevice: 'desktop' } },
        );

        expect(tree).toMatchSnapshot();
    });

    test('Has default desktop styles (defaultOpen)', () => {
        const tree = mountWithProviders(
            <Tooltip defaultOpen>
                Test Content
            </Tooltip>,
            { wrappingComponentProps: { staticDevice: 'desktop' } },
        );

        expect(tree).toMatchSnapshot();
    });

    test('Has mobile styles', () => {
        const tree = mountWithProviders(
            <Tooltip>
                Test Content
            </Tooltip>,
            { wrappingComponentProps: { staticDevice: 'mobile' } },
        );

        expect(tree).toMatchSnapshot();
    });

    test('Has mobile styles (defaultOpen)', () => {
        const tree = mountWithProviders(
            <Tooltip defaultOpen>
                Test Content
            </Tooltip>,
            { wrappingComponentProps: { staticDevice: 'mobile' } },
        );

        expect(tree).toMatchSnapshot();
    });
});
