import { useState } from 'react';
import { StoryFn as Story } from '@storybook/react';
import { PasswordInput } from '@equisoft/design-elements-react';
import { rawCodeParameters } from './utils/parameters';

export default {
    title: 'Components/Controls/Password Input',
    component: PasswordInput,
};

export const Normal: Story = () => (
    <PasswordInput
        label="Password Label"
        defaultValue="Pass123"
        onChange={(password, event) => {
            console.info(password);
            console.info(event);
        }}
    />
);

export const WithControlledValue: Story = () => {
    const [value, setValue] = useState('Pass123');

    return (
        <PasswordInput
            label="Password Label"
            value={value}
            onChange={(password) => setValue(password)}
        />
    );
};

WithControlledValue.parameters = rawCodeParameters;

export const WithErrorMessage: Story = () => (
    <PasswordInput
        label="Password Label"
        defaultValue="Pass123"
        validationErrorMessage="This is an error message"
        onChange={(password, event) => {
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
        onChange={(password, event) => {
            console.info(password);
            console.info(event);
        }}
    />
);
