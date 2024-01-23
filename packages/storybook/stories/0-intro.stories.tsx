import {
    Button,
    DesignSystem,
    SectionalBanner,
    customTheme,
    DropdownList,
    equisoftTheme, DropdownListOption,
} from '@equisoft/design-elements-react';
import { ThemeCustomization } from '@equisoft/design-elements-react/dist/themes/interface/theme';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

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
                case 'customTheme':
                    setTheme(customTheme);
                    break;
                case 'darkTheme':
                    setTheme(darkTheme);
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
                        <DropdownList
                            label="Select a theme"
                            onChange={(option) => setCustomTheme(option)}
                            options={[
                                {
                                    label: 'Custom theme',
                                    value: 'customTheme',
                                },
                                {
                                    label: 'Dark Theme',
                                    value: 'darkTheme',
                                },
                            ]}
                        />
                        <h3>{label}</h3>
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
