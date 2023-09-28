import { Button, DesignSystem, SectionalBanner } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
    title: 'Introduction',
    component: DesignSystem,
};

export default meta;

type Story = StoryObj<typeof DesignSystem>;

// This would be the overwreitting of the default theme (could be partial or complete)
// Developer can come 
const customTheme = {
    "colors": {
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
        "white": "#FFFFFF",
        "neutral-02": "#FAFAFA",
        "neutral-05": "#F1F2F2",
        "neutral-15": "#DBDEE1",
        "neutral-30": "#B7BBC2",
        "neutral-50": "#878F9A",
        "neutral-65": "#60666E",
        "neutral-90": "#1B1C1E",
        "colored-white": "#FAFAFA",
        "light-grey": "#F1F2F2",
        "grey": "#DBDEE1",
        "mid-grey": "#B7BBC2",
        "dark-grey": "#60666E",
        "black": "#000000",
        "info-1.1": "#602FA0",
        "success-1.1": "#008533",
        "success-1.2": "#F6FCF8",
        "success-1.3": "#8ADDA9",
        "alert-2.1": "#CD2C23",
        "alert-2.2": "#FFFAFB",
        "warning-3.1": "#F5A200",
        "warning-3.2": "#FFF9F5",
        "warning-3.3": "#FFB302",
        "warning-3.4": "#A36D00",
        "success-05": "#F6FCF8",
        "success-20": "#8ADDA9",
        "success-50": "#008533",
        "success-70": "#004F1E",
        "alert-05": "#FDF7F6",
        "alert-20": "#F99D99",
        "alert-50": "#CD2C23",
        "alert-70": "#7B1A15",
        "warning-05": "#FFFBF5",
        "warning-20": "#FFDD99",
        "warning-50": "#F5A200",
        "warning-70": "#9E6900",
        "informative-05": "#F9F7FB",
        "informative-20": "#CFC1E3",
        "informative-50": "#602FA0",
        "informative-70": "#3A1C60"
    },
    "tokens":{
        "button-primary-bg": "colors.brand-50",
        "button-primary-inverted-bg": "colors.white",
        "button-primary-border": "colors.brand-50",
        "button-primary-inverted-border": "colors.white",
        "button-primary-color": "colors.white",
        "button-primary-inverted-color": "colors.brand-50",
        "button-primary-hover-bg": "colors.brand-70",
        "button-primary-inverted-hover-bg": "colors.white",
        "button-primary-hover-border": "colors.brand-70",
        "button-primary-inverted-hover-border": "colors.white",
        "button-primary-hover-color": "colors.white",
        "button-primary-inverted-hover-color": "colors.brand-70",
        "button-primary-focus-bg": "colors.brand-50",
        "button-primary-inverted-focus-bg": "colors.white",
        "button-primary-focus-border": "colors.brand-50",
        "button-primary-inverted-focus-border": "colors.white",
        "button-primary-focus-color": "colors.white",
        "button-primary-inverted-focus-color": "colors.brand-50",
        "button-primary-disabled-bg": "colors.brand-20",
        "button-primary-inverted-disabled-bg": "colors.white",
        "button-primary-disabled-border": "colors.brand-20",
        "button-primary-inverted-disabled-border": "colors.white",
        "button-primary-disabled-color": "colors.white",
        "button-primary-inverted-disabled-color": "colors.brand-20",
        "button-secondary-bg": "colors.white",
        "button-secondary-inverted-bg": "transparent",
        "button-secondary-border": "colors.brand-50",
        "button-secondary-inverted-border": "colors.white",
        "button-secondary-color": "colors.brand-50",
        "button-secondary-inverted-color": "colors.white",
        "button-secondary-hover-bg": "colors.white",
        "button-secondary-inverted-hover-bg": "transparent",
        "button-secondary-hover-border": "colors.brand-70",
        "button-secondary-inverted-hover-border": "colors.brand-20",
        "button-secondary-hover-color": "colors.brand-70",
        "button-secondary-inverted-hover-color": "colors.brand-20",
        "button-secondary-focus-bg": "colors.white",
        "button-secondary-inverted-focus-bg": "colors.brand-80",
        "button-secondary-focus-border": "colors.brand-50",
        "button-secondary-inverted-focus-border": "colors.brand-50",
        "button-secondary-focus-color": "colors.brand-50",
        "button-secondary-inverted-focus-color": "colors.white",
        "button-secondary-disabled-bg": "colors.white",
        "button-secondary-inverted-disabled-bg": "transparent",
        "button-secondary-disabled-border": "colors.brand-20",
        "button-secondary-inverted-disabled-border": "colors.brand-50",
        "button-secondary-disabled-color": "colors.brand-20",
        "button-secondary-inverted-disabled-color": "colors.brand-50",
        "button-tertiary-bg": "transparent",
        "button-tertiary-inverted-bg": "transparent",
        "button-tertiary-border": "transparent",
        "button-tertiary-inverted-border": "transparent",
        "button-tertiary-color": "colors.neutral-65",
        "button-tertiary-inverted-color": "colors.white",
        "button-tertiary-hover-bg": "colors.neutral-15",
        "button-tertiary-inverted-hover-bg": "colors.brand-70",
        "button-tertiary-hover-border": "transparent",
        "button-tertiary-inverted-hover-border": "transparent",
        "button-tertiary-hover-color": "colors.black",
        "button-tertiary-inverted-hover-color": "colors.white",
        "button-tertiary-focus-bg": "colors.white",
        "button-tertiary-inverted-focus-bg": "colors.brand-80",
        "button-tertiary-focus-border": "colors.brand-50",
        "button-tertiary-inverted-focus-border": "colors.brand-50",
        "button-tertiary-focus-color": "colors.neutral-65",
        "button-tertiary-inverted-focus-color": "colors.white",
        "button-tertiary-disabled-bg": "transparent",
        "button-tertiary-inverted-disabled-bg": "transparent",
        "button-tertiary-disabled-border": "transparent",
        "button-tertiary-inverted-disabled-border": "transparent",
        "button-tertiary-disabled-color": "colors.neutral-30",
        "button-tertiary-inverted-disabled-color": "colors.brand-50",
        "button-destructive-bg": "colors.alert-50",
        "button-destructive-inverted-bg": "colors.white",
        "button-destructive-border": "colors.alert-50",
        "button-destructive-inverted-border": "colors.white",
        "button-destructive-color": "colors.white",
        "button-destructive-inverted-color": "colors.alert-50",
        "button-destructive-hover-bg": "colors.alert-70",
        "button-destructive-inverted-hover-bg": "colors.white",
        "button-destructive-hover-border": "colors.alert-70",
        "button-destructive-inverted-hover-border": "colors.white",
        "button-destructive-hover-color": "colors.white",
        "button-destructive-inverted-hover-color": "colors.alert-70",
        "button-destructive-focus-bg": "colors.alert-50",
        "button-destructive-inverted-focus-bg": "colors.white",
        "button-destructive-focus-border": "colors.alert-20",
        "button-destructive-inverted-focus-border": "colors.white",
        "button-destructive-focus-color": "colors.white",
        "button-destructive-inverted-focus-color": "colors.alert-20",
        "button-destructive-disabled-bg": "colors.alert-20",
        "button-destructive-inverted-disabled-bg": "colors.white",
        "button-destructive-disabled-border": "colors.alert-20",
        "button-destructive-inverted-disabled-border": "colors.white",
        "button-destructive-disabled-color": "colors.white",
        "button-destructive-inverted-disabled-color": "colors.alert-20",
        "button-search-bg": "colors.white",
        "button-search-border": "colors.neutral-65",
        "button-search-color": "colors.neutral-65",
        "button-search-hover-bg": "colors.neutral-15",
        "button-search-hover-color": "colors.black",
        "button-search-disabled-bg": "colors.neutral-05",
        "button-search-disabled-border": "colors.neutral-15",
        "button-search-disabled-color": "colors.neutral-30"
    }
}

export const Theming: Story = {
    render() {
        return (
            <>
                <DesignSystem theme={customTheme}>
                    <div>
                        <h3>Custom theme</h3>
                        <Button label="Primary" buttonType="primary" />
                        <Button label="Secondary" buttonType="secondary" />
                        <Button label="Tertiary" buttonType="tertiary" />
                    </div>
                </DesignSystem>
                <DesignSystem>
                    <div>
                        <h3>Default Equisoft theme</h3>
                        <Button label="Primary" buttonType="primary" />
                        <Button label="Secondary" buttonType="secondary" />
                        <Button label="Tertiary" buttonType="tertiary" />
                    </div>
                </DesignSystem>
            </>
        );
    },
};

export const Internationalization: Story = {
    render() {
        return (
            <DesignSystem language="fr">
                <SectionalBanner type="info">
                    This message however is your responsibility.
                </SectionalBanner>
            </DesignSystem>
        );
    },
};
