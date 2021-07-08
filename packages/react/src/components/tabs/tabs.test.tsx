import { CommonWrapper, ReactWrapper } from 'enzyme';
import React from 'react';
import { findByTestId, getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithProviders } from '../../test-utils/renderer';
import { Tab, Tabs } from './tabs';

function givenTabs(amount: number): Tab[] {
    const tabs: Tab[] = [];
    for (let i = 1; i <= amount; i++) {
        tabs.push({
            title: `button ${i}`,
            panelContent: <div data-testid={`tab-panel-${i}`}>content</div>,
        });
    }

    return tabs;
}

function simulateTabSelectionToTheRight(tabButtonsDiv: CommonWrapper): void {
    tabButtonsDiv.simulate('keydown', { key: 'ArrowRight' });
    tabButtonsDiv.simulate('keydown', { key: ' ' });
}

function givenClickOnFirstTab(wrapper: ReactWrapper): void {
    getByTestId(wrapper, 'tab-button-1').simulate('click');
}

function expectPanelToBeRendered(wrapper: ReactWrapper, tabPanelTestId: string): void {
    const tabPanel = findByTestId(wrapper, tabPanelTestId);
    expect(tabPanel.isEmptyRender()).toBe(false);
}

describe('Tabs', () => {
    test('should display the first tab panel by default', () => {
        const expectedTabPanel = 'content';
        const tabs: Tab[] = givenTabs(1);
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);

        const tabPanel = getByTestId(wrapper, 'tab-panel-1');

        expect(tabPanel.prop('children')).toBe(expectedTabPanel);
    });

    test('should select the first button by default', () => {
        const tabs: Tab[] = givenTabs(2);
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);

        const tabButton = getByTestId(wrapper, 'tab-button-1');

        expect(tabButton.prop('isSelected')).toBe(true);
    });

    test('should only have one button selected at a time', () => {
        const tabs: Tab[] = givenTabs(2);
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);

        const tabButton1 = getByTestId(wrapper, 'tab-button-1');
        const tabButton2 = getByTestId(wrapper, 'tab-button-2');

        expect(tabButton1.prop('isSelected')).toBe(true);
        expect(tabButton2.prop('isSelected')).toBe(false);
    });

    test('should only render the selected panel by default', () => {
        const tabs: Tab[] = givenTabs(2);

        const wrapper = mountWithProviders(<Tabs tabs={tabs} forceRenderTabPanels />);

        expectPanelToBeRendered(wrapper, 'tab-panel-1');
        expect(getByTestId(wrapper, 'tab-panel-2').exists()).toBe(false);
    });

    test('tab panel should be rendered when tab is selected', () => {
        const tabs: Tab[] = givenTabs(2);
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);

        getByTestId(wrapper, 'tab-button-2').simulate('click');

        expectPanelToBeRendered(wrapper, 'tab-panel-2');
    });

    test('tab panel should unmount when another tab is selected', () => {
        const tabs: Tab[] = givenTabs(2);
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);

        getByTestId(wrapper, 'tab-button-2').simulate('click');

        expect(getByTestId(wrapper, 'tab-panel-1').exists()).toBe(false);
    });

    test(
        'tab panels should stay mounted after they are first rendered given forceRenderTabPanels is set to true',
        () => {
            const tabs: Tab[] = givenTabs(2);
            const wrapper = mountWithProviders(<Tabs tabs={tabs} forceRenderTabPanels />);

            getByTestId(wrapper, 'tab-button-2').simulate('click');

            expectPanelToBeRendered(wrapper, 'tab-panel-1');
            expectPanelToBeRendered(wrapper, 'tab-panel-2');
        },
    );

    test('when a button is selected only the selected panel should be displayed', () => {
        const tabs: Tab[] = givenTabs(2);
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);

        getByTestId(wrapper, 'tab-button-2').simulate('click');

        expectPanelToBeRendered(wrapper, 'tab-panel-2');
    });

    test.each([
        ['space', ' '],
        ['enter', 'Enter'],
    ])('when the right arrow and the %s keys are entered it should display the panel to the right', (_, key) => {
        const tabs: Tab[] = givenTabs(2);
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);
        givenClickOnFirstTab(wrapper);
        const tabButtonsContainer = getByTestId(wrapper, 'tab-buttons-container');

        tabButtonsContainer.simulate('keydown', { key: 'ArrowRight' });
        tabButtonsContainer.simulate('keydown', { key });

        expectPanelToBeRendered(wrapper, 'tab-panel-2');
    });

    test('when the tab key is entered and the focus tab is not the active one it should select back the active one',
        () => {
            const tabs: Tab[] = givenTabs(3);
            const wrapper = mountWithProviders(<Tabs tabs={tabs} />);
            const tabButtonsContainer = getByTestId(wrapper, 'tab-buttons-container');
            getByTestId(wrapper, 'tab-button-2').simulate('click');
            tabButtonsContainer.simulate('keydown', { key: 'ArrowRight' });

            tabButtonsContainer.simulate('keydown', { key: 'Tab' });

            const tabButton = getByTestId(wrapper, 'tab-button-2');
            expect(tabButton.prop('isSelected')).toBe(true);
        });

    test.each([
        ['space', ' '],
        ['enter', 'Enter'],
    ])('when the left arrow and the %s keys are entered it should display the panel to the left', (_, key) => {
        const tabs: Tab[] = givenTabs(2);
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);
        const tabButtonsContainer = getByTestId(wrapper, 'tab-buttons-container');
        simulateTabSelectionToTheRight(tabButtonsContainer);

        tabButtonsContainer.simulate('keydown', { key: 'ArrowLeft' });
        tabButtonsContainer.simulate('keydown', { key });

        expectPanelToBeRendered(wrapper, 'tab-panel-1');
    });

    test.each([
        ['space', ' '],
        ['enter', 'Enter'],
    ])('when the left arrow and the %s keys are entered and first tab is active then it should display the last tab',
        (_, key) => {
            const tabs: Tab[] = givenTabs(3);
            const wrapper = mountWithProviders(<Tabs tabs={tabs} />);
            givenClickOnFirstTab(wrapper);
            const tabButtonsContainer = getByTestId(wrapper, 'tab-buttons-container');

            tabButtonsContainer.simulate('keydown', { key: 'ArrowLeft' });
            tabButtonsContainer.simulate('keydown', { key });

            expectPanelToBeRendered(wrapper, 'tab-panel-3');
        });

    test.each([
        ['space', ' '],
        ['enter', 'Enter'],
    ])(
        'when the right arrow and the %s keys are entered and last tab is active then it should display the first tab',
        (_, key) => {
            const tabs: Tab[] = givenTabs(3);
            const wrapper = mountWithProviders(<Tabs tabs={tabs} />);
            const tabButtonsContainer = getByTestId(wrapper, 'tab-buttons-container');
            getByTestId(wrapper, 'tab-button-3').simulate('click');

            tabButtonsContainer.simulate('keydown', { key: 'ArrowRight' });
            tabButtonsContainer.simulate('keydown', { key });

            expectPanelToBeRendered(wrapper, 'tab-panel-1');
        },
    );

    test.each([
        ['space', ' '],
        ['enter', 'Enter'],
    ])('when the home and the %s keys are entered then it should display the first tab', (_, key) => {
        const tabs: Tab[] = givenTabs(3);
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);
        const tabButtonsContainer = getByTestId(wrapper, 'tab-buttons-container');
        getByTestId(wrapper, 'tab-button-3').simulate('click');

        tabButtonsContainer.simulate('keydown', { key: 'Home' });
        tabButtonsContainer.simulate('keydown', { key });

        expectPanelToBeRendered(wrapper, 'tab-panel-1');
    });

    test.each([
        ['space', ' '],
        ['enter', 'Enter'],
    ])('when the end and the %s keys are entered then it should display the last tab', (_, key) => {
        const tabs: Tab[] = givenTabs(3);
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);
        givenClickOnFirstTab(wrapper);
        const tabButtonsContainer = getByTestId(wrapper, 'tab-buttons-container');

        tabButtonsContainer.simulate('keydown', { key: 'End' });
        tabButtonsContainer.simulate('keydown', { key });

        expectPanelToBeRendered(wrapper, 'tab-panel-3');
    });
});
