import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeWrapped } from '../../test-utils/theme-wrapped';
import { Tooltip, TooltipArrow, TooltipContainer } from './tooltip';
jest.mock('uuid/v4');

describe('Tooltip', () => {
    test('Has default desktop styles', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <Tooltip>
                    Test Content
                </Tooltip>),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Has mobile styles', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <Tooltip device="mobile">
                    Test Content
                </Tooltip>),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('TooltipContainer has desktop styles', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <TooltipContainer>
                    <TooltipArrow />
                    Test Content
                </TooltipContainer>),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('TooltipContainer has mobile styles', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <TooltipContainer mobile>
                    <TooltipArrow />
                    Test Content
                </TooltipContainer>),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
