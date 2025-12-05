import { act, screen } from '@testing-library/react';
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

    test('matches snapshot', () => {
        const tabs: Tab[] = givenTabs(2);

        const { container } = renderWithProviders(<Tabs tabs={tabs} forceRenderTabPanels />);

        expect(container.firstChild).toMatchSnapshot();
    });

    test('has small styles', () => {
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

    test('matches snapshot (mobile)', () => {
        const tabs: Tab[] = givenTabs(2);

        const { container } = renderWithProviders(<Tabs tabs={tabs} forceRenderTabPanels />, 'mobile');

        expect(container.firstChild).toMatchSnapshot();
    });

    describe('controlled mode', () => {
        test('renders with activeTabId', () => {
            const tabs = makeTabsWithContent(3);

            renderWithProviders(
                <Tabs tabs={tabs} activeTabId="tab-2" onTabChange={jest.fn()} />,
            );

            expectTabWithTabIndexToBeRendered(1);
            expectTabWithTabIndexToNotBeRendered(0);
            expectTabWithTabIndexToNotBeRendered(2);
        });

        test('onTabChange is called when tab is clicked', () => {
            const tabs: Tab[] = givenTabs(2);
            const onTabChange = jest.fn();
            const { getByTestId } = renderWithProviders(
                <Tabs tabs={tabs} activeTabId="tab-1" onTabChange={onTabChange} />,
            );

            getByTestId('tab-2-button').click();

            expect(onTabChange).toHaveBeenCalledWith('tab-2');
        });

        test('does not change tab visually if activeTabId does not change', () => {
            const tabs: Tab[] = givenTabs(2);
            const { getByTestId, rerender } = renderWithProviders(
                <Tabs tabs={tabs} activeTabId="tab-1" />,
            );
            getByTestId('tab-2-button').click();

            expect(getByTestId('tab-1-button')).toHaveAttribute('aria-selected', 'true');
            expect(getByTestId('tab-2-button')).toHaveAttribute('aria-selected', 'false');

            rerender(<Tabs tabs={tabs} activeTabId="tab-2" />);
            expect(getByTestId('tab-2-button')).toHaveAttribute('aria-selected', 'true');
        });

        test('calls onRemove when a tab is removed', () => {
            const currentTabs = makeTabsWithContent(3);
            const activeTabId = 'tab-2';
            const onRemove = jest.fn();

            const { getByTestId } = renderWithProviders(
                <Tabs
                    tabs={currentTabs}
                    activeTabId={activeTabId}
                    onRemove={onRemove}
                    onTabChange={() => {}}
                />,
            );

            expectTabWithTabIndexToBeRendered(1);
            expectTabWithTabIndexToNotBeRendered(0);
            expectTabWithTabIndexToNotBeRendered(2);

            act(() => getByTestId('tab-2-delete').click());

            expect(onRemove).toHaveBeenCalledTimes(1);
            expect(onRemove).toHaveBeenCalledWith('tab-2');
        });
    });

    describe('uncontrolled mode', () => {
        test('renders with defaultSelectedId', () => {
            const tabs = makeTabsWithContent(3);

            const { getByTestId } = renderWithProviders(
                <Tabs tabs={tabs} defaultSelectedId="tab-2" />,
            );

            expect(getByTestId('tab-2-button')).toHaveAttribute('aria-selected', 'true');
            expectTabWithTabIndexToBeRendered(1);
            expectTabWithTabIndexToNotBeRendered(0);
            expectTabWithTabIndexToNotBeRendered(2);
        });

        test('changes tab visually when tab is clicked', () => {
            const tabs = makeTabsWithContent(2);
            const { getByTestId } = renderWithProviders(
                <Tabs tabs={tabs} defaultSelectedId="tab-1" />,
            );

            act(() => getByTestId('tab-2-button').click());

            expect(getByTestId('tab-2-button')).toHaveAttribute('aria-selected', 'true');
            expectTabWithTabIndexToBeRendered(1);
            expectTabWithTabIndexToNotBeRendered(0);
        });

        test('defaults to first tab if no defaultSelectedId', () => {
            const tabs = makeTabsWithContent(2);

            const { getByTestId } = renderWithProviders(
                <Tabs tabs={tabs} />,
            );

            expect(getByTestId('tab-1-button')).toHaveAttribute('aria-selected', 'true');
            expectTabWithTabIndexToBeRendered(0);
            expectTabWithTabIndexToNotBeRendered(1);
        });

        test('removes tab and selects next tab', async () => {
            let tabs = makeTabsWithContent(3);
            const onRemove = jest.fn();
            const { getByTestId, rerender } = renderWithProviders(
                <Tabs tabs={tabs} defaultSelectedId="tab-2" onRemove={onRemove} />,
            );

            act(() => getByTestId('tab-2-delete').click());
            tabs = tabs.filter((t) => t.id !== 'tab-2');
            rerender(<Tabs tabs={tabs} defaultSelectedId="tab-2" onRemove={onRemove} />);

            expectTabWithTabIndexToBeRendered(2);
            expectTabWithTabIndexToNotBeRendered(1);
        });

        test('calls onRemove when a tab is removed', () => {
            const currentTabs = makeTabsWithContent(3);
            const onRemove = jest.fn();
            const { getByTestId } = renderWithProviders(
                <Tabs tabs={currentTabs} defaultSelectedId="tab-2" onRemove={onRemove} />,
            );

            expectTabWithTabIndexToBeRendered(1);
            expectTabWithTabIndexToNotBeRendered(0);
            expectTabWithTabIndexToNotBeRendered(2);

            act(() => getByTestId('tab-2-delete').click());

            expect(onRemove).toHaveBeenCalledTimes(1);
            expect(onRemove).toHaveBeenCalledWith('tab-2');
        });
    });
});
