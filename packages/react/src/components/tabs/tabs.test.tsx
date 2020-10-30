import { CommonWrapper, ReactWrapper } from 'enzyme';
import React from 'react';

import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithProviders } from '../../test-utils/renderer';
import { Tab, Tabs } from './tabs';

describe('Tabs', () => {
    test('should have the same tab panel content as Tab prop', () => {
        const expectedTabPanel = <div>content</div>;
        const tabs: Tab[] = [
            {
                title: 'button',
                panelContent: expectedTabPanel,
            },
        ];
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);

        const tabPanel = getByTestId(wrapper, 'tab-panel--1');

        expect(tabPanel.prop('children')).toBe(expectedTabPanel);
    });

    test('should select the first button by default', () => {
        const tabs: Tab[] = [
            {
                title: 'button 1',
                panelContent: <div>content</div>,
            },
            {
                title: 'button 2',
                panelContent: <div>content</div>,
            },
        ];
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);

        const tabButton = getByTestId(wrapper, 'tab-button--1');

        expect(tabButton.prop('isSelected')).toBeTruthy();
    });

    test('should only have one button selected at a time', () => {
        const tabs: Tab[] = [
            {
                title: 'button 1',
                panelContent: <div>content</div>,
            },
            {
                title: 'button 2',
                panelContent: <div>content</div>,
            },
        ];
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);

        const tabButton1 = getByTestId(wrapper, 'tab-button--1');
        const tabButton2 = getByTestId(wrapper, 'tab-button--2');

        expect(tabButton1.prop('isSelected')).toBeTruthy();
        expect(tabButton2.prop('isSelected')).toBeFalsy();
    });

    test('should only display selected panel', () => {
        const tabs: Tab[] = [
            {
                title: 'button 1',
                panelContent: <div>content</div>,
            },
            {
                title: 'button 2',
                panelContent: <div>content</div>,
            },
        ];
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);
        expectPanelToBeVisible(wrapper, 'tab-panel--1', true);
        expectPanelToBeVisible(wrapper, 'tab-panel--2', false);
    });

    test('when a button is selected only the selected panel should be displayed', () => {
        const tabs: Tab[] = [
            {
                title: 'button 1',
                panelContent: <div>content</div>,
            },
            {
                title: 'button 2',
                panelContent: <div>content</div>,
            },
        ];
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);

        getByTestId(wrapper, 'tab-button--2').simulate('click');

        expectPanelToBeVisible(wrapper, 'tab-panel--1', false);
        expectPanelToBeVisible(wrapper, 'tab-panel--2', true);
    });

    test('when the right arrow and the space keys are entered it should display the panel to the right', () => {
        const tabs: Tab[] = [
            {
                title: 'button 1',
                panelContent: <div>content</div>,
            },
            {
                title: 'button 2',
                panelContent: <div>content</div>,
            },
        ];
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);
        simulateFirstTabFocus(wrapper);
        const tabButtonsDiv = getByTestId(wrapper, 'tab-buttons-div');

        tabButtonsDiv.simulate('keydown', { key: 'ArrowRight' });
        tabButtonsDiv.simulate('keydown', { key: ' ' });

        expectPanelToBeVisible(wrapper, 'tab-panel--1', false);
        expectPanelToBeVisible(wrapper, 'tab-panel--2', true);
    });

    test('when the right arrow and the enter keys are entered it should display the panel to the right', () => {
        const tabs: Tab[] = [
            {
                title: 'button 1',
                panelContent: <div>content</div>,
            },
            {
                title: 'button 2',
                panelContent: <div>content</div>,
            },
        ];
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);
        simulateFirstTabFocus(wrapper);
        const tabButtonsDiv = getByTestId(wrapper, 'tab-buttons-div');

        tabButtonsDiv.simulate('keydown', { key: 'ArrowRight' });
        tabButtonsDiv.simulate('keydown', { key: 'Enter' });

        expectPanelToBeVisible(wrapper, 'tab-panel--1', false);
        expectPanelToBeVisible(wrapper, 'tab-panel--2', true);
    });

    test('when the tab and the space keys are entered and the active tab is not the last one it should display the panel to the right', () => {
        const tabs: Tab[] = [
            {
                title: 'button 1',
                panelContent: <div>content</div>,
            },
            {
                title: 'button 2',
                panelContent: <div>content</div>,
            },
        ];
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);
        simulateFirstTabFocus(wrapper);
        const tabButtonsDiv = getByTestId(wrapper, 'tab-buttons-div');

        tabButtonsDiv.simulate('keydown', { key: 'Tab' });
        tabButtonsDiv.simulate('keydown', { key: ' ' });

        expectPanelToBeVisible(wrapper, 'tab-panel--1', false);
        expectPanelToBeVisible(wrapper, 'tab-panel--2', true);
    });

    test('when the tab and the enter keys are entered and the active tab is not the last one it should display the panel to the right', () => {
        const tabs: Tab[] = [
            {
                title: 'button 1',
                panelContent: <div>content</div>,
            },
            {
                title: 'button 2',
                panelContent: <div>content</div>,
            },
        ];
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);
        simulateFirstTabFocus(wrapper);
        const tabButtonsDiv = getByTestId(wrapper, 'tab-buttons-div');

        tabButtonsDiv.simulate('keydown', { key: 'Tab' });
        tabButtonsDiv.simulate('keydown', { key: 'Enter' });

        expectPanelToBeVisible(wrapper, 'tab-panel--1', false);
        expectPanelToBeVisible(wrapper, 'tab-panel--2', true);
    });

    test('when the tab and the space keys are entered and the active tab is the last one it should not change the displayed panel', () => {
        const tabs: Tab[] = [
            {
                title: 'button 1',
                panelContent: <div>content</div>,
            },
            {
                title: 'button 2',
                panelContent: <div>content</div>,
            },
        ];
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);
        const tabButtonsDiv = getByTestId(wrapper, 'tab-buttons-div');

        getByTestId(wrapper, 'tab-button--2').simulate('click');
        tabButtonsDiv.simulate('keydown', { key: 'Tab' });
        tabButtonsDiv.simulate('keydown', { key: ' ' });

        expectPanelToBeVisible(wrapper, 'tab-panel--1', false);
        expectPanelToBeVisible(wrapper, 'tab-panel--2', true);
    });

    test('when the tab and the enter keys are entered and the active tab is the last one it should not change the displayed panel', () => {
        const tabs: Tab[] = [
            {
                title: 'button 1',
                panelContent: <div>content</div>,
            },
            {
                title: 'button 2',
                panelContent: <div>content</div>,
            },
        ];
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);
        const tabButtonsDiv = getByTestId(wrapper, 'tab-buttons-div');

        getByTestId(wrapper, 'tab-button--2').simulate('click');
        tabButtonsDiv.simulate('keydown', { key: 'Tab' });
        tabButtonsDiv.simulate('keydown', { key: 'Enter' });

        expectPanelToBeVisible(wrapper, 'tab-panel--1', false);
        expectPanelToBeVisible(wrapper, 'tab-panel--2', true);
    });

    test('when the left arrow and the space keys are entered it should display the panel to the left', () => {
        const tabs: Tab[] = [
            {
                title: 'button 1',
                panelContent: <div>content</div>,
            },
            {
                title: 'button 2',
                panelContent: <div>content</div>,
            },
        ];
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);
        const tabButtonsDiv = getByTestId(wrapper, 'tab-buttons-div');
        simulateTabSelectionToTheRight(tabButtonsDiv);

        tabButtonsDiv.simulate('keydown', { key: 'ArrowLeft' });
        tabButtonsDiv.simulate('keydown', { key: ' ' });

        expectPanelToBeVisible(wrapper, 'tab-panel--1', true);
        expectPanelToBeVisible(wrapper, 'tab-panel--2', false);
    });

    test('when the left arrow and the enter keys are entered it should display the panel to the left', () => {
        const tabs: Tab[] = [
            {
                title: 'button 1',
                panelContent: <div>content</div>,
            },
            {
                title: 'button 2',
                panelContent: <div>content</div>,
            },
        ];
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);
        const tabButtonsDiv = getByTestId(wrapper, 'tab-buttons-div');
        simulateTabSelectionToTheRight(tabButtonsDiv);

        tabButtonsDiv.simulate('keydown', { key: 'ArrowLeft' });
        tabButtonsDiv.simulate('keydown', { key: 'Enter' });

        expectPanelToBeVisible(wrapper, 'tab-panel--1', true);
        expectPanelToBeVisible(wrapper, 'tab-panel--2', false);
    });

    test('when the left arrow and the space keys are entered and first tab is active then it should display the last tab', () => {
        const tabs: Tab[] = [
            {
                title: 'button 1',
                panelContent: <div>content</div>,
            },
            {
                title: 'button 2',
                panelContent: <div>content</div>,
            },
            {
                title: 'button 3',
                panelContent: <div>content</div>,
            },
        ];
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);
        simulateFirstTabFocus(wrapper);
        const tabButtonsDiv = getByTestId(wrapper, 'tab-buttons-div');

        tabButtonsDiv.simulate('keydown', { key: 'ArrowLeft' });
        tabButtonsDiv.simulate('keydown', { key: ' ' });

        expectPanelToBeVisible(wrapper, 'tab-panel--1', false);
        expectPanelToBeVisible(wrapper, 'tab-panel--2', false);
        expectPanelToBeVisible(wrapper, 'tab-panel--3', true);
    });

    test('when the left arrow and the enter keys are entered and first tab is active then it should display the last tab', () => {
        const tabs: Tab[] = [
            {
                title: 'button 1',
                panelContent: <div>content</div>,
            },
            {
                title: 'button 2',
                panelContent: <div>content</div>,
            },
            {
                title: 'button 3',
                panelContent: <div>content</div>,
            },
        ];
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);
        simulateFirstTabFocus(wrapper);
        const tabButtonsDiv = getByTestId(wrapper, 'tab-buttons-div');

        tabButtonsDiv.simulate('keydown', { key: 'ArrowLeft' });
        tabButtonsDiv.simulate('keydown', { key: 'Enter' });

        expectPanelToBeVisible(wrapper, 'tab-panel--1', false);
        expectPanelToBeVisible(wrapper, 'tab-panel--2', false);
        expectPanelToBeVisible(wrapper, 'tab-panel--3', true);
    });

    test('when the right arrow and the space keys are entered and last tab is active then it should display the first tab', () => {
        const tabs: Tab[] = [
            {
                title: 'button 1',
                panelContent: <div>content</div>,
            },
            {
                title: 'button 2',
                panelContent: <div>content</div>,
            },
            {
                title: 'button 3',
                panelContent: <div>content</div>,
            },
        ];
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);
        const tabButtonsDiv = getByTestId(wrapper, 'tab-buttons-div');
        getByTestId(wrapper, 'tab-button--3').simulate('click');

        tabButtonsDiv.simulate('keydown', { key: 'ArrowRight' });
        tabButtonsDiv.simulate('keydown', { key: ' ' });

        expectPanelToBeVisible(wrapper, 'tab-panel--1', true);
        expectPanelToBeVisible(wrapper, 'tab-panel--2', false);
        expectPanelToBeVisible(wrapper, 'tab-panel--3', false);
    });

    test('when the right arrow and the enter keys are entered and last tab is active then it should display the first tab', () => {
        const tabs: Tab[] = [
            {
                title: 'button 1',
                panelContent: <div>content</div>,
            },
            {
                title: 'button 2',
                panelContent: <div>content</div>,
            },
            {
                title: 'button 3',
                panelContent: <div>content</div>,
            },
        ];
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);
        const tabButtonsDiv = getByTestId(wrapper, 'tab-buttons-div');
        getByTestId(wrapper, 'tab-button--3').simulate('click');

        tabButtonsDiv.simulate('keydown', { key: 'ArrowRight' });
        tabButtonsDiv.simulate('keydown', { key: 'Enter' });

        expectPanelToBeVisible(wrapper, 'tab-panel--1', true);
        expectPanelToBeVisible(wrapper, 'tab-panel--2', false);
        expectPanelToBeVisible(wrapper, 'tab-panel--3', false);
    });

    test('when the home and the space keys are entered then it should display the first tab', () => {
        const tabs: Tab[] = [
            {
                title: 'button 1',
                panelContent: <div>content</div>,
            },
            {
                title: 'button 2',
                panelContent: <div>content</div>,
            },
            {
                title: 'button 3',
                panelContent: <div>content</div>,
            },
        ];
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);
        const tabButtonsDiv = getByTestId(wrapper, 'tab-buttons-div');
        getByTestId(wrapper, 'tab-button--3').simulate('click');

        tabButtonsDiv.simulate('keydown', { key: 'Home' });
        tabButtonsDiv.simulate('keydown', { key: ' ' });

        expectPanelToBeVisible(wrapper, 'tab-panel--1', true);
        expectPanelToBeVisible(wrapper, 'tab-panel--2', false);
        expectPanelToBeVisible(wrapper, 'tab-panel--3', false);
    });

    test('when the home and the enter keys are entered then it should display the first tab', () => {
        const tabs: Tab[] = [
            {
                title: 'button 1',
                panelContent: <div>content</div>,
            },
            {
                title: 'button 2',
                panelContent: <div>content</div>,
            },
            {
                title: 'button 3',
                panelContent: <div>content</div>,
            },
        ];
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);
        const tabButtonsDiv = getByTestId(wrapper, 'tab-buttons-div');
        getByTestId(wrapper, 'tab-button--3').simulate('click');

        tabButtonsDiv.simulate('keydown', { key: 'Home' });
        tabButtonsDiv.simulate('keydown', { key: 'Enter' });

        expectPanelToBeVisible(wrapper, 'tab-panel--1', true);
        expectPanelToBeVisible(wrapper, 'tab-panel--2', false);
        expectPanelToBeVisible(wrapper, 'tab-panel--3', false);
    });

    test('when the end and the space keys are entered then it should display the last tab', () => {
        const tabs: Tab[] = [
            {
                title: 'button 1',
                panelContent: <div>content</div>,
            },
            {
                title: 'button 2',
                panelContent: <div>content</div>,
            },
            {
                title: 'button 3',
                panelContent: <div>content</div>,
            },
        ];
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);
        simulateFirstTabFocus(wrapper);
        const tabButtonsDiv = getByTestId(wrapper, 'tab-buttons-div');

        tabButtonsDiv.simulate('keydown', { key: 'End' });
        tabButtonsDiv.simulate('keydown', { key: ' ' });

        expectPanelToBeVisible(wrapper, 'tab-panel--1', false);
        expectPanelToBeVisible(wrapper, 'tab-panel--2', false);
        expectPanelToBeVisible(wrapper, 'tab-panel--3', true);
    });

    test('when the end and the enter keys are entered then it should display the last tab', () => {
        const tabs: Tab[] = [
            {
                title: 'button 1',
                panelContent: <div>content</div>,
            },
            {
                title: 'button 2',
                panelContent: <div>content</div>,
            },
            {
                title: 'button 3',
                panelContent: <div>content</div>,
            },
        ];
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);
        simulateFirstTabFocus(wrapper);
        const tabButtonsDiv = getByTestId(wrapper, 'tab-buttons-div');

        tabButtonsDiv.simulate('keydown', { key: 'End' });
        tabButtonsDiv.simulate('keydown', { key: 'Enter' });

        expectPanelToBeVisible(wrapper, 'tab-panel--1', false);
        expectPanelToBeVisible(wrapper, 'tab-panel--2', false);
        expectPanelToBeVisible(wrapper, 'tab-panel--3', true);
    });
});

function simulateTabSelectionToTheRight(tabButtonsDiv: CommonWrapper): void {
    tabButtonsDiv.simulate('keydown', { key: 'ArrowRight' });
    tabButtonsDiv.simulate('keydown', { key: ' ' });
}

function simulateFirstTabFocus(wrapper: ReactWrapper): void {
    getByTestId(wrapper, 'tab-button--1').simulate('click');
}

function expectPanelToBeVisible(wrapper: ReactWrapper, tabPanelTestId: string, isVisible: boolean): void {
    const tabPanel = getByTestId(wrapper, tabPanelTestId);
    expect(tabPanel.prop('isSelected')).toBe(isVisible);
}
