import { Button, DesignSystem, SectionalBanner, testTheme } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
    title: 'Introduction',
    component: DesignSystem,
};

export default meta;

type Story = StoryObj<typeof DesignSystem>;

export const Theming: Story = {
    render() {
        return (
            <>
                <DesignSystem theme={testTheme}>
                    <div>
                        <h3>Custom theme</h3>
                        <Button label="Primary" buttonType="primary" />
                        <Button label="Secondary" buttonType="secondary" />
                        <Button label="Tertiary" buttonType="tertiary" />
                        <Button label="Destructive" buttonType="destructive" />
                        <Button label="Destructive Secondary" buttonType="destructive-secondary" />
                    </div>
                </DesignSystem>
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
