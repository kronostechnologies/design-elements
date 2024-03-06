import { ChangeEvent } from 'react';
import { StoryFn as Story } from '@storybook/react';
import {
    PasswordCreationInput,
    isLongEnough,
    hasAnUpperCaseLetter,
    hasALowerCaseLetter,
} from '@equisoft/design-elements-react';
import { LanguageSwitchDecorator } from './utils/decorator';
import { rawCodeParameters } from './utils/parameters';

export default {
    title: 'Patterns/Password Creation Input',
    component: PasswordCreationInput,
    decorators: [LanguageSwitchDecorator],
};

export const Normal: Story = () => (
    <PasswordCreationInput onChange={(password: string, isValid: boolean, event: ChangeEvent<HTMLInputElement>) => {
        console.info(password);
        console.info(event);
        console.info(isValid);
    }}
    />
);

export const CustomValidations: Story = () => (
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
        onChange={(password: string, isValid: boolean, event: ChangeEvent<HTMLInputElement>) => {
            console.info(password);
            console.info(event);
            console.info(isValid);
        }}
    />
);

CustomValidations.parameters = rawCodeParameters;
