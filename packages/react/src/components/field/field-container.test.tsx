import { renderWithProviders } from '../../test-utils/renderer';
import { devConsole } from '../../utils/dev-console';
import { Input } from '../text-input/styles/inputs';
import {
    ARIA_LABEL_WARNING,
    getAriaDescribedby,
    getAriaLabel,
    getAriaLabelledby,
    getSlotId,
    getSlotIds,
    validateAriaLabels,
} from './utils';
import { FieldContainer } from './field-container';

describe('Field Container', () => {
    describe('Styling', () => {
        const defaultProps = {
            id: 'id',
            validationErrorMessage: 'This text area input is invalid',
        };

        test('matches default snapshot', () => {
            const tree = renderWithProviders(
                <FieldContainer {...defaultProps}>
                    Children
                </FieldContainer>,
            );

            expect(tree).toMatchSnapshot();
        });

        test('matches invalid snapshot', () => {
            const tree = renderWithProviders(
                <FieldContainer {...defaultProps} valid={false}>
                    Children
                </FieldContainer>,
            );

            expect(tree).toMatchSnapshot();
        });

        test('match noMargin snapshot', () => {
            const tree = renderWithProviders(
                <FieldContainer noMargin {...defaultProps}>
                    Children
                </FieldContainer>,
            );

            expect(tree).toMatchSnapshot();
        });
    });

    describe('Accessibility', () => {
        const label = 'This is a label.';
        const ariaLabel = 'This is a ariaLabel.';
        const providedId = 'id';
        const hint = 'This is a hint.';
        const invalidMessage = 'This is invalid.';
        const additionalElementId = 'idAdditionalElement';

        test('should log if one of label props is missing', () => {
            const consoleSpy = jest.spyOn(devConsole, 'warn');
            consoleSpy.mockImplementation(() => {});
            const wrapper = renderWithProviders(
                <FieldContainer id={providedId} validationErrorMessage={invalidMessage}>
                    <Input />
                </FieldContainer>,
            );

            const inputWrapper = wrapper.find('input');
            expect(inputWrapper.prop('aria-label')).toBe(undefined);
            expect(inputWrapper.prop('aria-labelledby')).toBe(undefined);
            expect(inputWrapper.prop('aria-describedby')).toBe(undefined);
            expect(consoleSpy).toHaveBeenCalledTimes(1);
            expect(consoleSpy).toHaveBeenCalledWith(ARIA_LABEL_WARNING);
            consoleSpy.mockRestore();
        });

        test('should log if more than one label props is provided', () => {
            const consoleSpy = jest.spyOn(devConsole, 'warn');
            consoleSpy.mockImplementation(() => {});
            const wrapper = renderWithProviders(
                <FieldContainer
                    ariaLabel={ariaLabel}
                    ariaLabelledby={additionalElementId}
                    ariaDescribedby={additionalElementId}
                    label={label}
                    id={providedId}
                    hint={hint}
                    validationErrorMessage={invalidMessage}
                >
                    <Input />
                </FieldContainer>,
            );

            const inputWrapper = wrapper.find('input');
            expect(inputWrapper.prop('aria-label')).toBe(undefined);
            expect(inputWrapper.prop('aria-labelledby')).toBe(`${providedId}_label ${additionalElementId}`);
            expect(inputWrapper.prop('aria-describedby')).toBe(`${providedId}_hint ${additionalElementId}`);
            expect(consoleSpy).toHaveBeenCalledTimes(1);
            expect(consoleSpy).toHaveBeenCalledWith(ARIA_LABEL_WARNING);
            consoleSpy.mockRestore();
        });

        test('should override parent label props if provided to child input', () => {
            const consoleSpy = jest.spyOn(devConsole, 'warn');
            consoleSpy.mockImplementation(() => {});
            const wrapper = renderWithProviders(
                <FieldContainer
                    ariaLabel={`${ariaLabel}_Parent`}
                    ariaLabelledby={`${additionalElementId}_Parent`}
                    ariaDescribedby={`${additionalElementId}_Parent`}
                    label={label}
                    id={providedId}
                    hint={hint}
                    validationErrorMessage={invalidMessage}
                >
                    <Input
                        ariaLabel={`${ariaLabel}_Child`}
                        ariaLabelledby={`${additionalElementId}_Child`}
                        ariaDescribedby={`${additionalElementId}_Child`}
                    />
                </FieldContainer>,
            );

            const inputWrapper = wrapper.find('input');
            expect(inputWrapper.prop('aria-label')).toBe(`${ariaLabel}_Child`);
            expect(inputWrapper.prop('aria-labelledby')).toBe(undefined);
            expect(inputWrapper.prop('aria-describedby')).toBe(`${additionalElementId}_Child`);
            expect(consoleSpy).toHaveBeenCalledTimes(1);
            expect(consoleSpy).toHaveBeenCalledWith(ARIA_LABEL_WARNING);
            consoleSpy.mockRestore();
        });

        describe('aria-label', () => {
            test('should log when both label and ariaLabel are provided', () => {
                const consoleSpy = jest.spyOn(devConsole, 'warn');
                consoleSpy.mockImplementation(() => {});
                const wrapper = renderWithProviders(
                    <FieldContainer
                        ariaLabel={ariaLabel}
                        label={label}
                        id={providedId}
                        validationErrorMessage={invalidMessage}
                    >
                        <Input />
                    </FieldContainer>,
                );

                const inputWrapper = wrapper.find('input');
                expect(inputWrapper.prop('aria-label')).toBe(undefined);
                expect(inputWrapper.prop('aria-labelledby')).toBe(`${providedId}_label`);
                expect(inputWrapper.prop('aria-describedby')).toBe(undefined);
                expect(consoleSpy).toHaveBeenCalledTimes(1);
                expect(consoleSpy).toHaveBeenCalledWith(ARIA_LABEL_WARNING);
                consoleSpy.mockRestore();
            });
        });

        describe('aria-labelledby', () => {
            test('should contain idLabel when label provided', () => {
                const consoleSpy = jest.spyOn(devConsole, 'warn');
                consoleSpy.mockImplementation(() => {});
                const wrapper = renderWithProviders(
                    <FieldContainer label={label} id={providedId} validationErrorMessage={invalidMessage}>
                        <Input />
                    </FieldContainer>,
                );

                const inputWrapper = wrapper.find('input');
                expect(inputWrapper.prop('aria-label')).toBe(undefined);
                expect(inputWrapper.prop('aria-labelledby')).toBe(`${providedId}_label`);
                expect(inputWrapper.prop('aria-describedby')).toBe(undefined);
                expect(consoleSpy).toHaveBeenCalledTimes(0);
                consoleSpy.mockRestore();
            });

            test('should contain idAdditionalElement when ariaLabelledby provided', () => {
                const consoleSpy = jest.spyOn(devConsole, 'warn');
                consoleSpy.mockImplementation(() => {});
                const wrapper = renderWithProviders(
                    <FieldContainer
                        id={providedId}
                        validationErrorMessage=""
                        ariaLabelledby={additionalElementId}
                    >
                        <Input />
                    </FieldContainer>,
                );

                const inputWrapper = wrapper.find('input');
                expect(inputWrapper.prop('aria-label')).toBe(undefined);
                expect(inputWrapper.prop('aria-labelledby')).toBe(`${additionalElementId}`);
                expect(inputWrapper.prop('aria-describedby')).toBe(undefined);
                expect(consoleSpy).toHaveBeenCalledTimes(0);
                consoleSpy.mockRestore();
            });
        });

        describe('aria-describedby', () => {
            test('should contain idHint when hint provided', () => {
                const consoleSpy = jest.spyOn(devConsole, 'warn');
                consoleSpy.mockImplementation(() => {});
                const wrapper = renderWithProviders(
                    <FieldContainer label={label} hint={hint} id={providedId} validationErrorMessage="">
                        <Input />
                    </FieldContainer>,
                );

                const inputWrapper = wrapper.find('input');
                expect(inputWrapper.prop('aria-label')).toBe(undefined);
                expect(inputWrapper.prop('aria-labelledby')).toBe(`${providedId}_label`);
                expect(inputWrapper.prop('aria-describedby')).toBe(`${providedId}_hint`);
                expect(consoleSpy).toHaveBeenCalledTimes(0);
                consoleSpy.mockRestore();
            });

            test('shouldn\'t contain idInvalid when FormContainer is valid', () => {
                const consoleSpy = jest.spyOn(devConsole, 'warn');
                consoleSpy.mockImplementation(() => {});
                const wrapper = renderWithProviders(
                    <FieldContainer label={label} id={providedId} validationErrorMessage={invalidMessage}>
                        <Input />
                    </FieldContainer>,
                );

                const inputWrapper = wrapper.find('input');
                expect(inputWrapper.prop('aria-label')).toBe(undefined);
                expect(inputWrapper.prop('aria-labelledby')).toBe(`${providedId}_label`);
                expect(inputWrapper.prop('aria-describedby')).toBe(undefined);
                expect(consoleSpy).toHaveBeenCalledTimes(0);
                consoleSpy.mockRestore();
            });

            test('should contain idInvalid when FormContainer is invalid', () => {
                const consoleSpy = jest.spyOn(devConsole, 'warn');
                consoleSpy.mockImplementation(() => {});
                const wrapper = renderWithProviders(
                    <FieldContainer
                        label={label}
                        id={providedId}
                        valid={false}
                        validationErrorMessage={invalidMessage}
                    >
                        <Input />
                    </FieldContainer>,
                );

                const inputWrapper = wrapper.find('input');
                expect(inputWrapper.prop('aria-label')).toBe(undefined);
                expect(inputWrapper.prop('aria-labelledby')).toBe(`${providedId}_label`);
                expect(inputWrapper.prop('aria-describedby')).toBe(`${providedId}_invalid`);
                expect(consoleSpy).toHaveBeenCalledTimes(0);
                consoleSpy.mockRestore();
            });

            test('should contain idAdditionalElement when ariaDescribedBy provided', () => {
                const consoleSpy = jest.spyOn(devConsole, 'warn');
                consoleSpy.mockImplementation(() => {});
                const wrapper = renderWithProviders(
                    <FieldContainer
                        label={label}
                        id={providedId}
                        hint={hint}
                        validationErrorMessage=""
                        ariaDescribedby={additionalElementId}
                    >
                        <Input />
                    </FieldContainer>,
                );

                const inputWrapper = wrapper.find('input');
                expect(inputWrapper.prop('aria-label')).toBe(undefined);
                expect(inputWrapper.prop('aria-labelledby')).toBe(`${providedId}_label`);
                expect(inputWrapper.prop('aria-describedby')).toBe(`${providedId}_hint ${additionalElementId}`);
                expect(consoleSpy).toHaveBeenCalledTimes(0);
                consoleSpy.mockRestore();
            });
        });

        describe('aria-invalid', () => {
            test('should be true when Formfield is invalid', () => {
                const wrapper = renderWithProviders(
                    <FieldContainer
                        label={label}
                        hint={hint}
                        id={providedId}
                        valid
                        validationErrorMessage=""
                    >
                        <Input />
                    </FieldContainer>,
                );

                const inputWrapper = wrapper.find('input');
                expect(inputWrapper.prop('aria-invalid')).toBe('true');
            });
        });

        describe('aria-required', () => {
            test('should be true when Formfield is required', () => {
                const wrapper = renderWithProviders(
                    <FieldContainer label={label} hint={hint} id={providedId} required validationErrorMessage="">
                        <Input />
                    </FieldContainer>,
                );

                const inputWrapper = wrapper.find('input');
                expect(inputWrapper.prop('aria-required')).toBe('true');
            });
        });

        describe('aria-disabled', () => {
            test('should be true when FormContainer is disabled', () => {
                const wrapper = renderWithProviders(
                    <FieldContainer label={label} hint={hint} id={providedId} disabled validationErrorMessage="">
                        <Input />
                    </FieldContainer>,
                );

                const inputWrapper = wrapper.find('input');
                expect(inputWrapper.prop('aria-disabled')).toBe('true');
            });
        });
    });

    describe('Utils', () => {
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
                expect(getSlotId('prop', 'formFieldId', 'propName')).toEqual('formFieldId_propName');
            });

            it('returns undefined when prop is not provided', () => {
                expect(getSlotId(undefined, 'formFieldId', 'propName')).toBeUndefined();
            });
        });

        describe('getSlotIds', () => {
            it('returns an object with label, hint, and invalid ids when all props are provided', () => {
                const result = getSlotIds('formFieldId', 'label', 'hint', 'invalid');
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
});
