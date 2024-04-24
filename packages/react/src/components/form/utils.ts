import { devConsole } from '../../utils/dev-console';

interface FormFieldIds {
    label?: string;
    hint?: string;
    invalid?: string;
}

function makeSlotId(prop: React.ReactNode, formFieldId: string, propName: string): string | undefined {
    if (!prop) {
        return undefined;
    }

    return `${formFieldId}_${propName}`;
}

export function getSlotIds(
    formFieldId: string,
    label?: React.ReactNode,
    hint?: React.ReactNode,
    invalid?: React.ReactNode,
): FormFieldIds {
    return {
        label: makeSlotId(label, formFieldId, 'label'),
        hint: makeSlotId(hint, formFieldId, 'hint'),
        invalid: makeSlotId(invalid, formFieldId, 'invalid'),
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

export function joinStrings(...strings: Array<string | undefined>): string | undefined {
    const filteredStrings = strings.filter(Boolean);
    return filteredStrings.length > 0 ? filteredStrings.join(' ') : undefined;
}

export function getAriaLabel(
    label?: string,
    ariaLabel?: string,
    ariaLabelledby?: string,
): string | undefined {
    return validateAriaLabels(label, ariaLabel, ariaLabelledby) ? ariaLabel : undefined;
}

export function getAriaLabelledBy(
    { label }: FormFieldIds,
    additionalLabelledBy?: string,
): string | undefined {
    return joinStrings(label, additionalLabelledBy);
}

export function getAriaDescribedBy(
    { invalid, hint }: FormFieldIds,
    additionalDescribedBy?: string,
): string | undefined {
    return joinStrings(invalid, hint, additionalDescribedBy);
}
