import { render, shallow } from 'enzyme';
import { Button } from '../..';
import { ShadowWrapper } from '../shadow-wrapper/shadow-wrapper';
import { ThemeWrapper } from './theme-wrapper';
import { ThemeCustomization } from '../../themes/theme';

const ThemeCustomization: ThemeCustomization = {
    ref: {
        'color-brand-50': '#00874E',
        'color-brand-20': '#9EDBC1',
        'color-brand-70': '#0B5E37',
        'color-brand-05': '#E5F3ED',
        'color-brand-80': '#00874E',
        'color-accent-50': '#00874E',
        'color-accent-20': '#CC9B0B',
        'color-accent-70': '#3F474C',
    },
    alias: {
        'default-text-color': 'color-brand-05',
        'alternate-text-color': 'color-brand-20',
    },
    component: {
        'button-primary-background-color': 'color-brand-50',
        'button-primary-inverted-background-color': 'color-white',
        'button-primary-border-color': 'color-brand-50',
        'button-primary-inverted-border-color': 'color-white',
        'button-primary-text-color': 'color-white',
        'button-primary-inverted-text-color': 'color-brand-50',
    },
};

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
            <ThemeWrapper theme={ThemeCustomization}>
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
