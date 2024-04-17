import {
    Button,
    DesignSystem,
    SectionalBanner,
    DropdownList,
    DropdownListOption,
    equisoftTheme,
    warioTheme,
    defaultTheme,
} from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta = {
    title: 'Getting Started',
    component: DesignSystem,
};

export default meta;

type Story = StoryObj<typeof DesignSystem>;

export const Theming: Story = {
    render() {
        const [theme, setTheme] = useState(equisoftTheme);
        const [label, setLabel] = useState('Equisoft\'s Theme');

        function setCustomTheme(newSelectedTheme: DropdownListOption): void {
            setLabel(newSelectedTheme.label);
            switch (newSelectedTheme.value) {
                case 'warioTheme':
                    setTheme(warioTheme);
                    break;
                case 'equisoftTheme':
                    setTheme(equisoftTheme);
                    break;
                case 'defaultTheme':
                default:
                    setTheme(defaultTheme);
            }
        }

        return (
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
                                        label: 'Equisoft\'s Theme',
                                        value: 'equisoftTheme',
                                    },
                                    {
                                        label: 'Default\'s Theme',
                                        value: 'defaultTheme',
                                    },
                                    {
                                        label: 'Wario\'s Theme',
                                        value: 'warioTheme',
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
                            backgroundColor: theme.component['global-header-background-color'],
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
                            backgroundColor: theme.component['global-header-background-color'],
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
