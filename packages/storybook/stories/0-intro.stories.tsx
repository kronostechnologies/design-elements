import {
    Button,
    DesignSystem,
    SectionalBanner,
    DropdownList,
    equisoftTheme,
    DropdownListOption,
} from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ThemeCustomization1, ThemeCustomization2 } from '../test-theme';

const meta: Meta = {
    title: 'Introduction',
    component: DesignSystem,
};

export default meta;

type Story = StoryObj<typeof DesignSystem>;

export const Theming: Story = {
    render() {
        const [theme, setTheme] = useState(equisoftTheme);
        const [label, setLabel] = useState('Equisoft Theme');

        function setCustomTheme(newSelectedTheme: DropdownListOption): void {
            setLabel(newSelectedTheme.label);
            switch (newSelectedTheme.value) {
                case 'customTheme1':
                    setTheme(ThemeCustomization1);
                    break;
                case 'customTheme2':
                    setTheme(ThemeCustomization2);
                    break;
                case 'equisoftTheme':
                    setTheme(equisoftTheme);
                    break;
                default:
                    setTheme(equisoftTheme);
            }
        }

        return (
            <>
                <DesignSystem>
                    <div>
                        <h3>Default Equisoft theme</h3>
                        <Button label="Primary" buttonType="primary" />
                        <Button label="Secondary" buttonType="secondary" />
                        <Button label="Tertiary" buttonType="tertiary" />
                        <Button label="Destructive" buttonType="destructive" />
                        <Button label="Destructive Secondary" buttonType="destructive-secondary" />
                    </div>
                </DesignSystem>
                <DesignSystem theme={theme}>
                    <div>
                        <div style={{ display: 'box', alignItems: 'center', gap: '2rem' }}>
                            <h3>{label}</h3>
                            <div style={{ width: '200px' }}>
                                <DropdownList
                                    onChange={(option) => setCustomTheme(option)}
                                    defaultValue="equisoftTheme"
                                    options={[
                                        {
                                            label: 'Equisoft Theme',
                                            value: 'equisoftTheme',
                                        },
                                        {
                                            label: 'Custom theme 1',
                                            value: 'customTheme1',
                                        },
                                        {
                                            label: 'Custom Theme 2',
                                            value: 'customTheme2',
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                        <Button label="Primary" buttonType="primary" />
                        <Button label="Secondary" buttonType="secondary" />
                        <Button label="Tertiary" buttonType="tertiary" />
                        <Button label="Destructive" buttonType="destructive" />
                        <Button label="Destructive Secondary" buttonType="destructive-secondary" />
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
