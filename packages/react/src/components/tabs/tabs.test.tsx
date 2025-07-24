import { act } from '@testing-library/react';
import { AllProviders, renderWithProviders } from '../../test-utils/renderer';
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
            const tabs: Tab[] = givenTabs(3);

            const { getByTestId } = renderWithProviders(
                <Tabs tabs={tabs} activeTabId="tab-2" forceRenderTabPanels />,
            );

            expect(getByTestId('tab-2-button')).toHaveAttribute('aria-selected', 'true');
            expect(document.getElementById('tab-2-panel')).toHaveAttribute('aria-hidden', 'false');
            expect(document.getElementById('tab-1-panel')).toHaveAttribute('aria-hidden', 'true');
            expect(document.getElementById('tab-3-panel')).toHaveAttribute('aria-hidden', 'true');
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

            rerender(
                <AllProviders>
                    <Tabs tabs={tabs} activeTabId="tab-2" />
                </AllProviders>,
            );
            expect(getByTestId('tab-2-button')).toHaveAttribute('aria-selected', 'true');
        });
    });

    describe('uncontrolled mode', () => {
        test('renders with defaultSelectedId', () => {
            const tabs: Tab[] = givenTabs(3);

            const { getByTestId } = renderWithProviders(
                <Tabs tabs={tabs} defaultSelectedId="tab-2" forceRenderTabPanels />,
            );

            expect(getByTestId('tab-2-button')).toHaveAttribute('aria-selected', 'true');
            expect(document.getElementById('tab-2-panel')).toHaveAttribute('aria-hidden', 'false');
            expect(document.getElementById('tab-1-panel')).toHaveAttribute('aria-hidden', 'true');
            expect(document.getElementById('tab-3-panel')).toHaveAttribute('aria-hidden', 'true');
        });

        test('changes tab visually when tab is clicked', () => {
            const tabs: Tab[] = givenTabs(2);

            const { getByTestId } = renderWithProviders(
                <Tabs tabs={tabs} defaultSelectedId="tab-1" forceRenderTabPanels />,
            );
            act(() => getByTestId('tab-2-button').click());

            expect(getByTestId('tab-2-button')).toHaveAttribute('aria-selected', 'true');
            expect(document.getElementById('tab-2-panel')).toHaveAttribute('aria-hidden', 'false');
            expect(document.getElementById('tab-1-panel')).toHaveAttribute('aria-hidden', 'true');
        });

        test('defaults to first tab if no defaultSelectedId', () => {
            const tabs: Tab[] = givenTabs(2);

            const { getByTestId } = renderWithProviders(
                <Tabs tabs={tabs} forceRenderTabPanels />,
            );

            expect(getByTestId('tab-1-button')).toHaveAttribute('aria-selected', 'true');
            expect(document.getElementById('tab-1-panel')).toHaveAttribute('aria-hidden', 'false');
            expect(document.getElementById('tab-2-panel')).toHaveAttribute('aria-hidden', 'true');
        });

        test('removes tab and selects next tab', async () => {
            const tabs: Tab[] = givenTabs(3);
            const onRemove = jest.fn();
            const { getByTestId, rerender } = renderWithProviders(
                <Tabs tabs={tabs} defaultSelectedId="tab-2" onRemove={onRemove} forceRenderTabPanels />,
            );

            act(() => getByTestId('tab-2-delete').click());
            const newTabs = tabs.filter((t: Tab) => t.id !== 'tab-2');
            rerender(
                <AllProviders>
                    <Tabs tabs={newTabs} defaultSelectedId="tab-2" onRemove={onRemove} forceRenderTabPanels />
                </AllProviders>,
            );

            expect(document.getElementById('tab-3')).toHaveAttribute('aria-selected', 'true');
            expect(document.getElementById('tab-3-panel')).toHaveAttribute('aria-hidden', 'false');
            expect(document.getElementById('tab-2-panel')).toBeNull();
        });
    });
});
