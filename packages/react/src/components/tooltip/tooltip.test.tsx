import { renderWithProviders } from '@design-elements/test-utils/renderer';
import React from 'react';
import { Tooltip, TooltipArrow, TooltipContainer } from './tooltip';

jest.mock('uuid/v4');

describe('Tooltip', () => {
    test('Has default desktop styles', () => {
        const tree = renderWithProviders(
            <Tooltip>
                Test Content
            </Tooltip>,
        );

        expect(tree).toMatchSnapshot();
    });

    test('Has mobile styles', () => {
        const tree = renderWithProviders(
            <Tooltip>
                Test Content
            </Tooltip>,
            'mobile',
        );

        expect(tree).toMatchSnapshot();
    });

    test('TooltipContainer has desktop styles', () => {
        const tree = renderWithProviders(
            <TooltipContainer>
                <TooltipArrow />
                Test Content
            </TooltipContainer>,
        );

        expect(tree).toMatchSnapshot();
    });

    test('TooltipContainer has mobile styles', () => {
        const tree = renderWithProviders(
            <TooltipContainer isMobile>
                <TooltipArrow />
                Test Content
            </TooltipContainer>,
        );

        expect(tree).toMatchSnapshot();
    });
});
