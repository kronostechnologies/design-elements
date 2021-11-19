import React, { ChangeEvent } from 'react';
import { Story } from '@storybook/react';
import {
    PasswordCreationInput,
    isLongEnough,
    hasAnUpperCaseLetter,
    hasALowerCaseLetter,
} from '@equisoft/design-elements-react';

export default {
    title: 'Controls/PasswordCreationInput',
    component: PasswordCreationInput,
};

export const Normal: Story = () => (
    <>
        <PasswordCreationInput onChange={(event, isValid) => {
            console.info(event);
            console.info(isValid);
        }}
        />
    </>
);

export const CustomValidations: Story = () => (
    <>
        <PasswordCreationInput
            validations={[
                {
                    label: 'Minimum 1 number.',
                    isValid: (password) => /\d/.test(password),
                },
                {
                    label: 'Minimum 8 characters.',
                    isValid: isLongEnough(8),
                },
                {
                    label: 'Minimum one uppercase letter.',
                    isValid: hasAnUpperCaseLetter,
                },
                {
                    label: 'Minimum one lowercase letter.',
                    isValid: hasALowerCaseLetter,
                },
            ]}
            onChange={(event: ChangeEvent<HTMLInputElement>, isValid: boolean) => {
                console.info(event);
                console.info(isValid);
            }}
        />
    </>
);
