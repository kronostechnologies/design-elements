interface ConditionalId {
    id: string | undefined;
    include?: boolean;
}

export function useAriaConditionalIds(conditionalIds: ConditionalId[]): string | undefined {
    return conditionalIds
        .filter((conditionalId) => conditionalId.id && (conditionalId.include ?? true))
        .map((conditionalId) => conditionalId.id)
        .join(' ') || undefined;
}
