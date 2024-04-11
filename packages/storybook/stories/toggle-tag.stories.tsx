import { TagValue, ToggleTag } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { useRef } from 'react';
import { rawCodeParameters } from './utils/parameters';

const ToggleTagMeta: Meta<typeof ToggleTag> = {
    component: ToggleTag,
    title: 'Components/Tags/ToggleTag',
    args: {
        value: {
            label: 'Toggle Tag',
        },
        size: 'medium',
        iconName: undefined,
        selected: undefined,
        onClick: (tag: TagValue) => console.info(`Clicked on ${tag.label}`),
    },
    argTypes: {
        size: {
            control: {
                type: 'select',
            },
            defaultValue: 'medium',
        },
        value: {
            control: {
                type: 'object',
            },
        },
        iconName: {
            control: {
                type: 'select',
            },
        },
        selected: {
            control: {
                type: 'boolean',
            },
        },
    },
    render: (args) => (
        <ToggleTag
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...args}
            value={{
                label: args.value?.label || 'Toggle Tag',
            }}
        />
    ),
};

export default ToggleTagMeta;
type Story = StoryObj<typeof ToggleTag>;

export const Default: Story = {
    ...ToggleTagMeta,
};

export const Small: Story = {
    ...Default,
    args: {
        size: 'small',
    },
};

export const Medium: Story = {
    ...Default,
    args: {
        size: 'medium',
    },
};

export const WithIcons: Story = {
    ...Default,
    args: {
        iconName: 'copy',
    },
};

export const WithRef: Story = () => {
    const ref = useRef(null);

    return (
        <ToggleTag ref={ref} key="small" iconName="copy" size="small" value={{ label: 'Tag 1' }} />
    );
};

WithRef.parameters = rawCodeParameters;
