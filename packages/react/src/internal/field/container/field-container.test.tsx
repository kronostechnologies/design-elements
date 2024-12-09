import { renderWithProviders } from '../../../test-utils/renderer';
import { devConsole } from '../../../utils/dev-console';
import { Input } from '../../input';
import { FieldContainerProps } from './types';
import {
    ARIA_LABEL_WARNING,
} from './utils';
import { FieldContainer } from './field-container';

describe('Field Container', () => {
    describe('Styling', () => {
        const props: FieldContainerProps = {
            fieldId: 'id',
            label: 'This is a label.',
            validationErrorMessage: 'This text area input is invalid',
            hint: 'This is a hint.',
        };

        test('matches default snapshot', () => {
            const tree = renderWithProviders(
                <FieldContainer {...props}>
                    Children
                </FieldContainer>,
            );

            expect(tree).toMatchSnapshot();
        });

        test('matches invalid snapshot', () => {
            const tree = renderWithProviders(
                <FieldContainer {...props} valid={false}>
                    Children
                </FieldContainer>,
            );

            expect(tree).toMatchSnapshot();
        });

        test('match required snapshot', () => {
            const tree = renderWithProviders(
                <FieldContainer {...props} required>
                    Children
                </FieldContainer>,
            );

            expect(tree).toMatchSnapshot();
        });

        test('match noMargin snapshot', () => {
            const tree = renderWithProviders(
                <FieldContainer noMargin {...props}>
                    Children
                </FieldContainer>,
            );

            expect(tree).toMatchSnapshot();
        });
    });

    describe('Accessibility', () => {
        let consoleSpy: jest.SpyInstance;
        beforeEach(() => {
            consoleSpy = jest.spyOn(devConsole, 'warn');
            consoleSpy.mockImplementation(() => ({}));
        });

        const label = 'This is a label.';
        const ariaLabel = 'This is a ariaLabel.';
        const providedId = 'id';
        const hint = 'This is a hint.';
        const invalidMessage = 'This is invalid.';
        const additionalElementId = 'idAdditionalElement';

        test('should log if one of label props is missing', () => {
            const wrapper = renderWithProviders(
                <FieldContainer fieldId={providedId} validationErrorMessage={invalidMessage}>
                    <Input />
                </FieldContainer>,
            );

            const inputWrapper = wrapper.find('input');
            expect(inputWrapper.prop('aria-label')).toBe(undefined);
            expect(inputWrapper.prop('aria-labelledby')).toBe(undefined);
            expect(inputWrapper.prop('aria-describedby')).toBe(undefined);
            expect(consoleSpy).toHaveBeenCalledTimes(1);
            expect(consoleSpy).toHaveBeenCalledWith(ARIA_LABEL_WARNING);
        });

        test('should log if more than one label props is provided', () => {
            const wrapper = renderWithProviders(
                <FieldContainer
                    ariaLabel={ariaLabel}
                    ariaLabelledby={additionalElementId}
                    ariaDescribedby={additionalElementId}
                    label={label}
                    fieldId={providedId}
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
        });

        test('should override parent label props if provided to child input', () => {
            const wrapper = renderWithProviders(
                <FieldContainer
                    ariaLabel={`${ariaLabel}_Parent`}
                    ariaLabelledby={`${additionalElementId}_Parent`}
                    ariaDescribedby={`${additionalElementId}_Parent`}
                    label={label}
                    fieldId={providedId}
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
        });

        describe('aria-label', () => {
            test('should log when both label and ariaLabel are provided', () => {
                const wrapper = renderWithProviders(
                    <FieldContainer
                        ariaLabel={ariaLabel}
                        label={label}
                        fieldId={providedId}
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
            });
        });

        describe('aria-labelledby', () => {
            test('should contain idLabel when label provided', () => {
                const wrapper = renderWithProviders(
                    <FieldContainer label={label} fieldId={providedId} validationErrorMessage={invalidMessage}>
                        <Input />
                    </FieldContainer>,
                );

                const inputWrapper = wrapper.find('input');
                expect(inputWrapper.prop('aria-label')).toBe(undefined);
                expect(inputWrapper.prop('aria-labelledby')).toBe(`${providedId}_label`);
                expect(inputWrapper.prop('aria-describedby')).toBe(undefined);
                expect(consoleSpy).toHaveBeenCalledTimes(0);
            });

            test('should contain idAdditionalElement when ariaLabelledby provided', () => {
                const wrapper = renderWithProviders(
                    <FieldContainer
                        fieldId={providedId}
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
            });
        });

        describe('aria-describedby', () => {
            test('should contain idHint when hint provided', () => {
                const wrapper = renderWithProviders(
                    <FieldContainer label={label} hint={hint} fieldId={providedId} validationErrorMessage="">
                        <Input />
                    </FieldContainer>,
                );

                const inputWrapper = wrapper.find('input');
                expect(inputWrapper.prop('aria-label')).toBe(undefined);
                expect(inputWrapper.prop('aria-labelledby')).toBe(`${providedId}_label`);
                expect(inputWrapper.prop('aria-describedby')).toBe(`${providedId}_hint`);
                expect(consoleSpy).toHaveBeenCalledTimes(0);
            });

            test('shouldn\'t contain idInvalid when FieldContainer is valid', () => {
                const wrapper = renderWithProviders(
                    <FieldContainer label={label} fieldId={providedId} validationErrorMessage={invalidMessage}>
                        <Input />
                    </FieldContainer>,
                );

                const inputWrapper = wrapper.find('input');
                expect(inputWrapper.prop('aria-label')).toBe(undefined);
                expect(inputWrapper.prop('aria-labelledby')).toBe(`${providedId}_label`);
                expect(inputWrapper.prop('aria-describedby')).toBe(undefined);
                expect(consoleSpy).toHaveBeenCalledTimes(0);
            });

            test('should contain idInvalid when FieldContainer is invalid', () => {
                const wrapper = renderWithProviders(
                    <FieldContainer
                        label={label}
                        fieldId={providedId}
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
            });

            test('should contain idAdditionalElement when ariaDescribedBy provided', () => {
                const wrapper = renderWithProviders(
                    <FieldContainer
                        label={label}
                        fieldId={providedId}
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
            });
        });

        describe('aria-invalid', () => {
            test('should be true when FieldContainer is invalid', () => {
                const wrapper = renderWithProviders(
                    <FieldContainer
                        label={label}
                        hint={hint}
                        fieldId={providedId}
                        valid={false}
                        validationErrorMessage=""
                    >
                        <Input />
                    </FieldContainer>,
                );

                const inputWrapper = wrapper.find('input');
                expect(inputWrapper.prop('aria-invalid')).toBe('true');
            });
        });

        describe('aria-disabled', () => {
            test('should be true when FieldContainer is disabled', () => {
                const wrapper = renderWithProviders(
                    <FieldContainer label={label} hint={hint} fieldId={providedId} disabled validationErrorMessage="">
                        <Input />
                    </FieldContainer>,
                );

                const inputWrapper = wrapper.find('input');
                expect(inputWrapper.prop('aria-disabled')).toBe('true');
            });
        });
    });
});
