import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Button, PasswordCreationInput, ValidationCondition } from '@equisoft/design-elements-react';
import { LanguageSwitchDecorator } from './utils/decorator';

const PasswordCreationInputMeta: Meta<typeof PasswordCreationInput> = {
    title: 'Components/Password Creation Input',
    component: PasswordCreationInput,
    decorators: [LanguageSwitchDecorator],
    argTypes: {
        onChange: {
            control: { disable: true },
        },
        failedValidationConditions: {
            control: { disable: true },
        },
        liveValidation: {
            control: 'boolean',
            description: 'When true, validation updates on every field change and strength bar is shown. '
                + 'When false, validation is controlled by failedValidationConditions prop.',
        },
    },
};

export default PasswordCreationInputMeta;
type Story = StoryObj<typeof PasswordCreationInput>;

export const Default: Story = {};

export const WithManualValidation: Story = {
    render: (args) => {
        const [password, setPassword] = useState('');
        const [failedConditions, setFailedConditions] = useState<string[] | undefined>(undefined);

        const defaultValidations: ValidationCondition[] = [
            {
                label: 'Minimum 8 characters',
                isValid: (pwd: string) => pwd.length >= 8,
            },
            {
                label: 'At least one upper case',
                isValid: (pwd: string) => /[A-Z]/.test(pwd),
            },
            {
                label: 'At least one lower case',
                isValid: (pwd: string) => /[a-z]/.test(pwd),
            },
        ];

        const handleValidate = (): void => {
            const failed = defaultValidations
                .filter((condition) => !condition.isValid(password))
                .map((condition) => condition.label);
            setFailedConditions(failed);
        };

        return (
            <div>
                <PasswordCreationInput
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...args}
                    liveValidation={false}
                    failedValidationConditions={failedConditions}
                    validations={defaultValidations}
                    onChange={(newPassword) => {
                        setPassword(newPassword);
                    }}
                />
                <div style={{ marginTop: '1rem' }}>
                    <Button
                        label="Validate Password"
                        buttonType="primary"
                        onClick={handleValidate}
                    />
                </div>
            </div>
        );
    },
};
