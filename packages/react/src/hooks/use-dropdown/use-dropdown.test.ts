import { act, renderHook, type RenderHookResult, waitFor } from '@testing-library/react';
import { useDropdown, type UseDropdownResponse } from './use-dropdown';

const VIEWPORT_WIDTH = 1000;
const VIEWPORT_HEIGHT = 800;

function box(top: number, height: number, width = 100): DOMRect {
    return {
        top,
        height,
        width,
        left: 0,
        x: 0,
        y: top,
        right: width,
        bottom: top + height,
        toJSON: () => ({}),
    };
}

// The page's scroll container, below a 64px-high header.
const pageContainer = box(64, VIEWPORT_HEIGHT - 64, VIEWPORT_WIDTH);
const PAGE_SCROLL_HEIGHT = 2000;

interface Layout {
    container: DOMRect;
    containerScrollHeight: number;
    reference: DOMRect;
    floating: DOMRect;
}

// jsdom lays nothing out: give the viewport and each element a size and a position.
function mockLayout(layout: Layout): void {
    const boxes: Record<string, DOMRect | undefined> = {
        container: layout.container,
        reference: layout.reference,
        floating: layout.floating,
    };
    const boxOf = (element: Element): DOMRect | undefined => boxes[element.getAttribute('data-testid') ?? ''];

    jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function getBoundingClientRect(
        this: Element,
    ) {
        return boxOf(this) ?? box(0, 0, 0);
    });
    jest.spyOn(Element.prototype, 'clientWidth', 'get').mockImplementation(function clientWidth(this: Element) {
        return this === document.documentElement ? VIEWPORT_WIDTH : boxOf(this)?.width ?? 0;
    });
    jest.spyOn(Element.prototype, 'clientHeight', 'get').mockImplementation(function clientHeight(this: Element) {
        return this === document.documentElement ? VIEWPORT_HEIGHT : boxOf(this)?.height ?? 0;
    });
    jest.spyOn(Element.prototype, 'scrollHeight', 'get').mockImplementation(function scrollHeight(this: Element) {
        return this.getAttribute('data-testid') === 'container' ? layout.containerScrollHeight : 0;
    });
    jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockImplementation(function offsetWidth(
        this: HTMLElement,
    ) {
        return boxOf(this)?.width ?? 0;
    });
    jest.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockImplementation(function offsetHeight(
        this: HTMLElement,
    ) {
        return boxOf(this)?.height ?? 0;
    });
}

function createElement(testId: string): HTMLDivElement {
    const element = document.createElement('div');
    element.setAttribute('data-testid', testId);
    return element;
}

interface OpenDropdown {
    floating: HTMLElement;
    result: RenderHookResult<UseDropdownResponse<HTMLElement>, unknown>['result'];
}

function renderOpenDropdown(): OpenDropdown {
    const container = createElement('container');
    container.style.overflowY = 'auto';
    const reference = createElement('reference');
    const floating = createElement('floating');
    floating.style.position = 'absolute';
    container.append(reference);
    document.body.append(container, floating);

    const { result } = renderHook(() => useDropdown<HTMLElement>({ open: true }));
    act(() => {
        result.current.refs.setReference(reference);
        result.current.refs.setFloating(floating);
    });

    return { floating, result };
}

describe('useDropdown', () => {
    afterEach(() => {
        jest.restoreAllMocks();
        document.body.replaceChildren();
    });

    it('hides the dropdown when the reference has scrolled out of its container', async () => {
        mockLayout({
            container: pageContainer,
            containerScrollHeight: PAGE_SCROLL_HEIGHT,
            reference: box(20, 40),
            floating: box(0, 100),
        });

        const { floating } = renderOpenDropdown();

        await waitFor(() => expect(floating).toHaveStyle({ visibility: 'hidden' }));
    });

    it('shows the dropdown below the reference when the reference is within its container', async () => {
        mockLayout({
            container: pageContainer,
            containerScrollHeight: PAGE_SCROLL_HEIGHT,
            reference: box(100, 40),
            floating: box(0, 100),
        });

        const { floating, result } = renderOpenDropdown();

        await waitFor(() => expect(result.current.y).toBe(142));
        expect(floating).toBeVisible();
    });

    it('shows the dropdown when nothing is laid out', async () => {
        const { floating, result } = renderOpenDropdown();

        await waitFor(() => expect(result.current.y).toBe(2));
        expect(floating).toBeVisible();
    });

    it('opens above the reference when only that side fits within its scroll container', async () => {
        mockLayout({
            container: pageContainer,
            containerScrollHeight: PAGE_SCROLL_HEIGHT,
            reference: box(600, 40),
            floating: box(0, 200),
        });

        const { result } = renderOpenDropdown();

        await waitFor(() => expect(result.current.y).toBe(398));
    });

    it('stays below the reference rather than cover what lies above its scroll container', async () => {
        mockLayout({
            container: pageContainer,
            containerScrollHeight: PAGE_SCROLL_HEIGHT,
            reference: box(420, 40),
            floating: box(0, 400),
        });

        const { result } = renderOpenDropdown();

        await waitFor(() => expect(result.current.y).toBe(462));
    });

    it('opens above the reference when it fits within the viewport and its container does not scroll', async () => {
        const section = box(500, 120, VIEWPORT_WIDTH);
        mockLayout({
            container: section,
            containerScrollHeight: section.height,
            reference: box(560, 40),
            floating: box(0, 210),
        });

        const { result } = renderOpenDropdown();

        await waitFor(() => expect(result.current.y).toBe(348));
    });
});
