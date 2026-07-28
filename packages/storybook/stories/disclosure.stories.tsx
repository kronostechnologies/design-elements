import { Disclosure, Tooltip } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';
import { decorateWith } from './utils/decorator';
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
        },
        idContent: 'someContentId',
    },
};

const TooltipDecorator = styled(Tooltip).attrs({ label: 'Something' })``;
const IconButtonDecorator = styled.div`
    text-align: right;
    width: 200px;
`;

export const IconButtonWithTooltip: Story = {
    args: {
        children: 'content to display',
        buttonProps: {
            iconName: 'home',
        },
        idContent: 'someContentId',
    },
};
IconButtonWithTooltip.decorators = [decorateWith(IconButtonDecorator), decorateWith(TooltipDecorator)];
