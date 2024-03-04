import { useMemo } from 'react';

interface ConditionalId {
    id: string | undefined;
    include?: boolean;
}

interface UseAriaLabelsProps {
    label?: string;
    ariaLabel?: string;
    ariaLabelledBy?: string;
    ariaDescribedBy?: ConditionalId[];
}

export const useAriaLabels = (
    { label, ariaLabel, ariaLabelledBy }: UseAriaLabelsProps,
): {
    processedLabels: {
        label: string | undefined;
        ariaLabel: string | undefined;
        ariaLabelledBy: string | undefined;
    };
} => useMemo(() => {
    let processedLabel = label;
    let processedAriaLabel = ariaLabel;
    let processedAriaLabelledBy = ariaLabelledBy;

    const labelCount = [!!label, !!ariaLabel, !!ariaLabelledBy].filter(Boolean).length;
    if (labelCount === 0) {
        throw new Error('Component is missing a label, aria-label, or aria-labelledby.');
    } if (labelCount > 1) {
        throw new Error('Should not have more than one of label, aria-label, or aria-labelledby set.');
    }

    if (label) {
        processedAriaLabel = undefined;
        processedAriaLabelledBy = undefined;
    } else if (ariaLabel) {
        processedLabel = undefined;
        processedAriaLabelledBy = undefined;
    } else if (ariaLabelledBy) {
        processedLabel = undefined;
        processedAriaLabel = undefined;
    }

    return {
        processedLabels: {
            label: processedLabel,
            ariaLabel: processedAriaLabel,
            ariaLabelledBy: processedAriaLabelledBy,
        },
    };
}, [label, ariaLabel, ariaLabelledBy]);

export function useAriaConditionalIds(conditionalIds: ConditionalId[]): string | undefined {
    return conditionalIds
        .filter((conditionalId) => conditionalId.id && (conditionalId.include ?? true))
        .map((conditionalId) => conditionalId.id)
        .join(' ') || undefined;
}
