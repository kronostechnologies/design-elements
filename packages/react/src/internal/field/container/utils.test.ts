import {
    getAriaDescribedby,
    getAriaLabel,
    getAriaLabelledby,
    getSlotId,
    getSlotIds,
    validateAriaLabels,
} from './utils';

describe('Field Container Utils', () => {
    describe('validateAriaLabels', () => {
        it('returns true when only one label is provided', () => {
            expect(validateAriaLabels('label')).toBe(true);
            expect(validateAriaLabels(undefined, 'ariaLabel')).toBe(true);
            expect(validateAriaLabels(undefined, undefined, 'ariaLabelledby')).toBe(true);
        });

        it('returns false when no labels are provided', () => {
            expect(validateAriaLabels()).toBe(false);
        });

        it('returns false when more than one label is provided', () => {
            expect(validateAriaLabels('label', 'ariaLabel')).toBe(false);
            expect(validateAriaLabels('label', undefined, 'ariaLabelledby')).toBe(false);
            expect(validateAriaLabels(undefined, 'ariaLabel', 'ariaLabelledby')).toBe(false);
        });
    });

    describe('getAriaLabel', () => {
        it('returns ariaLabel when labels are valid', () => {
            expect(getAriaLabel(undefined, 'ariaLabel', undefined)).toEqual('ariaLabel');
        });

        it('returns undefined when labels are not valid', () => {
            expect(getAriaLabel('label', 'ariaLabel', undefined)).toBeUndefined();
        });
    });

    describe('getAriaLabelledby', () => {
        it('joins label and additionalLabelledby with a space', () => {
            const output = getAriaLabelledby({ label: 'label' }, 'additionalLabelledby');
            expect(output).toEqual('label additionalLabelledby');
        });

        it('returns label when additionalLabelledby is undefined', () => {
            expect(getAriaLabelledby({ label: 'label' })).toEqual('label');
        });

        it('returns undefined when label and additionalLabelledby are undefined', () => {
            expect(getAriaLabelledby({})).toBeUndefined();
        });
    });

    describe('getAriaDescribedby', () => {
        it('joins invalid, hint and additionalDescribedby with a space', () => {
            const output = getAriaDescribedby({ invalid: 'invalid', hint: 'hint' }, 'additionalDescribedby');
            expect(output).toEqual('invalid hint additionalDescribedby');
        });

        it('returns invalid and hint when additionalDescribedby is undefined', () => {
            const output = getAriaDescribedby({ invalid: 'invalid', hint: 'hint' });
            expect(output).toEqual('invalid hint');
        });

        it('returns undefined when invalid, hint and additionalDescribedby are undefined', () => {
            expect(getAriaDescribedby({})).toBeUndefined();
        });
    });

    describe('getSlotId', () => {
        it('returns a string with formFieldId and propName when prop is provided', () => {
            expect(getSlotId(true, 'formFieldId', 'propName')).toEqual('formFieldId_propName');
        });

        it('returns undefined when prop is not provided', () => {
            expect(getSlotId(undefined, 'formFieldId', 'propName')).toBeUndefined();
        });
    });

    describe('getSlotIds', () => {
        it('returns an object with label, hint, and invalid ids when all props are provided', () => {
            const result = getSlotIds('formFieldId', true, true, true);
            expect(result).toEqual({
                label: 'formFieldId_label',
                hint: 'formFieldId_hint',
                invalid: 'formFieldId_invalid',
            });
        });

        it('returns an object with undefined ids when props are not provided', () => {
            const result = getSlotIds('formFieldId');
            expect(result).toEqual({
                label: undefined,
                hint: undefined,
                invalid: undefined,
            });
        });
    });
});
