import { Tag, TagValue } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { useRef } from 'react';
import { rawCodeParameters } from './utils/parameters';

const meta: Meta<typeof Tag> = {
    component: Tag,
    title: 'Components/Notification/Tag',
    argTypes: {
        size: {
            control: {
                type: 'select',
            },
            defaultValue: 'medium',
        },
        color: {
            control: {
                type: 'select',
            },
        },
        value: {
            if: {
                arg: 'color',
                eq: 'default',
            },
            control: {
                type: 'object',
            },
        },
        iconName: {
            if: {
                arg: 'color',
                eq: 'default',
            },
            control: {
                type: 'select',
            },
        },
        selected: {
            if: {
                arg: 'color',
                eq: 'default',
            },
            control: {
                type: 'boolean',
            },
        },
        onClick: {
            if: {
                arg: 'color',
                eq: 'default',
            },
            control: {
                type: 'boolean',
            },
        },
        onDelete: {
            if: {
                arg: 'color',
                eq: 'default',
            },
            control: {
                type: 'boolean',
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
    args: {
        value: {
            label: 'Tag',
            extraLabel: '',
        },
        size: 'medium',
        color: 'default',
        selected: false,
        iconName: undefined,
        onClick: undefined,
        onDelete: undefined,
    },
    argTypes: {
        ...meta.argTypes,
    },
    render: (args) => (
        <Tag
                // eslint-disable-next-line react/jsx-props-no-spreading
            {...args}
            value={{
                    label: args.value?.label || 'Tag',
                    extraLabel: args.value?.extraLabel || '',
                }}
        />
        ),
};

export const Small: Story = {
    ...Default,
    args: {
        ...Default.args,
        size: 'small',
    },
};

export const Medium: Story = {
    ...Default,
    args: {
        ...Default.args,
        size: 'medium',
    },
};

export const WithExtraLabel: Story = {
    ...Default,
    args: {
        ...Default.args,
        value: {
            id: '',
            label: 'Tag',
            extraLabel: 'ExtraLabel: ',
        },
    },
};

export const WithIcons: Story = {
    ...Default,
    args: {
        ...Default.args,
        iconName: 'copy',
    },
};

export const Deletable: Story = {
    ...Default,
    args: {
        ...Default.args,
        onDelete: (tag: TagValue) => console.info(`Deleted ${tag.label}`),
    },
};

export const Clickable: Story = {
    ...Default,
    args: {
        ...Default.args,
        onClick: (tag: TagValue) => console.info(`Clicked on ${tag.label}`),
    },
};

export const Colored: Story = {
    ...Default,
    args: {
        ...Default.args,
        color: 'decorative-01',
    },
};

export const WithRef: Story = () => {
    const ref = useRef(null);

    return (
        <Tag ref={ref} key="small" iconName="copy" size="small" value={{ label: 'Tag 1' }} />
    );
};

WithRef.parameters = rawCodeParameters;
