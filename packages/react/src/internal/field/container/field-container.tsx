import { FunctionComponent, PropsWithChildren, useMemo } from 'react';
import { useDataAttributes } from '../../../hooks/use-data-attributes';
import { useId } from '../../../hooks/use-id';
import { FieldContext } from '../context';
import { ValidationMessage } from '../validation-message';
import { Label } from '../../label';
import { Hint } from '../hint';
import { StyledDiv } from './styled';
import { FieldContainerProps } from './types';
import { getAriaDescribedby, getAriaLabel, getAriaLabelledby, getSlotIds } from './utils';

export const FieldContainer: FunctionComponent<PropsWithChildren<FieldContainerProps>> = ({
    fieldId: providedId,
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
    ...otherProps
}) => {
    const dataAttributes = useDataAttributes(otherProps);
    const fieldId = useId(providedId);

    const slotIds = getSlotIds(fieldId, !!label, !!hint, !!(validationErrorMessage && !valid));
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
        slotIds,
    }), [fieldId, ariaLabel, ariaLabelledby, ariaDescribedby, valid, hint, required, disabled, slotIds]);

    return (
        <FieldContext.Provider value={contextValues}>
            <StyledDiv
                className={className}
                $noMargin={noMargin}
                $hasLabel={!!label}
                $hasHint={!!hint}
                $valid={valid}
                {...dataAttributes /* eslint-disable-line react/jsx-props-no-spreading */}
                {...otherProps /* eslint-disable-line react/jsx-props-no-spreading */}
            >
                {label && <Label tooltip={tooltip}>{label}</Label>}
                {hint && <Hint>{hint}</Hint>}
                {!valid && (
                    <ValidationMessage noInvalidFieldIcon={noInvalidFieldIcon}>
                        {validationErrorMessage}
                    </ValidationMessage>
                )}
                {children}
            </StyledDiv>
        </FieldContext.Provider>
    );
};
