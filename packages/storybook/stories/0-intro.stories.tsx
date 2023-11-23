import { Button, DesignSystem, SectionalBanner } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
    title: 'Introduction',
    component: DesignSystem,
};

export default meta;

type Story = StoryObj<typeof DesignSystem>;

const customTheme = {
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
    component: {
        'button-primary-background-color': 'color-brand-50',
        'button-primary-inverted-background-color': 'color-white',
        'button-primary-border-color': 'color-brand-50',
        'button-primary-inverted-border-color': 'color-white',
        'button-primary-text-color': 'color-white',
        'button-primary-inverted-text-color': 'color-brand-50',
    },
};

export const Theming: Story = (args: { theme?: typeof customTheme }) => (
    <>
        <DesignSystem theme={args.theme || customTheme}>
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

// Define controls for ArgsPanel
Theming.args = {
    theme: customTheme,
};

// Define controls for ArgsPanel
Theming.argTypes = {
    theme: { control: 'object' },
};

Theming.parameters = {
    controls: { exclude: ['isolateStyles', 'language', 'staticDevice'] },
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
