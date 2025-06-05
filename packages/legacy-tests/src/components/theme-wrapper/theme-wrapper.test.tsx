import { render, shallow } from 'enzyme';
import { buildTheme, Button } from '~/components/..';
import { ThemeCustomization } from '~/components/../themes/theme';
import { ShadowWrapper } from '~/components/shadow-wrapper/shadow-wrapper';
import { ThemeWrapper } from '~/components/theme-wrapper/theme-wrapper';

describe('Theme Wrapper', () => {
    it('Returns component with default theme', () => {
        const tree = render(
            <ThemeWrapper>
                <Button buttonType="primary" />
            </ThemeWrapper>,
        );

        expect(tree).toMatchSnapshot();
    });

    it('Returns component with custom theme', () => {
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

    it('should not use ShadowWrapper by default', () => {
        const wrapper = shallow(<ThemeWrapper />);

        expect(wrapper.find(ShadowWrapper)).toHaveLength(0);
    });

    it('should use ShadowWrapper when styles are isolated', () => {
        const wrapper = shallow(<ThemeWrapper isolateStyles />);

        expect(wrapper.find(ShadowWrapper)).toHaveLength(1);
    });
});
