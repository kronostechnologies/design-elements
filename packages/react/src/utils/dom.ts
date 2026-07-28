export function getRootDocument(element: Element | null): DocumentOrShadowRoot | null {
    const rootNode: Node | undefined = element?.getRootNode();
    if (rootNode instanceof ShadowRoot || rootNode instanceof Document) {
        return rootNode;
    }

    return null;
}

export function getRootElement(shadowRoot: ShadowRoot | null): Element {
    if (shadowRoot) {
        return shadowRoot.getRootNode() as unknown as Element;
    }

    return document.body;
}

export function activeElementIsInside(element: HTMLElement | null): boolean {
    const focusedElement = getRootDocument(element)?.activeElement;
    return element?.contains(focusedElement || null) ?? false;
}

export function sanitizeId(id: string): string {
    return id.replace(/\s/g, '_');
}
