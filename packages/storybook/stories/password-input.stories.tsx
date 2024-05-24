import { Meta, StoryObj } from '@storybook/react';
import { PasswordInput } from '@equisoft/design-elements-react';

const PasswordInputMeta: Meta<typeof PasswordInput> = {
    title: 'Components/Password Input',
    component: PasswordInput,
    args: {
        label: 'Password Label',
        defaultValue: 'Pass123',
        onChange: (password, event) => {
            console.info(password);
            console.info(event);
        },
    },
    argTypes: {
        onBlur: {
            control: { disable: true },
        },
        onFocus: {
            control: { disable: true },
        },
        onChange: {
            control: { disable: true },
        },
    },
};

export default PasswordInputMeta;
type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = { ...PasswordInputMeta };
