import { FunctionComponent, PropsWithChildren, useMemo } from 'react';
import styled from 'styled-components';
import { useId } from '../../hooks/use-id';
import { FieldControlContext } from './context';
import { InvalidFieldMessage } from './feedbacks/invalid-field-message';
import { Label } from './label/label';
import { Hint } from './hint/hint';
import { FieldContainerProps } from './types';
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
    const inputFieldId = useId(providedId);

    const slotIds = getSlotIds(inputFieldId, label, hint, (validationErrorMessage && !valid));
    const ariaLabel = getAriaLabel(label, providedAriaLabel, providedAriaLabelledby);
    const ariaLabelledby = getAriaLabelledby(slotIds, providedAriaLabelledby);
    const ariaDescribedby = getAriaDescribedby(slotIds, providedAriaDescribedby);

    const contextValues = useMemo(() => ({
        id: inputFieldId,
        ariaLabel,
        ariaLabelledby,
        ariaDescribedby,
        valid,
        hint,
        required,
        disabled,
    }), [inputFieldId, ariaLabel, ariaLabelledby, ariaDescribedby, valid, hint, required, disabled]);

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
                        htmlFor={inputFieldId}
                        tooltip={tooltip}
                        required={required}
                        disabled={disabled}
                    >
                        {label}
                    </Label>
                )}
                {!disabled && hint && (
                    <Hint
                        id={slotIds.hint}
                    >
                        {hint}
                    </Hint>
                )}
                {!disabled && !valid && (
                    <InvalidFieldMessage
                        id={slotIds.invalid}
                        noInvalidFieldIcon={noInvalidFieldIcon}
                    >
                        {validationErrorMessage}
                    </InvalidFieldMessage>
                )}
                {children}
            </StyledDiv>
        </FieldControlContext.Provider>
    );
};
