import { TextInput } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { rawCodeParameters } from './utils/parameters';

export default {
    title: 'Components/Text Input',
    component: TextInput,
};

export const Default: Story = () => (
    <TextInput
        label="First Name"
        type="text"
        validationErrorMessage="Error message"
        hint="Hint"
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
