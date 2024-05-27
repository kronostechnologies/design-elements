import { Meta, StoryObj } from '@storybook/react';
import { Disclosure } from '@equisoft/design-elements-react';
import styled from 'styled-components';
import { decorateWith } from './utils/decorator';
import { rawCodeParameters } from './utils/parameters';

const Container = styled.div`
    height: 240px;
`;

const disclosureMeta: Meta<typeof Disclosure> = {
    title: 'Components/Disclosure',
    component: Disclosure,
    decorators: [decorateWith(Container)],
    parameters: rawCodeParameters,
};

export default disclosureMeta;

type Story = StoryObj<typeof Disclosure>;

export const Default: Story = {
    args: {
        children: 'content to display',
        buttonProps: {
            label: 'Display content',
            buttonType: 'primary',
        },
        idContent: 'someContentId',
    },
};
