function extractNodes(eventTargets: EventTarget[]): Node[] {
    return eventTargets.filter((eventTarget): eventTarget is Node => eventTarget instanceof Node);
}

export function eventIsInside<T extends Event>(event: T, ...containers: (HTMLElement | null)[]): boolean {
    const composedNodes: Node[] = event.composed ? extractNodes(event.composedPath()) : [];

    return containers.filter(Boolean).some((container) => (
        container?.contains(event.target as Node)
        || (event.composed && composedNodes.some((composedNode) => container?.contains(composedNode)))
    ));
}
