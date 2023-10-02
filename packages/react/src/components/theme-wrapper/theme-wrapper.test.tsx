import { render, shallow } from 'enzyme';
import { Button } from '../..';
import { ShadowWrapper } from '../shadow-wrapper/shadow-wrapper';
import { ThemeWrapper } from './theme-wrapper';

const customTheme = {
    colors: {
        'primary-1.1': '#00874E',
        'primary-1.2': '#9EDBC1',
        'primary-1.3': '#0B5E37',
        'primary-1.4': '#E5F3ED',
        'primary-2': '#00874E',
        'primary-3': '#004E78',
        'secondary-4.1': '#FFC20E',
        'secondary-4.2': '#CC9B0B',
        'secondary-4.3': '#3F474C',
        'brand-05': '#E5F3ED',
        'brand-20': '#9EDBC1',
        'brand-50': '#00874E',
        'brand-70': '#0B5E37',
        'brand-80': '#00874E',
        'accent-20': '#CC9B0B',
        'accent-50': '#FFC20E',
        'accent-70': '#3F474C',
        white: '#FFFFFF',
        'neutral-02': '#FAFAFA',
        'neutral-05': '#F1F2F2',
        'neutral-15': '#DBDEE1',
        'neutral-30': '#B7BBC2',
        'neutral-50': '#878F9A',
        'neutral-65': '#60666E',
        'neutral-90': '#1B1C1E',
        'colored-white': '#FAFAFA',
        'light-grey': '#F1F2F2',
        grey: '#DBDEE1',
        'mid-grey': '#B7BBC2',
        'dark-grey': '#60666E',
        black: '#000000',
        'info-1.1': '#602FA0',
        'success-1.1': '#008533',
        'success-1.2': '#F6FCF8',
        'success-1.3': '#8ADDA9',
        'alert-2.1': '#CD2C23',
        'alert-2.2': '#FFFAFB',
        'warning-3.1': '#F5A200',
        'warning-3.2': '#FFF9F5',
        'warning-3.3': '#FFB302',
        'warning-3.4': '#A36D00',
        'success-05': '#F6FCF8',
        'success-20': '#8ADDA9',
        'success-50': '#008533',
        'success-70': '#004F1E',
        'alert-05': '#FDF7F6',
        'alert-20': '#F99D99',
        'alert-50': '#CD2C23',
        'alert-70': '#7B1A15',
        'warning-05': '#FFFBF5',
        'warning-20': '#FFDD99',
        'warning-50': '#F5A200',
        'warning-70': '#9E6900',
        'informative-05': '#F9F7FB',
        'informative-20': '#CFC1E3',
        'informative-50': '#602FA0',
        'informative-70': '#3A1C60',
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
