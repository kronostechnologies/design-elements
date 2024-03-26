import { useMemo } from 'react';

interface ConditionalId {
    id: string | undefined;
    include?: boolean;
}

export interface AriaLabelsProps {
    inputId?: string;
    /** Mutually exclusive: label, aria-label, aria-labelledby */
    label?: string;
    /**
     * Aria label for the input (used when no visual label is present)
     */
    ariaLabel?: string;
    ariaLabelledBy?: string;
    hasHint?: boolean;
    isValid?: boolean;
    additonalAriaLabelledBy?: ConditionalId[];
    ariaDescribedBy?: string;
    additionalAriaDescribedBy?: ConditionalId[];
}

const processConditionalIds = (conditionalIds: ConditionalId[] = []): string | undefined => conditionalIds
    .filter(({ id, include }) => id && (include ?? true))
    .map(({ id }) => id!)
    .join(' ') || undefined;

export const useAriaLabels = ({
    inputId,
    label,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    additonalAriaLabelledBy,
    additionalAriaDescribedBy,
    hasHint,
    isValid,
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
        console.warn('Component is missing a label, aria-label, or aria-labelledby.');
    } if (labelCount > 1) {
        console.warn('Should not have more than one of label, aria-label, or aria-labelledby set.');
    }

    let processedLabel = label;
    let processedAriaLabel = ariaLabel;
    const processedAriaLabelledBy = processConditionalIds([
        { id: `${inputId}_label`, include: !!label },
        { id: ariaLabelledBy, include: !!ariaLabelledBy },
        ...additonalAriaLabelledBy ?? [],
    ]);
    const processedAriaDescribedBy = processConditionalIds([
        { id: `${inputId}_hint`, include: !!hasHint },
        { id: `${inputId}_invalid`, include: !isValid },
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
}, [
    label,
    ariaLabel, ariaLabelledBy,
    inputId,
    additonalAriaLabelledBy,
    hasHint,
    isValid,
    ariaDescribedBy,
    additionalAriaDescribedBy,
]);

export function useAriaConditionalIds(conditionalIds: ConditionalId[]): string | undefined {
    return conditionalIds
        .filter((conditionalId) => conditionalId.id && (conditionalId.include ?? true))
        .map((conditionalId) => conditionalId.id)
        .join(' ') || undefined;
}
