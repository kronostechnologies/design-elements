import {
    Button,
    DesignSystem,
    SectionalBanner,
    useTheme,
} from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { themes } from '../.storybook/themes';

const meta: Meta = {
    title: 'Getting Started',
    component: DesignSystem,
};

export default meta;

type Story = StoryObj<typeof DesignSystem>;

export const Theming: Story = {
    render(_args, { globals }) {
        return (
            <>
                <div style={{ display: 'box', alignItems: 'center', gap: '2rem' }}>
                    <h3 style={{
                        fontSize: useTheme().alias['text-heading-medium-font-size'],
                        marginTop: '0',
                    }}
                    >
                        {themes[globals.theme].name}
                    </h3>
                </div>
                <div style={{ display: 'table-row', alignItems: 'center' }}>
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
