import { FunctionComponent, PropsWithChildren, useMemo } from 'react';
import styled from 'styled-components';
import { useId } from '../../../hooks/use-id';
import { useDeviceContext } from '../../device-context-provider/device-context-provider';
import { InvalidField } from '../feedbacks/invalid-field';
import { Label } from '../../label/label';
import { TooltipProps } from '../../tooltip/tooltip';
import { FormFieldContext, FormFieldControlProps } from '../form-field-context';
import { getAriaDescribedby, getAriaLabel, getAriaLabelledby, getSlotIds } from '../utils';

interface StyledDivProps {
    $hasLabel: boolean;
    $hasHint: boolean;
    $invalid: boolean;
    $noMargin?: boolean;
}

const StyledDiv = styled.div<StyledDivProps>`
    margin: ${({ $noMargin }) => ($noMargin ? '0' : '0 0 var(--spacing-3x)')};

    input,
    select,
    textarea {
        border-color: ${({ theme, $invalid }) => ($invalid ? theme.component['field-input-error-border-color'] : theme.component['field-input-border-color'])};
    }

    > :nth-child(${({ $hasLabel, $hasHint, $invalid }) => ($hasLabel ? 1 : 0) + ($hasHint ? 1 : 0) + ($invalid ? 1 : 0)}) {
        margin-bottom: var(--spacing-half);
    }
`;

const StyledHint = styled.span<{ isMobile: boolean }>`
    color: ${(props) => props.theme.component['field-hint-text-color']};
    display: block;
    font-size: ${({ isMobile }) => (isMobile ? '0.875rem' : '0.75rem')};
    font-weight: var(--font-normal);
    letter-spacing: 0.02rem;
    line-height: ${({ isMobile }) => (isMobile ? '1.5rem' : '1.25rem')};
`;

export interface FormFieldContainerProps extends FormFieldControlProps {
    className?: string;
    id?: string;
    noInvalidFieldIcon?: boolean;
    noMargin?: boolean;
    tooltip?: TooltipProps;
    label?: string;
    hint?: string;
    validationErrorMessage: string;
}

export const FormFieldContainer: FunctionComponent<PropsWithChildren<FormFieldContainerProps>> = ({
    id: providedId,
    ariaLabel: providedAriaLabel,
    ariaLabelledby: providedAriaLabelledby,
    ariaDescribedby: providedAriaDescribedby,
    children,
    className,
    disabled = false,
    hint,
    label,
    noInvalidFieldIcon,
    noMargin,
    required = false,
    tooltip,
    invalid = false,
    validationErrorMessage,
    ...props
}) => {
    const { isMobile } = useDeviceContext();
    const formId = useId(providedId);

    const slotIds = getSlotIds(formId, label, hint, (validationErrorMessage && invalid));
    const ariaLabel = getAriaLabel(label, providedAriaLabel, providedAriaLabelledby);
    const ariaLabelledby = getAriaLabelledby(slotIds, providedAriaLabelledby);
    const ariaDescribedby = getAriaDescribedby(slotIds, providedAriaDescribedby);

    const contextValues = useMemo(() => ({
        formId,
        ariaLabel,
        ariaLabelledby,
        ariaDescribedby,
        invalid,
        hint,
        required,
        disabled,
    }), [formId, ariaLabel, ariaLabelledby, ariaDescribedby, invalid, hint, required, disabled]);

    return (
        <FormFieldContext.Provider value={contextValues}>
            <StyledDiv
                className={className}
                $noMargin={noMargin}
                $hasLabel={!!label}
                $hasHint={!!hint}
                $invalid={invalid}
                {...props /* eslint-disable-line react/jsx-props-no-spreading */}
            >
                {label && (
                    <Label
                        id={slotIds.label}
                        forId={formId}
                        tooltip={tooltip}
                        required={required}
                    >
                        {label}
                    </Label>
                )}
                {hint && (
                    <StyledHint
                        id={slotIds.hint}
                        isMobile={isMobile}
                    >
                        {hint}
                    </StyledHint>
                )}
                {invalid && (
                    <InvalidField
                        controlId={slotIds.invalid}
                        feedbackMsg={validationErrorMessage}
                        noIcon={noInvalidFieldIcon}
                    />
                )}
                {children}
            </StyledDiv>
        </FormFieldContext.Provider>
    );
};
