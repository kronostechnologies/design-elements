import { Button, DesignSystem, TextInput } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
    title: 'Getting Started',
    component: DesignSystem,
};

export default meta;

type Story = StoryObj<typeof DesignSystem>;

export const MobileButton: Story = {
    render() {
        return (
            <Button buttonType="primary">Click me!</Button>
        );
    },
    globals: {
        staticDevice: 'mobile',
    },
};

export const Theming: Story = {
    render() {
        return (
            <Button buttonType="primary">Click me!</Button>
        );
    },
    parameters: {
        docs: {
            source: {
                code: `
<DesignSystem themeCustomization={customTokens}>
    <Button buttonType="primary">Click me!</Button>
</DesignSystem>                
                `,
                type: 'code',
            },
        },
    },
    globals: {
        themeCustomization: {
            ref: {
                'color-brand-50': '#D41185',
            },
        },
    },
};

export const Internationalization: Story = {
    render() {
        return (
            <TextInput label="The error message is translated (but this label is not)" valid={false} />
        );
    },
    parameters: {
        docs: {
            source: {
                code: `
<DesignSystem language={appLanguage}>
    <TextInput label="The error message is translated (but this label is not)" valid={false} />
</DesignSystem>                
                `,
                type: 'code',
            },
        },
    },
};
