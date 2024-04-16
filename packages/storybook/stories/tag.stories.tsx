import { Tag, ToggleTagValue } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { useRef } from 'react';
import { rawCodeParameters } from './utils/parameters';

const TagMeta: Meta<typeof Tag> = {
    component: Tag,
    title: 'Components/Tags/Tag',
    args: {
        value: {
            label: 'Tag',
        },
        size: 'medium',
        iconName: undefined,
        color: 'default',
        onRemove: undefined,
    },
    argTypes: {
        value: {
            control: {
                type: 'object',
            },
        },
        size: {
            control: {
                type: 'select',

            },
            defaultValue: 'medium',
        },
        iconName: {
            control: {
                type: 'select',
            },
        },
        color: {
            control: {
                type: 'select',
            },
        },
        onRemove: {
            control: {
                type: 'boolean',
            },
        },
    },
    render: (args) => (
        <Tag
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...args}
            value={{
                label: args.value?.label || 'Tag',
            }}
        />
    ),
};

export default TagMeta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
    ...TagMeta,
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

export const Removable: Story = {
    ...Default,
    args: {
        onRemove: (tag: ToggleTagValue) => console.info(`Removed ${tag.label}`),
    },
};

export const Colored: Story = {
    ...Default,
    args: {
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
