import React, { ReactElement } from 'react';

import renderer from 'react-test-renderer';
import { testTheme } from '../../themes/test-theme';
import { Button } from '../buttons/button';
import { ThemeWrapper } from './theme-wrapper';

export const ThemeWrapped = (children: ReactElement) => (
    <ThemeWrapper>
        {children}
    </ThemeWrapper>
);

describe('Theme Wrapper', () => {
    test('Returns component with default theme', () => {
        const tree = renderer.create(
            <ThemeWrapper>
                <Button buttonType="primary" />
            </ThemeWrapper>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
    test('Returns component with test theme', () => {
        const tree = renderer.create(
            <ThemeWrapper theme={testTheme}>
                <Button buttonType="primary" />
            </ThemeWrapper>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
