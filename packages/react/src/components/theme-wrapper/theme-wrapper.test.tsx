import { render, shallow } from 'enzyme';
import { Button, customTheme } from '../..';
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

    test('Returns component with test theme', () => {
        const tree = render(
            <ThemeWrapper theme={customTheme}>
                <Button buttonType="primary" />
            </ThemeWrapper>,
        );

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
