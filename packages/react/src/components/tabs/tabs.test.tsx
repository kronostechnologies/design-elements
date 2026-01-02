import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderer';
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

function makeTabsWithContent(count = 3): Tab[] {
    return Array.from({ length: count }, (_, i) => ({
        id: `tab-${i + 1}`,
        title: `Tab ${i + 1}`,
        panelContent: <div>{`Content ${i + 1}`}</div>,
    }));
}

function expectTabWithTabIndexToBeRendered(tabIndex: number): void {
    expect(screen.queryByText(`Content ${tabIndex + 1}`)).toBeInTheDocument();
}

function expectTabWithTabIndexToNotBeRendered(tabIndex: number): void {
    expect(screen.queryByText(`Content ${tabIndex + 1}`)).not.toBeInTheDocument();
}

describe('Tabs', () => {
    beforeEach(() => {
        global.ResizeObserver = jest.fn().mockImplementation(() => ({
            observe: jest.fn(),
            unobserve: jest.fn(),
            disconnect: jest.fn(),
        }));
    });

    it('matches snapshot', () => {
        const tabs: Tab[] = givenTabs(2);

        const { container } = renderWithProviders(<Tabs tabs={tabs} forceRenderTabPanels />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has small styles', () => {
        const tabs: Tab[] = givenTabs(2);

        const { container } = renderWithProviders(
            <Tabs
                tabs={tabs}
                forceRenderTabPanels
                size="small"
            />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot (mobile)', () => {
        const tabs: Tab[] = givenTabs(2);

        const { container } = renderWithProviders(<Tabs tabs={tabs} forceRenderTabPanels />, 'mobile');

        expect(container.firstChild).toMatchSnapshot();
    });

    it('tab-panels should all be initially mounted when forceRenderTabPanels is set to true', () => {
        const tabs: Tab[] = makeTabsWithContent(2);

        renderWithProviders(<Tabs tabs={tabs} forceRenderTabPanels />);

        expectTabWithTabIndexToBeRendered(0);
        expectTabWithTabIndexToBeRendered(1);
    });

    describe('controlled mode', () => {
        it('renders with activeTabId', () => {
            const tabs = makeTabsWithContent(3);

            renderWithProviders(
                <Tabs tabs={tabs} activeTabId="tab-2" onTabChange={jest.fn()} />,
            );

            expectTabWithTabIndexToBeRendered(1);
            expectTabWithTabIndexToNotBeRendered(0);
            expectTabWithTabIndexToNotBeRendered(2);
        });

        it('onTabChange is called when tab is clicked', async () => {
            const user = userEvent.setup();
            const tabs: Tab[] = givenTabs(2);
            const onTabChange = jest.fn();
            renderWithProviders(
                <Tabs tabs={tabs} activeTabId="tab-1" onTabChange={onTabChange} />,
            );

            await user.click(screen.getByTestId('tab-2-button'));

            expect(onTabChange).toHaveBeenCalledWith('tab-2');
        });

        it('does not change tab visually if activeTabId does not change', async () => {
            const user = userEvent.setup();
            const tabs: Tab[] = givenTabs(2);
            const onTabChange = jest.fn();
            const { rerender } = renderWithProviders(
                <Tabs tabs={tabs} activeTabId="tab-1" onTabChange={onTabChange} />,
            );
            await user.click(screen.getByTestId('tab-2-button'));

            expect(screen.getByTestId('tab-1-button')).toHaveAttribute('aria-selected', 'true');
            expect(screen.getByTestId('tab-2-button')).toHaveAttribute('aria-selected', 'false');

            rerender(<Tabs tabs={tabs} activeTabId="tab-2" onTabChange={onTabChange} />);
            expect(screen.getByTestId('tab-2-button')).toHaveAttribute('aria-selected', 'true');
        });

        it('calls onRemove when a tab is removed', async () => {
            const user = userEvent.setup();
            const currentTabs = makeTabsWithContent(3);
            const activeTabId = 'tab-2';
            const onRemove = jest.fn();

            renderWithProviders(
                <Tabs
                    tabs={currentTabs}
                    activeTabId={activeTabId}
                    onRemove={onRemove}
                    onTabChange={() => {
                    }}
                />,
            );

            expectTabWithTabIndexToBeRendered(1);
            expectTabWithTabIndexToNotBeRendered(0);
            expectTabWithTabIndexToNotBeRendered(2);

            await user.click(screen.getByTestId('tab-2-delete'));

            expect(onRemove).toHaveBeenCalledTimes(1);
            expect(onRemove).toHaveBeenCalledWith('tab-2');
        });
    });

    describe('uncontrolled mode', () => {
        it('renders with defaultSelectedId', () => {
            const tabs = makeTabsWithContent(3);

            renderWithProviders(
                <Tabs tabs={tabs} defaultSelectedId="tab-2" />,
            );

            expect(screen.getByTestId('tab-2-button')).toHaveAttribute('aria-selected', 'true');
            expectTabWithTabIndexToBeRendered(1);
            expectTabWithTabIndexToNotBeRendered(0);
            expectTabWithTabIndexToNotBeRendered(2);
        });

        it('changes tab visually when tab is clicked', async () => {
            const user = userEvent.setup();
            const tabs = makeTabsWithContent(2);
            renderWithProviders(
                <Tabs tabs={tabs} defaultSelectedId="tab-1" />,
            );

            await user.click(screen.getByTestId('tab-2-button'));

            expect(screen.getByTestId('tab-2-button')).toHaveAttribute('aria-selected', 'true');
            expectTabWithTabIndexToBeRendered(1);
            expectTabWithTabIndexToNotBeRendered(0);
        });

        it('defaults to first tab if no defaultSelectedId', () => {
            const tabs = makeTabsWithContent(2);

            renderWithProviders(
                <Tabs tabs={tabs} />,
            );

            expect(screen.getByTestId('tab-1-button')).toHaveAttribute('aria-selected', 'true');
            expectTabWithTabIndexToBeRendered(0);
            expectTabWithTabIndexToNotBeRendered(1);
        });

        it('removes tab and selects next tab', async () => {
            const user = userEvent.setup();
            let tabs = makeTabsWithContent(3);
            const onRemove = jest.fn();
            const { rerender } = renderWithProviders(
                <Tabs tabs={tabs} defaultSelectedId="tab-2" onRemove={onRemove} />,
            );

            await user.click(screen.getByTestId('tab-2-delete'));
            tabs = tabs.filter((t) => t.id !== 'tab-2');
            rerender(<Tabs tabs={tabs} defaultSelectedId="tab-2" onRemove={onRemove} />);

            expectTabWithTabIndexToBeRendered(2);
            expectTabWithTabIndexToNotBeRendered(1);
        });

        it('calls onRemove when a tab is removed', async () => {
            const user = userEvent.setup();
            const currentTabs = makeTabsWithContent(3);
            const onRemove = jest.fn();
            renderWithProviders(
                <Tabs tabs={currentTabs} defaultSelectedId="tab-2" onRemove={onRemove} />,
            );

            expectTabWithTabIndexToBeRendered(1);
            expectTabWithTabIndexToNotBeRendered(0);
            expectTabWithTabIndexToNotBeRendered(2);

            await user.click(screen.getByTestId('tab-2-delete'));

            expect(onRemove).toHaveBeenCalledTimes(1);
            expect(onRemove).toHaveBeenCalledWith('tab-2');
        });

        it('tab panel should not change if onBeforeUnload cancels tab selection', async () => {
            const user = userEvent.setup();
            const tabs: Tab[] = makeTabsWithContent(2);
            tabs[0].onBeforeUnload = jest.fn().mockResolvedValue(false);
            renderWithProviders(<Tabs tabs={tabs} />);

            await user.click(screen.getByTestId('tab-2-button'));

            expectTabWithTabIndexToBeRendered(0);
            expectTabWithTabIndexToNotBeRendered(1);
        });

        it('tab panel should change if onBeforeUnload confirms tab selection', async () => {
            const user = userEvent.setup();
            const tabs: Tab[] = makeTabsWithContent(2);
            tabs[0].onBeforeUnload = jest.fn().mockResolvedValue(true);
            renderWithProviders(<Tabs tabs={tabs} />);

            await user.click(screen.getByTestId('tab-2-button'));

            expectTabWithTabIndexToBeRendered(1);
            expectTabWithTabIndexToNotBeRendered(0);
        });
    });

    describe('focus', () => {
        it('should go to the next tab-button when ArrowRight key is pressed on a tab-button', async () => {
            const user = userEvent.setup();
            const tabs = makeTabsWithContent(2);
            renderWithProviders(<Tabs tabs={tabs} />);
            const tab1 = screen.getByTestId('tab-1-button');
            const tab2 = screen.getByTestId('tab-2-button');

            tab1.focus();
            await user.keyboard('{ArrowRight}');

            expect(tab2).toHaveFocus();
        });

        it('should go to the first tab-button when ArrowRight key is pressed on last tab-button', async () => {
            const user = userEvent.setup();
            const tabs = makeTabsWithContent(3);
            renderWithProviders(<Tabs tabs={tabs} />);
            const tab1 = screen.getByTestId('tab-1-button');
            const tab3 = screen.getByTestId('tab-3-button');

            tab3.focus();
            await user.keyboard('{ArrowRight}');

            expect(tab1).toHaveFocus();
        });

        it('should go to the previous tab-button when ArrowLeft key is pressed on a tab-button', async () => {
            const user = userEvent.setup();
            const tabs = makeTabsWithContent(3);
            renderWithProviders(<Tabs tabs={tabs} />);
            const tab2 = screen.getByTestId('tab-2-button');
            const tab3 = screen.getByTestId('tab-3-button');

            tab3.focus();
            await user.keyboard('{ArrowLeft}');

            expect(tab2).toHaveFocus();
        });

        it('should go to the last tab-button when ArrowLeft key is pressed on first tab-button', async () => {
            const user = userEvent.setup();
            const tabs = makeTabsWithContent(3);
            renderWithProviders(<Tabs tabs={tabs} />);
            const tab1 = screen.getByTestId('tab-1-button');
            const tab3 = screen.getByTestId('tab-3-button');

            tab1.focus();
            await user.keyboard('{ArrowLeft}');

            expect(tab3).toHaveFocus();
        });

        it('should go to the selected tab-button when Tab key is pressed on a non-selected tab-button', async () => {
            const user = userEvent.setup();
            const tabs = makeTabsWithContent(3);
            renderWithProviders(<Tabs tabs={tabs} />);
            const tab2 = screen.getByTestId('tab-2-button');
            const tab3 = screen.getByTestId('tab-3-button');

            await user.click(tab2);
            tab3.focus();
            await user.keyboard('{Tab}');

            expect(tab2).toHaveFocus();
        });

        it('should go to the first tab-button when Home key is pressed on a tab-button', async () => {
            const user = userEvent.setup();
            const tabs = makeTabsWithContent(3);
            renderWithProviders(<Tabs tabs={tabs} />);
            const tab1 = screen.getByTestId('tab-1-button');
            const tab3 = screen.getByTestId('tab-3-button');

            await user.click(tab3);
            await user.keyboard('{Home}');

            expect(tab1).toHaveFocus();
        });

        it('should go to the last tab-button when End key is pressed on a tab-button', async () => {
            const user = userEvent.setup();
            const tabs = makeTabsWithContent(3);
            renderWithProviders(<Tabs tabs={tabs} />);
            const tab1 = screen.getByTestId('tab-1-button');
            const tab3 = screen.getByTestId('tab-3-button');

            tab1.focus();
            await user.keyboard('{End}');

            expect(tab3).toHaveFocus();
        });
    });
});
