import { Card, Tab, Table, TableColumn, Tabs, TextArea } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import React from 'react';

export default {
    title: 'Disclosure/Tabs',
    component: Tabs,
};

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
            panelContent: <Table columns={contactTableColumns} data={contactTableData} />,
        },
        {
            title: 'Calendar',
            panelContent: (
                <div>
                    <Card>Monday : Doing something meaningful</Card>
                    <Card>Tuesday : Doing something else</Card>
                </div>
            ),
        },
        {
            title: 'Note',
            panelContent: <TextArea label="Notes" disabled={false} required={false} />,
        },
    ];

    return (
        <Tabs tabs={tabs} />
    );
};

export const WithIcons: Story = () => {
    const tabs: Tab[] = [
        {
            title: 'First Button',
            leftIcon: 'chevronUp',
            panelContent: <Card>First panel</Card>,
        },
        {
            title: 'Second Button',
            leftIcon: 'chevronLeft',
            rightIcon: 'chevronRight',
            panelContent: <Card>Second panel</Card>,
        },
        {
            title: 'Third Button',
            rightIcon: 'chevronDown',
            panelContent: <Card>Third panel</Card>,
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
            panelContent: <Card>First panel</Card>,
        },
        {
            title: 'Second Button',
            panelContent: <Card>Second panel</Card>,
        },
        {
            title: 'Third Button',
            panelContent: <Card>Third panel</Card>,
        },
    ];

    return (
        <Tabs tabs={tabs} forceRenderTabPanels />
    );
};
