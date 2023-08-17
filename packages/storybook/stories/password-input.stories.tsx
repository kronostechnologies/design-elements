import { ChangeEvent } from 'react';
import { StoryFn as Story } from '@storybook/react';
import { PasswordInput } from '@equisoft/design-elements-react';

export default {
    title: 'Controls/Password Input',
    component: PasswordInput,
};

export const Normal: Story = () => (
    <PasswordInput
        label="Password Label"
        defaultValue="Pass123"
        onChange={(password: string, event: ChangeEvent<HTMLInputElement>) => {
            console.info(password);
            console.info(event);
        }}
    />
);

export const WithControlledValue: Story = () => (
    <PasswordInput
        label="Password Label"
        value="Pass123"
        onChange={(password: string, event: ChangeEvent<HTMLInputElement>) => {
            console.info(password);
            console.info(event);
        }}
    />
);

export const WithErrorMessage: Story = () => (
    <PasswordInput
        label="Password Label"
        defaultValue="Pass123"
        validationErrorMessage="This is an error message"
        onChange={(password: string, event: ChangeEvent<HTMLInputElement>) => {
            console.info(password);
            console.info(event);
        }}
    />
);

export const Disabled: Story = () => (
    <PasswordInput
        disabled
        label="Password Label"
        defaultValue="Pass123"
        onChange={(password: string, event: ChangeEvent<HTMLInputElement>) => {
            console.info(password);
            console.info(event);
        }}
    />
);
