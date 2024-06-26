import { IconButton, Tag, TagValue } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const TagMeta: Meta<typeof Tag> = {
    component: Tag,
    title: 'Components/Tag',
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

export const Removable: Story = {
    ...Default,
    args: {
        onRemove: (tag: TagValue) => console.info(`Removed ${tag.label}`),
    },
    render: (args) => {
        const [dismissed, setDismissed] = useState<boolean>(false);

        return !dismissed ? (
            <Tag
                {...args /* eslint-disable-line react/jsx-props-no-spreading */}
                onRemove={() => setDismissed(true)}
            />
        ) : (
            <IconButton iconName="history" buttonType="tertiary" onClick={() => setDismissed(false)} />
        );
    },
};
