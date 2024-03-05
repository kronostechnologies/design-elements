import { useMemo } from 'react';

interface ConditionalId {
    id: string | undefined;
    include?: boolean;
}

interface AriaLabelsProps {
    inputId: string;
    label?: string;
    ariaLabel?: string;
    ariaLabelledBy?: string;
    additonalAriaLabelledBy?: ConditionalId[];
    ariaDescribedBy?: string;
    additionalAriaDescribedBy?: ConditionalId[];
}

const processConditionalIds = (conditionalIds: ConditionalId[] = []): string | undefined => conditionalIds
    .filter(({ id, include }) => id && (include ?? true))
    .map(({ id }) => id!)
    .join(' ') || undefined;

export const useAriaLabels = ({
    inputId, label, ariaLabel, ariaLabelledBy, ariaDescribedBy, additonalAriaLabelledBy, additionalAriaDescribedBy,
}: AriaLabelsProps): {
    processedLabels: {
        label: string | undefined;
        ariaLabel: string | undefined;
        ariaLabelledBy: string | undefined;
        ariaDescribedBy: string | undefined;
    }
} => useMemo(() => {
    const labelCount = [!!label, !!ariaLabel, !!ariaLabelledBy].filter(Boolean).length;
    if (labelCount === 0) {
        throw new Error('Component is missing a label, aria-label, or aria-labelledby.');
    } if (labelCount > 1) {
        throw new Error('Should not have more than one of label, aria-label, or aria-labelledby set.');
    }

    let processedLabel = label;
    let processedAriaLabel = ariaLabel;
    const processedAriaLabelledBy = processConditionalIds([
        { id: ariaLabelledBy, include: !!ariaLabelledBy },
        { id: `${inputId}_label`, include: !!label },
        ...additonalAriaLabelledBy ?? [],
    ]);
    const processedAriaDescribedBy = processConditionalIds([
        { id: ariaDescribedBy, include: !!ariaDescribedBy },
        ...additionalAriaDescribedBy ?? [],
    ]);

    if (label && !ariaLabel) {
        processedAriaLabel = processedLabel;
    } else if (ariaLabel && !label) {
        processedLabel = processedAriaLabelledBy;
    }

    return {
        processedLabels: {
            label: processedLabel,
            ariaLabel: processedAriaLabel,
            ariaLabelledBy: processedAriaLabelledBy,
            ariaDescribedBy: processedAriaDescribedBy,
        },
    };
}, [label, ariaLabel, ariaLabelledBy, inputId, additonalAriaLabelledBy, ariaDescribedBy, additionalAriaDescribedBy]);

export function useAriaConditionalIds(conditionalIds: ConditionalId[]): string | undefined {
    return conditionalIds
        .filter((conditionalId) => conditionalId.id && (conditionalId.include ?? true))
        .map((conditionalId) => conditionalId.id)
        .join(' ') || undefined;
}
