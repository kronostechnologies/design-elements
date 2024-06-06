import { ReactNode } from 'react';
import { devConsole } from '../../utils/dev-console';
import { joinStrings } from '../../utils/string';

interface FormFieldIds {
    label?: string;
    hint?: string;
    invalid?: string;
}

export function getSlotId(prop: ReactNode, formFieldId: string, propName: string): string | undefined {
    return prop ? `${formFieldId}_${propName}` : undefined;
}

export function getSlotIds(
    formFieldId: string,
    label?: ReactNode,
    hint?: ReactNode,
    invalid?: ReactNode,
): FormFieldIds {
    return {
        label: getSlotId(label, formFieldId, 'label'),
        hint: getSlotId(hint, formFieldId, 'hint'),
        invalid: getSlotId(invalid, formFieldId, 'invalid'),
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
    { label }: FormFieldIds,
    additionalLabelledby?: string,
): string | undefined {
    return joinStrings(label, additionalLabelledby);
}

export function getAriaDescribedby(
    { invalid, hint }: FormFieldIds,
    additionalDescribedby?: string,
): string | undefined {
    return joinStrings(invalid, hint, additionalDescribedby);
}
