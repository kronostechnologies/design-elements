import { render, shallow } from 'enzyme';
import { buildTheme, Button } from '../..';
import { ShadowWrapper } from '../shadow-wrapper/shadow-wrapper';
import { ThemeWrapper } from './theme-wrapper';
import { ThemeCustomization } from '../../themes/theme';

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
        const themeCustomization: ThemeCustomization = {
            ref: {
                'color-brand-50': '#00874E',
            },
            component: {
                'button-primary-background-color': 'color-brand-50',
            },
        };

        const builtTheme = buildTheme(themeCustomization);

        const tree1 = render(
            <ThemeWrapper theme={builtTheme}>
                <Button buttonType="primary" />
            </ThemeWrapper>,
        );

        expect(tree1).toMatchSnapshot();
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
