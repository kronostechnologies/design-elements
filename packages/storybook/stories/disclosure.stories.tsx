import { Meta, StoryObj } from '@storybook/react';
import { Disclosure } from '@equisoft/design-elements-react';
import { rawCodeParameters } from './utils/parameters';

const disclosureMeta: Meta<typeof Disclosure> = {
    title: 'Components/Disclosure',
    component: Disclosure,
    parameters: rawCodeParameters,
};

export default disclosureMeta;

type Story = StoryObj<typeof Disclosure>;

export const Default: Story = {
    args: {
        children: 'content to display',
        buttonProps: {
            label: 'Display content',
            buttonType: 'tertiary',
        },
        idContent: 'someContentId',
    },
};

export const IconButton: Story = {
    args: {
        children: 'content to display',
        buttonProps: {
            iconName: 'home',
            buttonType: 'primary',
        },
        idContent: 'someContentId',
    },
};
