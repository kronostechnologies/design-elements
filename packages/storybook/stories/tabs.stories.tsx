import { Tab, Tabs } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import styled from 'styled-components';
import { rawCodeParameters } from './utils/parameters';

export default {
    title: 'Components/Tabs',
    component: Tabs,
    parameters: rawCodeParameters,
};

const StyledDiv = styled.div`
    padding: var(--spacing-2x);
`;

export const Global: Story = () => {
    const tabs: Tab[] = [
        {
            title: 'Contact',
            panelContent: <StyledDiv>First tab content</StyledDiv>,
        },
        {
            title: 'Calendar',
            panelContent: <StyledDiv>Second tab content</StyledDiv>,
        },
        {
            title: 'Note',
            panelContent: <StyledDiv>Third tab content</StyledDiv>,
        },
    ];

    return (
        <Tabs global tabs={tabs} />
    );
};

export const Section: Story = () => {
    const tabs: Tab[] = [
        {
            title: 'Contact',
            panelContent: <StyledDiv>First tab content</StyledDiv>,
        },
        {
            title: 'Calendar',
            panelContent: <StyledDiv>Second tab content</StyledDiv>,
        },
        {
            title: 'Note',
            panelContent: <StyledDiv>Third tab content</StyledDiv>,
        },
    ];

    return (
        <Tabs tabs={tabs} />
    );
};
