import { Card, Tab, Table, TableColumn, Tabs, TextArea } from '@equisoft/design-elements-react';
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

interface Data {
    column1: string;
    column2: string;
}

export const Normal: Story = () => {
    const contactTableColumns: TableColumn<Data>[] = [
        {
            header: 'First Name',
            accessorKey: 'column1',
        },
        {
            header: 'Last Name',
            accessorKey: 'column2',
        },
    ];

    const contactTableData: Data[] = [
        {
            column1: 'First Name 1',
            column2: 'First Name 2',
        },
        {
            column1: 'Last Name 1',
            column2: 'Last Name 2',
        },
    ];

    const tabs: Tab[] = [
        {
            title: 'Contact',
            panelContent: (
                <StyledDiv>
                    <Table columns={contactTableColumns} data={contactTableData} />
                </StyledDiv>
            ),
        },
        {
            title: 'Calendar',
            panelContent: (
                <StyledDiv>
                    <Card>Monday : Doing something meaningful</Card>
                    <Card>Tuesday : Doing something else</Card>
                </StyledDiv>
            ),
        },
        {
            title: 'Note',
            panelContent: (
                <StyledDiv>
                    <TextArea label="Notes" />
                </StyledDiv>
            ),
        },
    ];

    return (
        <Tabs tabs={tabs} />
    );
};

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
