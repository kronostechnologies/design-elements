import { devConsole } from '../../../utils/dev-console';
import { joinStrings } from '../../../utils/string';
import { FieldSlotIds } from '../context';

export function getSlotId(hasSlot: boolean | undefined, fieldId: string, slotName: string): string | undefined {
    return hasSlot ? `${fieldId}_${slotName}` : undefined;
}

export function getSlotIds(
    fieldId: string,
    label?: boolean,
    hint?: boolean,
    invalid?: boolean,
): FieldSlotIds {
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
    { label }: FieldSlotIds,
    additionalLabelledby?: string,
): string | undefined {
    return joinStrings(label, additionalLabelledby);
}

export function getAriaDescribedby(
    { invalid, hint }: FieldSlotIds,
    additionalDescribedby?: string,
): string | undefined {
    return joinStrings(invalid, hint, additionalDescribedby);
}
