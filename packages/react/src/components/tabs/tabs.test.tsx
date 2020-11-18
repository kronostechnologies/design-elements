import { CommonWrapper, ReactWrapper } from 'enzyme';
import React from 'react';

import { findByTestId, getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithProviders } from '../../test-utils/renderer';
import { Tab, Tabs } from './tabs';

describe('Tabs', () => {
    test('should display the first tab panel by default', () => {
        const expectedTabPanel = 'content';
        const tabs: Tab[] = [
            {
                title: 'button',
                panelContent: <div data-testid="tab-panel-1">{expectedTabPanel}</div>,
            },
        ];

        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);

        const tabPanel = getByTestId(wrapper, 'tab-panel-1');
        expect(tabPanel.prop('children')).toBe(expectedTabPanel);
    });

    test('should select the first button by default', () => {
        const tabs: Tab[] = [
            {
                title: 'button 1',
                panelContent: <div data-testid="tab-panel-1">content</div>,
            },
            {
                title: 'button 2',
                panelContent: <div data-testid="tab-panel-2">content</div>,
            },
        ];

        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);

        const tabButton = getByTestId(wrapper, 'tab-button-1');
        expect(tabButton.prop('isSelected')).toBe(true);
    });

    test('should only have one button selected at a time', () => {
        const tabs: Tab[] = [
            {
                title: 'button 1',
                panelContent: <div data-testid="tab-panel-1">content</div>,
            },
            {
                title: 'button 2',
                panelContent: <div data-testid="tab-panel-2">content</div>,
            },
        ];
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);

        const tabButton1 = getByTestId(wrapper, 'tab-button-1');
        const tabButton2 = getByTestId(wrapper, 'tab-button-2');

        expect(tabButton1.prop('isSelected')).toBe(true);
        expect(tabButton2.prop('isSelected')).toBe(false);
    });

    test('should only display selected panel', () => {
        const tabs: Tab[] = [
            {
                title: 'button 1',
                panelContent: <div data-testid="tab-panel-1">content</div>,
            },
            {
                title: 'button 2',
                panelContent: <div data-testid="tab-panel-2">content</div>,
            },
        ];

        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);

        expectPanelToBeVisible(wrapper, 'tab-panel-1');
        const secondTabPanel = findByTestId(wrapper, 'tab-panel-2');
        expect(secondTabPanel.length).toBe(0);
    });

    test('when a button is selected only the selected panel should be displayed', () => {
        const tabs: Tab[] = [
            {
                title: 'button 1',
                panelContent: <div data-testid="tab-panel-1">content</div>,
            },
            {
                title: 'button 2',
                panelContent: <div data-testid="tab-panel-2">content</div>,
            },
        ];
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);

        getByTestId(wrapper, 'tab-button-2').simulate('click');

        expectPanelToBeVisible(wrapper, 'tab-panel-2');
    });

    test.each([
        ['space', ' '],
        ['enter', 'Enter'],
    ])('when the right arrow and the %s keys are entered it should display the panel to the right', (_, key) => {
        const tabs: Tab[] = [
            {
                title: 'button 1',
                panelContent: <div data-testid="tab-panel-1">content</div>,
            },
            {
                title: 'button 2',
                panelContent: <div data-testid="tab-panel-2">content</div>,
            },
        ];
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);
        givenClickOnFirstTab(wrapper);
        const tabButtonsContainer = getByTestId(wrapper, 'tab-buttons-container');

        tabButtonsContainer.simulate('keydown', { key: 'ArrowRight' });
        tabButtonsContainer.simulate('keydown', { key: key });

        expectPanelToBeVisible(wrapper, 'tab-panel-2');
    });

    test.each([
        ['space', ' '],
        ['enter', 'Enter'],
    ])('when the tab and the %s keys are entered and the active tab is not the last one it should display the panel to the right', (_, key) => {
        const tabs: Tab[] = [
            {
                title: 'button 1',
                panelContent: <div data-testid="tab-panel-1">content</div>,
            },
            {
                title: 'button 2',
                panelContent: <div data-testid="tab-panel-2">content</div>,
            },
        ];
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);
        givenClickOnFirstTab(wrapper);
        const tabButtonsContainer = getByTestId(wrapper, 'tab-buttons-container');

        tabButtonsContainer.simulate('keydown', { key: 'Tab' });
        tabButtonsContainer.simulate('keydown', { key: key });

        expectPanelToBeVisible(wrapper, 'tab-panel-2');
    });

    test.each([
        ['space', ' '],
        ['enter', 'Enter'],
    ])('when the tab and the %s keys are entered and the active tab is the last one it should not change the displayed panel', (_, key) => {
        const tabs: Tab[] = [
            {
                title: 'button 1',
                panelContent: <div data-testid="tab-panel-1">content</div>,
            },
            {
                title: 'button 2',
                panelContent: <div data-testid="tab-panel-2">content</div>,
            },
        ];
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);
        const tabButtonsContainer = getByTestId(wrapper, 'tab-buttons-container');

        getByTestId(wrapper, 'tab-button-2').simulate('click');
        tabButtonsContainer.simulate('keydown', { key: 'Tab' });
        tabButtonsContainer.simulate('keydown', { key: key });

        expectPanelToBeVisible(wrapper, 'tab-panel-2');
    });

    test.each([
        ['space', ' '],
        ['enter', 'Enter'],
    ])('when the left arrow and the %s keys are entered it should display the panel to the left', (_, key) => {
        const tabs: Tab[] = [
            {
                title: 'button 1',
                panelContent: <div data-testid="tab-panel-1">content</div>,
            },
            {
                title: 'button 2',
                panelContent: <div data-testid="tab-panel-2">content</div>,
            },
        ];
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);
        const tabButtonsContainer = getByTestId(wrapper, 'tab-buttons-container');
        simulateTabSelectionToTheRight(tabButtonsContainer);

        tabButtonsContainer.simulate('keydown', { key: 'ArrowLeft' });
        tabButtonsContainer.simulate('keydown', { key: key });

        expectPanelToBeVisible(wrapper, 'tab-panel-1');
    });

    test.each([
        ['space', ' '],
        ['enter', 'Enter'],
    ])(
        'when the left arrow and the %s keys are entered and first tab is active then it should display the last tab',
        (_, key) => {
            const tabs: Tab[] = [
                {
                    title: 'button 1',
                    panelContent: <div data-testid="tab-panel-1">content</div>,
                },
                {
                    title: 'button 2',
                    panelContent: <div data-testid="tab-panel-2">content</div>,
                },
                {
                    title: 'button 3',
                    panelContent: <div data-testid="tab-panel-3">content</div>,
                },
            ];
            const wrapper = mountWithProviders(<Tabs tabs={tabs} />);
            givenClickOnFirstTab(wrapper);
            const tabButtonsContainer = getByTestId(wrapper, 'tab-buttons-container');

            tabButtonsContainer.simulate('keydown', { key: 'ArrowLeft' });
            tabButtonsContainer.simulate('keydown', { key: key });

            expectPanelToBeVisible(wrapper, 'tab-panel-3');
        });

    test.each([
        ['space', ' '],
        ['enter', 'Enter'],
    ])(
        'when the right arrow and the %s keys are entered and last tab is active then it should display the first tab',
        (_, key) => {
            const tabs: Tab[] = [
                {
                    title: 'button 1',
                    panelContent: <div data-testid="tab-panel-1">content</div>,
                },
                {
                    title: 'button 2',
                    panelContent: <div data-testid="tab-panel-2">content</div>,
                },
                {
                    title: 'button 3',
                    panelContent: <div data-testid="tab-panel-3">content</div>,
                },
            ];
            const wrapper = mountWithProviders(<Tabs tabs={tabs} />);
            const tabButtonsContainer = getByTestId(wrapper, 'tab-buttons-container');
            getByTestId(wrapper, 'tab-button-3').simulate('click');

            tabButtonsContainer.simulate('keydown', { key: 'ArrowRight' });
            tabButtonsContainer.simulate('keydown', { key: key });

            expectPanelToBeVisible(wrapper, 'tab-panel-1');
        });

    test.each([
        ['space', ' '],
        ['enter', 'Enter'],
    ])('when the home and the %s keys are entered then it should display the first tab', (_, key) => {
        const tabs: Tab[] = [
            {
                title: 'button 1',
                panelContent: <div data-testid="tab-panel-1">content</div>,
            },
            {
                title: 'button 2',
                panelContent: <div data-testid="tab-panel-2">content</div>,
            },
            {
                title: 'button 3',
                panelContent: <div data-testid="tab-panel-3">content</div>,
            },
        ];
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);
        const tabButtonsContainer = getByTestId(wrapper, 'tab-buttons-container');
        getByTestId(wrapper, 'tab-button-3').simulate('click');

        tabButtonsContainer.simulate('keydown', { key: 'Home' });
        tabButtonsContainer.simulate('keydown', { key: key });

        expectPanelToBeVisible(wrapper, 'tab-panel-1');
    });

    test.each([
        ['space', ' '],
        ['enter', 'Enter'],
    ])('when the end and the %s keys are entered then it should display the last tab', (_, key) => {
        const tabs: Tab[] = [
            {
                title: 'button 1',
                panelContent: <div data-testid="tab-panel-1">content</div>,
            },
            {
                title: 'button 2',
                panelContent: <div data-testid="tab-panel-2">content</div>,
            },
            {
                title: 'button 3',
                panelContent: <div data-testid="tab-panel-3">content</div>,
            },
        ];
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);
        givenClickOnFirstTab(wrapper);
        const tabButtonsContainer = getByTestId(wrapper, 'tab-buttons-container');

        tabButtonsContainer.simulate('keydown', { key: 'End' });
        tabButtonsContainer.simulate('keydown', { key: key });

        expectPanelToBeVisible(wrapper, 'tab-panel-3');
    });
});

function simulateTabSelectionToTheRight(tabButtonsDiv: CommonWrapper): void {
    tabButtonsDiv.simulate('keydown', { key: 'ArrowRight' });
    tabButtonsDiv.simulate('keydown', { key: ' ' });
}

function givenClickOnFirstTab(wrapper: ReactWrapper): void {
    getByTestId(wrapper, 'tab-button-1').simulate('click');
}

function expectPanelToBeVisible(wrapper: ReactWrapper, tabPanelTestId: string): void {
    const tabPanel = findByTestId(wrapper, tabPanelTestId);
    expect(tabPanel.isEmptyRender()).toBe(false);
}
