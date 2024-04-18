import { Tab, Tabs } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import styled from 'styled-components';
import { useState } from 'react';
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
        <Tabs tabs={tabs} global />
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

let addTabCounter = 3;

export const AddAndDeleteTabs: Story = () => {
    const [tabs, setTabs] = useState<Tab[]>([
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
    ]);

    function handleRemove(tabId: string): void {
        setTabs((prevTabs) => prevTabs.filter((tab) => tab.id !== tabId));
    }

    return (
        <Tabs
            tabs={tabs}
            onRemove={handleRemove}
            onAddTab={() => {
                addTabCounter += 1;
                setTabs([...tabs, {
                    id: `tab${addTabCounter}`,
                    title: 'New Tab',
                    panelContent: <StyledDiv>New tab content</StyledDiv>,
                },
                ]);
            }}
        />
    );
};

export const Scrollable: Story = () => {
    const tabs: Tab[] = [...Array(15).keys()].map((i) => ({
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
            <Tabs tabs={tabs} />
            <br />
            <Tabs tabs={tabs} global />
        </div>
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
        <Tabs tabs={tabs} />
    );
};
