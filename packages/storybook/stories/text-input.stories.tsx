import { Button, TextInput } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { FormEventHandler, useState } from 'react';
import { rawCodeParameters } from './utils/parameters';

export default {
    title: 'Controls/Text Input',
    component: TextInput,
};

export const Inputs: Story = () => (
    <>
        <TextInput
            label="First Name"
            type="text"
            validationErrorMessage="Error message"
            hint="Hint"
        />
        <TextInput
            label="Email"
            placeholder="you@example.com"
            type="email"
            validationErrorMessage="Error message"
            hint="Hint"
        />
        <TextInput
            label="Phone"
            placeholder="Ex.: 555-555-5555"
            type="tel"
            validationErrorMessage="Error message"
            hint="Hint"
        />
    </>
);

export const DefaultValue: Story = () => (
    <TextInput
        label="Address"
        type="text"
        defaultValue="1234 Main Street"
    />
);

export const WithTooltip: Story = () => (
    <TextInput
        label="Address"
        tooltip={{ label: 'Tooltip text content' }}
        type="text"
    />
);

export const Required: Story = () => (
    <TextInput
        required
        label="Last Name"
        type="text"
        validationErrorMessage="This field is required"
    />
);

export const EventCallbacks: Story = () => (
    <TextInput
        required
        label="See console for callbacks"
        type="text"
        onChange={(event) => {
            console.info(`Custom function called on change. Current value: ${event.currentTarget.value}`);
        }}
        onBlur={(event) => {
            console.info(`Custom function called on blur. Current value: ${event.currentTarget.value}`);
        }}
        onFocus={(event) => {
            console.info(`Custom function called on focus. Current value: ${event.currentTarget.value}`);
        }}
    />
);
EventCallbacks.parameters = rawCodeParameters;

export const PatternValidation: Story = () => (
    <TextInput
        required
        label="Telephone"
        placeholder="Ex.: 555-123-4567"
        type="tel"
        pattern="[0-9]{3}-?[0-9]{3}-?[0-9]{4}"
    />
);

export const Disabled: Story = () => (
    <TextInput
        disabled
        label="A disabled text input"
        placeholder="Sorry but this field is disabled"
        type="text"
    />
);

export const RequiredInForm: Story = () => {
    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        event.currentTarget.checkValidity();
    };

    return (
        <form noValidate onSubmit={handleSubmit}>
            <TextInput
                required
                label="Last Name"
                type="text"
                validationErrorMessage="This field is required"
            />
            <Button type="submit" buttonType="primary">Submit</Button>
        </form>
    );
};

export const FormWithCustomValidation: Story = () => {
    const [value, setValue] = useState('REFERRAL-111');
    const [valid, setValid] = useState(true);
    const validate = (validationValue: string): void => {
        if (validationValue === 'REFERRAL-111') {
            setValid(false);
        } else {
            setValid(true);
        }
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        validate(value);
    };

    return (
        <form noValidate onSubmit={handleSubmit}>
            <TextInput
                label="Enter your referral number (REFERRAL-111 already exists)"
                type="text"
                value={value}
                onChange={(event) => {
                    const inputValue = event.currentTarget.value;
                    setValue(inputValue);
                    validate(inputValue);
                }}
                valid={valid}
                validationErrorMessage="This referral number already exists"
            />
            <Button type="submit" buttonType="primary">Submit</Button>
        </form>
    );
};
