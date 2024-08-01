import { ReactNode } from 'react';
import { devConsole } from '../../utils/dev-console';
import { joinStrings } from '../../utils/string';

interface FieldIds {
    label?: string;
    hint?: string;
    invalid?: string;
}

export function getSlotId(prop: ReactNode, fieldId: string, propName: string): string | undefined {
    return prop ? `${fieldId}_${propName}` : undefined;
}

export function getSlotIds(
    fieldId: string,
    label?: ReactNode,
    hint?: ReactNode,
    invalid?: ReactNode,
): FieldIds {
    return {
        label: getSlotId(label, fieldId, 'label'),
        hint: getSlotId(hint, fieldId, 'hint'),
        invalid: getSlotId(invalid, fieldId, 'invalid'),
    };
}

export const ARIA_LABEL_WARNING = ''
    + 'label, aria-label and aria-labelledby are mutually exclusive properties. Only one should be provided.';

export const validateAriaLabels = (
    label?: string,
    ariaLabel?: string,
    ariaLabelledby?: string,
): boolean => {
    const labelCount = [!!label, !!ariaLabel, !!ariaLabelledby].filter(Boolean).length;
    if (labelCount === 0 || labelCount > 1) {
        devConsole.warn(ARIA_LABEL_WARNING);
        return false;
    }
    return true;
};

export function getAriaLabel(
    label?: string,
    ariaLabel?: string,
    ariaLabelledby?: string,
): string | undefined {
    return validateAriaLabels(label, ariaLabel, ariaLabelledby) ? ariaLabel : undefined;
}

export function getAriaLabelledby(
    { label }: FieldIds,
    additionalLabelledby?: string,
): string | undefined {
    return joinStrings(label, additionalLabelledby);
}

export function getAriaDescribedby(
    { invalid, hint }: FieldIds,
    additionalDescribedby?: string,
): string | undefined {
    return joinStrings(invalid, hint, additionalDescribedby);
}
