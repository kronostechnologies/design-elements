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
});
