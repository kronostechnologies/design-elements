import { render, shallow } from 'enzyme';
import { Button, themeCustomization1, themeCustomization2 } from '../..';
import { ShadowWrapper } from '../shadow-wrapper/shadow-wrapper';
import { ThemeWrapper } from './theme-wrapper';

describe('Theme Wrapper', () => {
    test('Returns component with default theme', () => {
        const tree = render(
            <ThemeWrapper>
                <Button buttonType="primary" />
            </ThemeWrapper>,
        );

        expect(tree).toMatchSnapshot();
    });

    test('Returns component with custom theme', () => {
        const tree1 = render(
            <ThemeWrapper theme={themeCustomization1}>
                <Button buttonType="primary" />
            </ThemeWrapper>,
        );

        const tree2 = render(
            <ThemeWrapper theme={themeCustomization2}>
                <Button buttonType="primary" />
            </ThemeWrapper>,
        );

        expect(tree1).toMatchSnapshot();
        expect(tree2).toMatchSnapshot();
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
