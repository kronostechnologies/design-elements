import { FunctionComponent, PropsWithChildren, useMemo } from 'react';
import styled from 'styled-components';
import { useId } from '../../hooks/use-id';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { FieldControlContext, FieldControlProps } from './context';
import { InvalidFieldMessage } from './feedbacks/invalid-field-message';
import { Label } from '../label/label';
import { TooltipProps } from '../tooltip/tooltip';
import { getAriaDescribedby, getAriaLabel, getAriaLabelledby, getSlotIds } from './utils';

interface StyledDivProps {
    $hasLabel: boolean;
    $hasHint: boolean;
    $valid: boolean;
    $noMargin?: boolean;
}

const StyledDiv = styled.div<StyledDivProps>`
    margin: ${({ $noMargin }) => ($noMargin ? '0' : '0 0 var(--spacing-3x)')};

    input,
    select,
    textarea {
        border-color: ${({ theme, $valid }) => ($valid ? theme.component['field-input-border-color'] : theme.component['field-input-error-border-color'])};
    }

    > :nth-child(${({ $hasLabel, $hasHint, $valid }) => ($hasLabel ? 1 : 0) + ($hasHint ? 1 : 0) + (!$valid ? 1 : 0)}) {
        margin-bottom: var(--spacing-half);
    }
`;

const StyledHint = styled.span<{ $isMobile: boolean }>`
    color: ${(props) => props.theme.component['field-hint-text-color']};
    display: block;
    font-size: ${({ $isMobile }) => ($isMobile ? '0.875rem' : '0.75rem')};
    font-weight: var(--font-normal);
    letter-spacing: 0.02rem;
    line-height: ${({ $isMobile }) => ($isMobile ? '1.5rem' : '1.25rem')};
`;

export interface FieldContainerProps extends FieldControlProps {
    className?: string;
    noMargin?: boolean;
    tooltip?: TooltipProps;
    label?: string;
    hint?: string;
    noInvalidFieldIcon?: boolean;
    validationErrorMessage: string;
}

export const FieldContainer: FunctionComponent<PropsWithChildren<FieldContainerProps>> = ({
    id: providedId,
    ariaLabel: providedAriaLabel,
    ariaLabelledby: providedAriaLabelledby,
    ariaDescribedby: providedAriaDescribedby,
    children,
    className,
    disabled = false,
    hint,
    label,
    noInvalidFieldIcon = false,
    noMargin,
    required = false,
    tooltip,
    valid = true,
    validationErrorMessage,
    ...props
}) => {
    const { isMobile } = useDeviceContext();
    const fieldId = useId(providedId);

    const slotIds = getSlotIds(fieldId, label, hint, (validationErrorMessage && !valid));
    const ariaLabel = getAriaLabel(label, providedAriaLabel, providedAriaLabelledby);
    const ariaLabelledby = getAriaLabelledby(slotIds, providedAriaLabelledby);
    const ariaDescribedby = getAriaDescribedby(slotIds, providedAriaDescribedby);

    const contextValues = useMemo(() => ({
        id: fieldId,
        ariaLabel,
        ariaLabelledby,
        ariaDescribedby,
        valid,
        hint,
        required,
        disabled,
    }), [fieldId, ariaLabel, ariaLabelledby, ariaDescribedby, valid, hint, required, disabled]);

    return (
        <FieldControlContext.Provider value={contextValues}>
            <StyledDiv
                className={className}
                $noMargin={noMargin}
                $hasLabel={!!label}
                $hasHint={!!hint}
                $valid={valid}
                {...props /* eslint-disable-line react/jsx-props-no-spreading */}
            >
                {label && (
                    <Label
                        id={slotIds.label}
                        forId={fieldId}
                        tooltip={tooltip}
                        required={required}
                    >
                        {label}
                    </Label>
                )}
                {hint && (
                    <StyledHint
                        id={slotIds.hint}
                        $isMobile={isMobile}
                    >
                        {hint}
                    </StyledHint>
                )}
                {!valid && (
                    <InvalidFieldMessage
                        controlId={slotIds.invalid}
                        feedbackMsg={validationErrorMessage}
                        noIcon={noInvalidFieldIcon}
                    />
                )}
                {children}
            </StyledDiv>
        </FieldControlContext.Provider>
    );
};
