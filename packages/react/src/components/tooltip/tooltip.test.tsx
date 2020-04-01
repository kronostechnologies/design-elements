import React, { ReactElement } from 'react';
import renderer from 'react-test-renderer';

import { DeviceContextWrapped } from '../../test-utils/device-context-wrapped';
import { ThemeWrapped } from '../../test-utils/theme-wrapped';
import { Tooltip, TooltipArrow, TooltipContainer } from './tooltip';
jest.mock('uuid/v4');

const renderComponent = (component: ReactElement) => {
    return renderer.create(ThemeWrapped(component)).toJSON();
};

describe('Tooltip', () => {
    test('Has default desktop styles', () => {
        const tree = renderComponent(
            <Tooltip>
                Test Content
            </Tooltip>,
        );

        expect(tree).toMatchSnapshot();
    });

    test('Has mobile styles', () => {
        const tree = renderComponent(
            DeviceContextWrapped(
                <Tooltip>
                    Test Content
                </Tooltip>,
                'mobile',
            ),
        );

        expect(tree).toMatchSnapshot();
    });

    test('TooltipContainer has desktop styles', () => {
        const tree = renderComponent(
            <TooltipContainer>
                <TooltipArrow />
                Test Content
            </TooltipContainer>,
        );

        expect(tree).toMatchSnapshot();
    });

    test('TooltipContainer has mobile styles', () => {
        const tree = renderComponent(
            <TooltipContainer isMobile>
                <TooltipArrow />
                Test Content
            </TooltipContainer>,
        );

        expect(tree).toMatchSnapshot();
    });
});
