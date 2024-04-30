import { ChangeEvent } from 'react';
import { StoryFn as Story } from '@storybook/react';
import { PasswordCreationInput } from '@equisoft/design-elements-react';
import { LanguageSwitchDecorator } from './utils/decorator';

export default {
    title: 'Components/Password Creation Input',
    component: PasswordCreationInput,
    decorators: [LanguageSwitchDecorator],
};

export const Default: Story = () => (
    <PasswordCreationInput onChange={(password: string, isValid: boolean, event: ChangeEvent<HTMLInputElement>) => {
        console.info(password);
        console.info(event);
        console.info(isValid);
    }}
    />
);
