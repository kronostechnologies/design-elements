import { Card, Tab, Table, TableColumn, Tabs, TextArea } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import styled from 'styled-components';
import { rawCodeParameters } from './utils/parameters';

export default {
    title: 'Disclosure/Tabs',
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
    const contactTableColumns: TableColumn<Data> = [
        {
            Header: 'First Name',
            accessor: 'column1',
        },
        {
            Header: 'Last Name',
            accessor: 'column2',
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
            title: 'First Button',
            leftIcon: 'chevronUp',
            panelContent: <StyledDiv>First tab content</StyledDiv>,
        },
        {
            title: 'Second Button',
            leftIcon: 'chevronLeft',
            rightIcon: 'chevronRight',
            panelContent: <StyledDiv>Second tab content</StyledDiv>,
        },
        {
            title: 'Third Button',
            rightIcon: 'chevronDown',
            panelContent: <StyledDiv>Third tab content</StyledDiv>,
        },
    ];

    return (
        <Tabs global tabs={tabs} />
    );
};

export const WithIcons: Story = () => {
    const tabs: Tab[] = [
        {
            title: 'First Button',
            leftIcon: 'chevronUp',
            panelContent: <StyledDiv>First tab content</StyledDiv>,
        },
        {
            title: 'Second Button',
            leftIcon: 'chevronLeft',
            rightIcon: 'chevronRight',
            panelContent: <StyledDiv>Second tab content</StyledDiv>,
        },
        {
            title: 'Third Button',
            rightIcon: 'chevronDown',
            panelContent: <StyledDiv>Third tab content</StyledDiv>,
        },
    ];

    return (
        <Tabs tabs={tabs} />
    );
};

export const WithForceRenderTabPanels: Story = () => {
    const tabs: Tab[] = [
        {
            title: 'First Button',
            panelContent: <StyledDiv>First tab content</StyledDiv>,
        },
        {
            title: 'Second Button',
            panelContent: <StyledDiv>Second tab content</StyledDiv>,
        },
        {
            title: 'Third Button',
            panelContent: <StyledDiv>Third tab content</StyledDiv>,
        },
    ];

    return (
        <Tabs tabs={tabs} forceRenderTabPanels />
    );
};

export const Contained: Story = () => {
    const tabs: Tab[] = [
        {
            title: 'First Button',
            panelContent: <StyledDiv>First tab content</StyledDiv>,
        },
        {
            title: 'Second Button',
            panelContent: <StyledDiv>Second tab content</StyledDiv>,
        },
        {
            title: 'Third Button',
            panelContent: <StyledDiv>Third tab content</StyledDiv>,
        },
    ];

    return (
        <Tabs tabs={tabs} contained />
    );
};

export const UnloadTabCallback: Story = () => {
    const tabs: Tab[] = [
        {
            title: 'Tab that cannot change because onBeforeUnload resolves to false',
            panelContent: <StyledDiv>First tab content</StyledDiv>,
            onBeforeUnload: () => {
                console.info('cannot change tab because onBeforeUnload promise resolves to false here');
                return Promise.resolve(false);
            },
        },
        {
            title: 'Second Button',
            panelContent: <StyledDiv>Second tab content</StyledDiv>,
            onBeforeUnload: () => Promise.resolve(true),
        },
        {
            title: 'Third Button',
            panelContent: <StyledDiv>Third tab content</StyledDiv>,
            onBeforeUnload: () => Promise.resolve(true),
        },
    ];

    return (
        <Tabs tabs={tabs} contained />
    );
};
