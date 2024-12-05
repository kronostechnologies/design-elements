import {
    Button,
    DesignSystem,
    SectionalBanner,
    DropdownList,
    DropdownListOption,
    ThemeCustomization,
    equisoftThemeCustomization,
    useTheme,
} from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta = {
    title: 'Getting Started',
    component: DesignSystem,
};

export default meta;

type Story = StoryObj<typeof DesignSystem>;

const flowerThemeCustomization: ThemeCustomization = {
    ref: {
        'color-brand-05': '#e9e0f9',
        'color-brand-20': '#ad84ea',
        'color-brand-50': '#710096',
        'color-brand-70': '#36005a',
        'color-brand-80': '#230139',
        'color-accent-20': '#f9f5b2',
        'color-accent-50': '#efbd3e',
        'color-accent-70': '#d4a714',
        'color-white': '#FFFFFF',
        'color-black': '#000000',
        'color-neutral-02': '#FAFAFA',
        'color-neutral-05': '#F1F2F2',
        'color-neutral-15': '#DBDEE1',
        'color-neutral-30': '#B7BBC2',
        'color-neutral-50': '#878F9A',
        'color-neutral-65': '#60666E',
        'color-neutral-90': '#1B1C1E',
        'color-alert-02': '#fdfcf6',
        'color-alert-05': '#faf6e9',
        'color-alert-20': '#f9e399',
        'color-alert-50': '#cd9d23',
        'color-alert-70': '#7b6315',
        'color-informative-02': '#F9F7FB',
        'color-informative-05': '#E0F0F9',
        'color-informative-20': '#84C6EA',
        'color-informative-50': '#006296',
        'color-informative-70': '#003A5A',
        'color-success-02': '#F6FCF8',
        'color-success-05': '#E1F7EA',
        'color-success-20': '#8ADDA9',
        'color-success-50': '#008533',
        'color-success-70': '#004F1E',
        'color-warning-02': '#FFFBF5',
        'color-warning-05': '#FFF7E5',
        'color-warning-20': '#FFDD99',
        'color-warning-50': '#F5A200',
        'color-warning-70': '#9E6900',
        'color-warning-80': '#664400',
        'color-discovery-02': '#F9F7FB',
        'color-discovery-05': '#EFEAF6',
        'color-discovery-20': '#CFC1E3',
        'color-discovery-50': '#602FA0',
        'color-discovery-70': '#3A1C60',
    },
};

export const Theming: Story = {
    render() {
        const [themeCustomization, setThemeCustomization] = useState(equisoftThemeCustomization);
        const [label, setLabel] = useState('Equisoft Theme');

        function setCustomTheme(newSelectedTheme: DropdownListOption): void {
            setLabel(newSelectedTheme.label);
            switch (newSelectedTheme.value) {
                case 'flower':
                    setThemeCustomization(flowerThemeCustomization);
                    break;
                case 'equisoft':
                default:
                    setThemeCustomization(equisoftThemeCustomization);
                    break;
            }
        }

        return (
            <DesignSystem themeCustomization={themeCustomization}>
                <div>
                    <div style={{ display: 'box', alignItems: 'center', gap: '2rem' }}>
                        <h3>{label}</h3>
                        <div style={{ width: '200px' }}>
                            <DropdownList
                                onChange={(option: DropdownListOption) => setCustomTheme(option)}
                                defaultValue="equisoft"
                                options={[
                                    {
                                        label: 'Equisoft Theme',
                                        value: 'equisoft',
                                    },
                                    {
                                        label: 'Flower Theme',
                                        value: 'flower',
                                    },
                                ]}
                            />
                        </div>
                    </div>
                    <div style={{
                        display: 'table-row', alignItems: 'center',
                    }}
                    >
                        <div style={{ padding: '1rem' }}>
                            <Button label="Primary" buttonType="primary" />
                            <Button label="Secondary" buttonType="secondary" />
                            <Button label="Tertiary" buttonType="tertiary" />
                            <Button label="Destructive Primary" buttonType="destructive-primary" />
                            <Button label="Destructive Secondary" buttonType="destructive-secondary" />
                        </div>
                        <div style={{ padding: '1rem' }}>
                            <Button label="Primary" buttonType="primary" disabled />
                            <Button label="Secondary" buttonType="secondary" disabled />
                            <Button label="Tertiary" buttonType="tertiary" disabled />
                            <Button label="Destructive Primary" buttonType="destructive-primary" disabled />
                            <Button label="Destructive Secondary" buttonType="destructive-secondary" disabled />
                        </div>
                        <div style={{
                            backgroundColor: useTheme().component['global-header-background-color'],
                            padding: '1rem',
                        }}
                        >
                            <Button label="Primary" buttonType="primary" inverted />
                            <Button label="Secondary" buttonType="secondary" inverted />
                            <Button label="Tertiary" buttonType="tertiary" inverted />
                            <Button label="Destructive Primary" buttonType="destructive-primary" inverted />
                            <Button label="Destructive Secondary" buttonType="destructive-secondary" inverted />
                        </div>
                        <div style={{
                            backgroundColor: useTheme().component['global-header-background-color'],
                            padding: '1rem',
                        }}
                        >
                            <Button label="Primary" buttonType="primary" inverted disabled />
                            <Button label="Secondary" buttonType="secondary" inverted disabled />
                            <Button label="Tertiary" buttonType="tertiary" inverted disabled />
                            <Button label="Destructive Primary" buttonType="destructive-primary" inverted disabled />
                            <Button
                                label="Destructive Secondary"
                                buttonType="destructive-secondary"
                                inverted
                                disabled
                            />
                        </div>
                    </div>
                </div>
            </DesignSystem>
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
