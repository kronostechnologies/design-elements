import { Button, DesignSystem, SectionalBanner } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
    title: 'Introduction',
    component: DesignSystem,
};

export default meta;

type Story = StoryObj<typeof DesignSystem>;

const customTheme = {
    colors: {
        'primary-1.1': '#00874E',
        'primary-1.2': '#9EDBC1',
        'primary-1.3': '#0B5E37',
        'primary-1.4': '#E5F3ED',
        'primary-2': '#00874E',
        'secondary-4.1': '#00874E',
        'secondary-4.2': '#CC9B0B',
        'secondary-4.3': '#3F474C',
    },
    tokens: {
        'button-primary-bg': 'colors.primary-1.1',
        'button-primary-inverted-bg': 'colors.white',
        'button-primary-border': 'colors.primary-1.1',
        'button-primary-inverted-border': 'colors.white',
        'button-primary-color': 'colors.white',
        'button-primary-inverted-color': 'colors.primary-1.1',
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
