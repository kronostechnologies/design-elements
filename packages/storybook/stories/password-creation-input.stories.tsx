import { ChangeEvent, useRef } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Button, PasswordCreationInput } from '@equisoft/design-elements-react';
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
            control: { disable: true },
        },
        validateField: {
            control: { disable: true },
        },
        liveValidation: {
            control: 'boolean',
            description: 'When true, validation updates on every field change and strength bar is shown. '
                + 'When false, validation never shows unless validateField is called.',
        },
    },
};

export default PasswordCreationInputMeta;
type Story = StoryObj<typeof PasswordCreationInput>;

export const Default: Story = {};

export const WithManualValidation: Story = {
    render: () => {
        const triggerValidationRef = useRef<(() => void) | null>(null);

        return (
            <div>
                <PasswordCreationInput
                    liveValidation={false}
                    validateField={(trigger) => {
                        triggerValidationRef.current = trigger;
                    }}
                    onChange={(password: string, isValid: boolean) => {
                        console.info(password, isValid);
                    }}
                />
                <div style={{ marginTop: '1rem' }}>
                    <Button
                        label="Validate Password"
                        buttonType="primary"
                        onClick={() => triggerValidationRef.current?.()}
                    />
                </div>
            </div>
        );
    },
};
