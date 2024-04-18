import { TextArea } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { SyntheticEvent } from 'react';
import { rawCodeParameters } from './utils/parameters';

export default {
    title: 'Components/Text Area',
    component: TextArea,
};

export const Normal: Story = () => (
    <TextArea
        data-testid="some-data-test-id"
        label="Text area label"
        hint="Hint"
    />
);

export const WithTooltip: Story = () => (
    <TextArea
        label="Text area label"
        tooltip={{ label: 'Tooltip text content' }}
        hint="Hint"
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

export const Required: Story = () => (
    <TextArea
        label="Text area label"
        required
    />
);

export const DefaultValue: Story = () => (
    <TextArea
        label="Text area label"
        defaultValue="Nullam eu ante vel est convallis dignissim. Fusce suscipit, wisi nec facilisis facilisis,
         est dui fermentum leo, quis tempor ligula erat quis odio."
    />
);
export const Disabled: Story = () => (
    <TextArea
        label="A label for the disabled text area"
        disabled
    />
);

export const MaxLength: Story = () => (
    <TextArea
        label="Text area label"
        required
        maxLength={25}
    />
);
