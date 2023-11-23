import { render, shallow } from 'enzyme';
import { Button } from '../..';
import { ShadowWrapper } from '../shadow-wrapper/shadow-wrapper';
import { ThemeWrapper } from './theme-wrapper';

const customTheme = {
    ref: {
        'color-brand-05': '#E5F3ED',
        'color-brand-20': '#9EDBC1',
        'color-brand-50': '#00874E',
        'color-brand-70': '#0B5E37',
        'color-brand-80': '#00874E',
        'color-accent-20': '#CC9B0B',
        'color-accent-50': '#FFC20E',
        'color-accent-70': '#3F474C',
        'color-white': '#FFFFFF',
        'color-black': '#000000',
        'color-neutral-02': '#FAFAFA',
        'color-neutral-05': '#F1F2F2',
        'color-neutral-15': '#DBDEE1',
        'color-neutral-30': '#B7BBC2',
        'color-neutral-50': '#878F9A',
        'color-neutral-65': '#60666E',
        'color-neutral-90': '#1B1C1E',
        'color-success-05': '#F6FCF8',
        'color-success-20': '#8ADDA9',
        'color-success-50': '#008533',
        'color-success-70': '#004F1E',
        'color-alert-05': '#FDF7F6',
        'color-alert-20': '#F99D99',
        'color-alert-50': '#CD2C23',
        'color-alert-70': '#7B1A15',
        'color-warning-05': '#FFFBF5',
        'color-warning-20': '#FFDD99',
        'color-warning-50': '#F5A200',
        'color-warning-70': '#9E6900',
        'color-informative-02': '#F9F7FB',
        'color-informative-05': '#E0F0F9',
        'color-informative-20': '#84C6EA',
        'color-informative-50': '#006296',
        'color-informative-70': '#003A5A',
        'color-discovery-02': '#F9F7FB',
        'color-discovery-05': '#EFEAF6',
        'color-discovery-20': '#CFC1E3',
        'color-discovery-50': '#602FA0',
        'color-discovery-70': '#3A1C60',
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
