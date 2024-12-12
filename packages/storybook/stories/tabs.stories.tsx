import { Card, Tab, Table, TableColumn, Tabs, TextArea } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';
import { useState } from 'react';
import { rawCodeParameters } from './utils/parameters';

const StyledDiv = styled.div`
    padding: var(--spacing-2x);
`;

interface Data {
    column1: string;
    column2: string;
}

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
        id: 'tab1',
        title: 'Contact',
        panelContent: (
            <StyledDiv>
                <Table<Data> columns={contactTableColumns} data={contactTableData} dataKey="column1" />
            </StyledDiv>
        ),
    },
    {
        id: 'tab2',
        title: 'Calendar',
        panelContent: (
            <StyledDiv>
                <Card>Monday : Doing something meaningful</Card>
                <Card>Tuesday : Doing something else</Card>
            </StyledDiv>
        ),
    },
    {
        id: 'tab3',
        title: 'Note',
        panelContent: (
            <StyledDiv>
                <TextArea label="Notes" />
            </StyledDiv>
        ),
    },
];

const TabsMeta: Meta<typeof Tabs> = {
    title: 'Components/Tabs',
    component: Tabs,
    parameters: rawCodeParameters,
    argTypes: {
        tabs: { control: { disable: true } },
    },
    render: (args) => (
        <Tabs
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...args}
            tabs={tabs}
        />
    ),
};

export default TabsMeta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
    ...TabsMeta,
};

export const Global: Story = {
    ...TabsMeta,
    args: {
        global: true,
    },
};

let addTabCounter = 3;
export const AddAndDeleteTabs: Story = {
    ...TabsMeta,
    render: () => {
        const [currentTabs, setCurrentTabs] = useState<Tab[]>(tabs);

        function handleRemove(tabId: string): void {
            setCurrentTabs((prevTabs) => prevTabs.filter((tab) => tab.id !== tabId));
        }

        return (
            <Tabs
                tabs={currentTabs}
                onRemove={handleRemove}
                onAddTab={() => {
                    addTabCounter += 1;
                    setCurrentTabs([...currentTabs, {
                        id: `tab${addTabCounter}`,
                        title: 'New Tab',
                        panelContent: <StyledDiv>New tab content</StyledDiv>,
                    },
                    ]);
                }}
            />
        );
    },
};

export const Scrollable: Story = {
    ...TabsMeta,
    render: () => {
        const customTabs: Tab[] = [...Array(15).keys()].map((i) => ({
            id: `tab${i + 1}`,
            title: `Tab ${i + 1}`,
            panelContent: (
                <StyledDiv>
                    Content
                    {i + 1}
                </StyledDiv>
            ),
        }));

        return (
            <div style={{ maxWidth: '600px' }}>
                <Tabs tabs={customTabs} />
                <br />
                <Tabs tabs={customTabs} global />
            </div>
        );
    },
};

export const WithForceRenderTabPanels: Story = {
   ...TabsMeta,
    args: {
        forceRenderTabPanels: true,
    },
};

export const UnloadTabCallback: Story = {
    ...TabsMeta,
    render: () => {
        const customTabs: Tab[] = [
            {
                id: 'tab1',
                title: 'Tab that cannot change because onBeforeUnload resolves to false',
                panelContent: <StyledDiv>First tab content</StyledDiv>,
                onBeforeUnload: () => {
                    console.info('cannot change tab because onBeforeUnload promise resolves to false here');
                    return Promise.resolve(false);
                },
            },
            {
                id: 'tab2',
                title: 'Second Button',
                panelContent: <StyledDiv>Second tab content</StyledDiv>,
                onBeforeUnload: () => Promise.resolve(true),
            },
            {
                id: 'tab2',
                title: 'Third Button',
                panelContent: <StyledDiv>Third tab content</StyledDiv>,
                onBeforeUnload: () => Promise.resolve(true),
            },
        ];

        return (
            <Tabs tabs={customTabs} />
        );
    },
};

export const DefaultSelectedTab: Story = {
    ...TabsMeta,
    render: () => {
        const customTabs: Tab[] = [
            {
                id: 'tab1',
                title: 'First Button',
                panelContent: <StyledDiv>First tab content</StyledDiv>,
            },
            {
                id: 'tab2',
                title: 'Second Button',
                panelContent: <StyledDiv>Second tab content</StyledDiv>,
            },
            {
                id: 'tab3',
                title: 'Third Button',
                panelContent: <StyledDiv>Third tab content</StyledDiv>,
            },
        ];

        return (
            <Tabs tabs={customTabs} defaultSelectedId='tab2' />
        );
    },
};
