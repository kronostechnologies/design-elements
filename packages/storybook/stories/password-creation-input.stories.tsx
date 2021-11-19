import React from 'react';
import { Story } from '@storybook/react';
import { PasswordCreationInput } from '@equisoft/design-elements-react';

export default {
    title: 'Controls/PasswordCreationInput',
    component: PasswordCreationInput,
};

export const Normal: Story = () => (
    <>
        <PasswordCreationInput onChange={(event, isValid) => {
            // eslint-disable-next-line no-console
            console.log(event);
            // eslint-disable-next-line no-console
            console.log(isValid);
        }}
        />
    </>
);
