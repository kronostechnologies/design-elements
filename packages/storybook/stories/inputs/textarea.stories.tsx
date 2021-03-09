import { TextArea } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import React, { SyntheticEvent } from 'react';

export default {
    title: 'TextArea',
    component: TextArea,
};

export const Normal: Story = () => (
    <TextArea
        label="Text area label"
        hint="Hint"
        disabled={false}
        required={false}
    />
);
export const ControlledValue: Story = () => (
    <TextArea
        label="Text area label"
        value="This is the value"
        disabled={false}
        required={false}
    />
);

export const EventCallbacks: Story = () => {
    function handleEvent(event: SyntheticEvent<HTMLTextAreaElement>): void {
        console.info(`Custom function called on ${event.type}. Current value: ${event.currentTarget.value}`);
    }

    return (
        <TextArea
            label="Text area label"
            onChange={handleEvent}
            onBlur={handleEvent}
            onFocus={handleEvent}
            disabled={false}
            required={false}
        />
    );
};

export const Required: Story = () => (
    <TextArea
        label="Text area label"
        disabled={false}
        required
    />
);

export const DefaultValue: Story = () => (
    <TextArea
        label="Text area label"
        defaultValue="Nullam eu ante vel est convallis dignissim. Fusce suscipit, wisi nec facilisis facilisis,
         est dui fermentum leo, quis tempor ligula erat quis odio."
        disabled={false}
        required={false}
    />
);
export const Disabled: Story = () => (
    <TextArea
        label="A label for the disabled text area"
        disabled
        required={false}
    />
);

export const MaxLength: Story = () => (
    <TextArea
        label="Text area label"
        disabled={false}
        required
        maxLength={25}
    />
);
