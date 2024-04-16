import { TextArea } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { SyntheticEvent } from 'react';
import { rawCodeParameters } from './utils/parameters';

export default {
    title: 'Components/Text Area',
    component: TextArea,
};

export const Default: Story = () => (
    <TextArea
        data-testid="some-data-test-id"
        label="Text area label"
        hint="Hint"
    />
);

export const MaxLength: Story = () => (
    <TextArea
        label="Text area label"
        hint="Hint"
        maxLength={25}
    />
);

export const ControlledValue: Story = () => (
    <TextArea
        label="Text area label"
        value="This is the value"
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
        />
    );
};
EventCallbacks.parameters = rawCodeParameters;
