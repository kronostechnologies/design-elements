import { ReactWrapper, ShallowWrapper } from 'enzyme';
import ReactDOM from 'react-dom';
import { findByTestId, getByTestId } from '../../test-utils/enzyme-selectors';
import { expectFocusToBeOn } from '../../test-utils/enzyme-utils';
import {
    actAndWaitForEffects,
    mountWithProviders,
    mountWithTheme,
    renderWithProviders,
} from '../../test-utils/renderer';
import { Tab, Tabs } from './tabs';

function givenTabs(amount: number): Tab[] {
    const tabs: Tab[] = [];
    for (let i = 1; i <= amount; i++) {
        tabs.push({
            id: `tab-${i}`,
            title: `button ${i}`,
            panelContent: <div data-testid={`tab-panel-${i}`}>content</div>,
        });
    }

    return tabs;
}

function expectPanelToBeRendered(wrapper: ReactWrapper, tabPanelTestId: string): void {
    const tabPanel = findByTestId(wrapper, tabPanelTestId);
    expect(tabPanel.isEmptyRender()).toBe(false);
}

function getActionButton<W extends ReactWrapper | ShallowWrapper>(wrapper: W, index: number): W {
    const tab = getByTestId(wrapper, `tab-button-${index}`, { htmlNodesOnly: true });
    return getByTestId(tab, 'tab-button', { htmlNodesOnly: true });
}

describe('Tabs', () => {
    beforeEach(() => {
        global.ResizeObserver = jest.fn().mockImplementation(() => ({
            observe: jest.fn(),
            unobserve: jest.fn(),
            disconnect: jest.fn(),
        }));
    });

    test('should display the first tab panel by default', () => {
        const expectedTabPanel = 'content';
        const tabs: Tab[] = givenTabs(1);
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);

        const tabPanel = getByTestId(wrapper, 'tab-panel-1');

        expect(tabPanel.prop('children')).toBe(expectedTabPanel);
    });

    test('should only render the selected panel by default', () => {
        const tabs: Tab[] = givenTabs(2);

        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);

        expectPanelToBeRendered(wrapper, 'tab-panel-1');

        expect(getByTestId(wrapper, 'tab-panel-2').exists()).toBe(false);
    });

    test('tab panel should be rendered when tab is selected', () => {
        const tabs: Tab[] = givenTabs(2);
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);

        getActionButton(wrapper, 2).simulate('click');

        expectPanelToBeRendered(wrapper, 'tab-panel-2');
    });

    test('should remove deleted tab', () => {
        const tabs: Tab[] = [
            {
                id: 'tab1',
                title: 'Tab 1',
                panelContent: <div>content</div>,
                onDelete: () => undefined,
            },
            {
                id: 'tab2',
                title: 'Tab 2',
                panelContent: <div>content</div>,
                onDelete: () => undefined,
            },
        ];
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);

        getActionButton(wrapper, 2).simulate('click');

        expect(getByTestId(wrapper, 'tab-button-', { modifier: '^', htmlNodesOnly: true }).length).toBe(1);
    });

    test('tab panel should unmount when another tab is selected', () => {
        const tabs: Tab[] = givenTabs(2);
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);

        getActionButton(wrapper, 2).simulate('click');

        expect(getByTestId(wrapper, 'tab-panel-1').exists()).toBe(false);
    });

    test('tab panel should not change if onBeforeUnload cancels tab selection', async () => {
        const tabs: Tab[] = givenTabs(2);
        const shouldConfirmTabUnload = Promise.resolve(false);
        tabs[0] = {
            ...tabs[0],
            onBeforeUnload: () => shouldConfirmTabUnload,
        };
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);

        await actAndWaitForEffects(wrapper, () => {
            getActionButton(wrapper, 2).prop('onClick')();
        });

        expect(getByTestId(wrapper, 'tab-panel-1').exists()).toBe(true);
    });

    test('tab panel should change if no onBeforeUnload callback was provided', async () => {
        const tabs: Tab[] = givenTabs(2);
        tabs[0] = {
            ...tabs[0],
        };
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);

        await actAndWaitForEffects(wrapper, () => {
            getActionButton(wrapper, 2).prop('onClick')();
        });

        expect(getByTestId(wrapper, 'tab-panel-2').exists()).toBeTruthy();
    });

    test('tab panel should change if onBeforeUnload confirms tab selection', async () => {
        const tabs: Tab[] = givenTabs(2);
        const shouldConfirmTabOnClick = Promise.resolve(true);
        tabs[0] = {
            ...tabs[0],
            onBeforeUnload: () => shouldConfirmTabOnClick,
        };
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);

        await actAndWaitForEffects(wrapper, () => {
            getActionButton(wrapper, 2).prop('onClick')();
        });

        expect(getByTestId(wrapper, 'tab-panel-2').exists()).toBeTruthy();
    });

    test('tab-panels should all be initially mounted when forceRenderTabPanels is set to true', () => {
        const tabs: Tab[] = givenTabs(2);

        const wrapper = mountWithProviders(<Tabs tabs={tabs} forceRenderTabPanels />);

        expectPanelToBeRendered(wrapper, 'tab-panel-1');
        expectPanelToBeRendered(wrapper, 'tab-panel-2');
    });

    test('when a button is selected only the selected panel should be displayed', () => {
        const tabs: Tab[] = givenTabs(2);
        const wrapper = mountWithProviders(<Tabs tabs={tabs} />);

        getActionButton(wrapper, 2).simulate('click');

        expectPanelToBeRendered(wrapper, 'tab-panel-2');
    });

    test('matches snapshot', () => {
        const tabs: Tab[] = givenTabs(2);

        const wrapper = renderWithProviders(<Tabs tabs={tabs} forceRenderTabPanels />);

        expect(wrapper).toMatchSnapshot();
    });

    test('matches snapshot (global)', () => {
        const tabs: Tab[] = givenTabs(2);

        const wrapper = renderWithProviders(<Tabs tabs={tabs} global forceRenderTabPanels />);

        expect(wrapper).toMatchSnapshot();
    });

    test('matches snapshot (mobile)', () => {
        const tabs: Tab[] = givenTabs(2);

        const wrapper = renderWithProviders(<Tabs tabs={tabs} forceRenderTabPanels />, 'mobile');

        expect(wrapper).toMatchSnapshot();
    });

    describe('focus', () => {
        const divElement = document.createElement('div');

        beforeAll(() => {
            document.body.appendChild(divElement);
        });

        afterEach(() => {
            ReactDOM.unmountComponentAtNode(divElement);
        });

        it('should go to the next tab-button when ArrowRight key is pressed on a tab-button', () => {
            const tabs = givenTabs(2);
            const wrapper = mountWithTheme(
                <Tabs tabs={tabs} />,
                { attachTo: divElement },
            );

            getActionButton(wrapper, 1).simulate('keydown', { key: 'ArrowRight' });

            expectFocusToBeOn(getActionButton(wrapper, 2));
        });

        it('should go to the first tab-button when ArrowRight key is pressed on last tab-button', () => {
            const tabs: Tab[] = givenTabs(3);
            const wrapper = mountWithTheme(
                <Tabs tabs={tabs} />,
                { attachTo: divElement },
            );

            getActionButton(wrapper, 3).simulate('keydown', { key: 'ArrowRight' });

            expectFocusToBeOn(getActionButton(wrapper, 1));
        });

        it('should go to the previous tab-button when ArrowLeft key is pressed on a tab-button', () => {
            const tabs: Tab[] = givenTabs(3);
            const wrapper = mountWithTheme(
                <Tabs tabs={tabs} />,
                { attachTo: divElement },
            );

            getActionButton(wrapper, 3).simulate('keydown', { key: 'ArrowLeft' });

            expectFocusToBeOn(getActionButton(wrapper, 2));
        });

        it('should go to the last tab-button when ArrowLeft key is pressed on first tab-button', () => {
            const tabs: Tab[] = givenTabs(3);
            const wrapper = mountWithTheme(
                <Tabs tabs={tabs} />,
                { attachTo: divElement },
            );

            getActionButton(wrapper, 1).simulate('keydown', { key: 'ArrowLeft' });

            expectFocusToBeOn(getActionButton(wrapper, 3));
        });

        it('should go to the selected tab-button when Tab key is pressed on a tab-button that is not selected', () => {
            const tabs: Tab[] = givenTabs(3);
            const wrapper = mountWithTheme(
                <Tabs tabs={tabs} />,
                { attachTo: divElement },
            );

            getActionButton(wrapper, 2).simulate('click');
            getActionButton(wrapper, 3).simulate('keydown', { key: 'Tab' });

            expectFocusToBeOn(getActionButton(wrapper, 2));
        });

        it('should go to the first tab-button when Home key is pressed on a tab-button', () => {
            const tabs: Tab[] = givenTabs(3);
            const wrapper = mountWithTheme(
                <Tabs tabs={tabs} />,
                { attachTo: divElement },
            );

            getActionButton(wrapper, 3).simulate('click');
            getActionButton(wrapper, 3).simulate('keydown', { key: 'Home' });

            expectFocusToBeOn(getActionButton(wrapper, 1));
        });

        it('should go to the last tab-button when End key is pressed on a tab-button', () => {
            const tabs: Tab[] = givenTabs(3);
            const wrapper = mountWithTheme(
                <Tabs tabs={tabs} />,
                { attachTo: divElement },
            );

            getActionButton(wrapper, 1).simulate('keydown', { key: 'End' });

            expectFocusToBeOn(getActionButton(wrapper, 3));
        });
    });
});
