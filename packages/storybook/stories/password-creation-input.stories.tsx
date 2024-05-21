import { ChangeEvent } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { PasswordCreationInput } from '@equisoft/design-elements-react';
import { LanguageSwitchDecorator } from './utils/decorator';

const PasswordCreationInputMeta: Meta<typeof PasswordCreationInput> = {
    title: 'Components/Password Creation Input',
    component: PasswordCreationInput,
    decorators: [LanguageSwitchDecorator],
    args: {
        onChange: (password: string, isValid: boolean, event: ChangeEvent<HTMLInputElement>) => {
            console.info(password);
            console.info(event);
            console.info(isValid);
        },
    },
    argTypes: {
        onChange: {
            control: { type: null },
        },
    },
};

export default PasswordCreationInputMeta;
type Story = StoryObj<typeof PasswordCreationInput>;

export const Default: Story = {};
