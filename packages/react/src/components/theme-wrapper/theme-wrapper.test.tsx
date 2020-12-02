import { ShadowWrapper } from '@design-elements/components/shadow-wrapper/shadow-wrapper';
import { shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import { Button, testTheme } from '../..';
import { ThemeWrapper } from './theme-wrapper';

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

    test('should not use ShadowWrapper by default', () => {
        const wrapper = shallow(<ThemeWrapper />);

        expect(wrapper.find(ShadowWrapper)).toHaveLength(0);
    });

    test('should use ShadowWrapper when styles are isolated', () => {
        const wrapper = shallow(<ThemeWrapper isolateStyles />);

        expect(wrapper.find(ShadowWrapper)).toHaveLength(1);
    });
});
