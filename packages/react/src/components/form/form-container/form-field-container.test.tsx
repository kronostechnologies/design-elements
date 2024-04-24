import { renderWithProviders } from '../../../test-utils/renderer';
import { devConsole } from '../../../utils/dev-console';
import { Input } from '../../text-input/styles/inputs';
import { ARIA_LABEL_WARNING } from '../utils';
import { FormFieldContainer } from './form-field-container';

describe('Form Field Container', () => {
    describe('Styling', () => {
        const defaultProps = {
            id: 'id',
            validationErrorMessage: 'This text area input is invalid',
        };

        test('matches default snapshot', () => {
            const tree = renderWithProviders(
                <FormFieldContainer {...defaultProps}>
                    Children
                </FormFieldContainer>,
            );

            expect(tree).toMatchSnapshot();
        });

        test('matches invalid snapshot', () => {
            const tree = renderWithProviders(
                <FormFieldContainer {...defaultProps} valid={false}>
                    Children
                </FormFieldContainer>,
            );

            expect(tree).toMatchSnapshot();
        });

        test('match noMargin snapshot', () => {
            const tree = renderWithProviders(
                <FormFieldContainer noMargin {...defaultProps}>
                    Children
                </FormFieldContainer>,
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
                <FormFieldContainer id={providedId} validationErrorMessage={invalidMessage}>
                    <Input />
                </FormFieldContainer>,
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
                <FormFieldContainer
                    ariaLabel={ariaLabel}
                    ariaLabelledby={additionalElementId}
                    ariaDescribedby={additionalElementId}
                    label={label}
                    id={providedId}
                    hint={hint}
                    validationErrorMessage={invalidMessage}
                >
                    <Input />
                </FormFieldContainer>,
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
                <FormFieldContainer
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
                </FormFieldContainer>,
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
                    <FormFieldContainer
                        ariaLabel={ariaLabel}
                        label={label}
                        id={providedId}
                        validationErrorMessage={invalidMessage}
                    >
                        <Input />
                    </FormFieldContainer>,
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
                    <FormFieldContainer label={label} id={providedId} validationErrorMessage={invalidMessage}>
                        <Input />
                    </FormFieldContainer>,
                );

                const inputWrapper = wrapper.find('input');
                expect(inputWrapper.prop('aria-label')).toBe(undefined);
                expect(inputWrapper.prop('aria-labelledby')).toBe(`${providedId}_label`);
                expect(inputWrapper.prop('aria-describedby')).toBe(undefined);
                expect(consoleSpy).toHaveBeenCalledTimes(0);
                consoleSpy.mockRestore();
            });

            test('should contain idAdditionalElement when ariaLabelledBy provided', () => {
                const consoleSpy = jest.spyOn(devConsole, 'warn');
                consoleSpy.mockImplementation(() => {});
                const wrapper = renderWithProviders(
                    <FormFieldContainer
                        id={providedId}
                        validationErrorMessage=""
                        ariaLabelledby={additionalElementId}
                    >
                        <Input />
                    </FormFieldContainer>,
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
                    <FormFieldContainer label={label} hint={hint} id={providedId} validationErrorMessage="">
                        <Input />
                    </FormFieldContainer>,
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
                    <FormFieldContainer label={label} id={providedId} validationErrorMessage={invalidMessage}>
                        <Input />
                    </FormFieldContainer>,
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
                    <FormFieldContainer
                        label={label}
                        id={providedId}
                        valid={false}
                        validationErrorMessage={invalidMessage}
                    >
                        <Input />
                    </FormFieldContainer>,
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
                    <FormFieldContainer
                        label={label}
                        id={providedId}
                        hint={hint}
                        validationErrorMessage=""
                        ariaDescribedby={additionalElementId}
                    >
                        <Input />
                    </FormFieldContainer>,
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
                    <FormFieldContainer
                        label={label}
                        hint={hint}
                        id={providedId}
                        valid={false}
                        validationErrorMessage=""
                    >
                        <Input />
                    </FormFieldContainer>,
                );

                const inputWrapper = wrapper.find('input');
                expect(inputWrapper.prop('aria-invalid')).toBe('true');
            });
        });

        describe('aria-required', () => {
            test('should be true when Formfield is required', () => {
                const wrapper = renderWithProviders(
                    <FormFieldContainer label={label} hint={hint} id={providedId} required validationErrorMessage="">
                        <Input />
                    </FormFieldContainer>,
                );

                const inputWrapper = wrapper.find('input');
                expect(inputWrapper.prop('aria-required')).toBe('true');
            });
        });

        describe('aria-disabled', () => {
            test('should be true when FormContainer is disabled', () => {
                const wrapper = renderWithProviders(
                    <FormFieldContainer label={label} hint={hint} id={providedId} disabled validationErrorMessage="">
                        <Input />
                    </FormFieldContainer>,
                );

                const inputWrapper = wrapper.find('input');
                expect(inputWrapper.prop('aria-disabled')).toBe('true');
            });
        });
    });
});
