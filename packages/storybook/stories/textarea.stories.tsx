import { TextArea } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { SyntheticEvent } from 'react';
import { rawCodeParameters } from './utils/parameters';

const TextAreaMeta: Meta<typeof TextArea> = {
    title: 'Components/Text Area',
    component: TextArea,
    args: {
        label: 'Text area label',
    },
    argTypes: {
        onBlur: {
            control: { type: null },
        },
        onChange: {
            control: { type: null },
        },
        onFocus: {
            control: { type: null },
        },
    },
};

export default TextAreaMeta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
    args: {
        hint: 'Hint',
    },
    render: (args) => (
        <TextArea
            // eslint-disable-next-line
            {...args}
            data-testid="some-data-test-id"
        />
    ),
};

export const MaxLength: Story = {
    args: {
      maxLength: 25,
      hint: 'Hint',
    },
};

export const ControlledValue: Story = {
    args: {
      value: 'This is the value',
    },
};

export const EventCallbacks: Story = {
    parameters: rawCodeParameters,
    render: (args) => {
        function handleEvent(event: SyntheticEvent<HTMLTextAreaElement>): void {
            console.info(`Custom function called on ${event.type}. Current value: ${event.currentTarget.value}`);
        }

        return (
            <TextArea
                // eslint-disable-next-line
                {...args}
                onChange={handleEvent}
                onBlur={handleEvent}
                onFocus={handleEvent}
            />
        );
    },
};
