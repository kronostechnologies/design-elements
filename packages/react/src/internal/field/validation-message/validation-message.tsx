import { forwardRef, PropsWithChildren, ReactElement, Ref } from 'react';
import { useDataAttributes } from '../../../hooks/use-data-attributes';
import { useId } from '../../../hooks/use-id';
import { useDeviceContext } from '../../../components/device-context-provider/device-context-provider';
import { useFieldControl } from '../context';
import { StyledIcon, StyledValidationMessage } from './styled';
import { ValidationMessageProps } from './types';

export const ValidationMessage = forwardRef(({
    children,
    id: providedId,
    noInvalidFieldIcon,
    ...otherProps
}: PropsWithChildren<ValidationMessageProps>, ref: Ref<HTMLSpanElement>): ReactElement => {
    const { isMobile } = useDeviceContext();
    const dataAttributes = useDataAttributes(otherProps);
    const { slotIds } = useFieldControl();
    const id = useId(providedId ?? slotIds?.invalid);

    return (
        <StyledValidationMessage
            data-testid="invalid-field"
            aria-live="polite"
            id={id}
            ref={ref}
            role="alert"
            $isMobile={isMobile}
            {...otherProps /* eslint-disable-line react/jsx-props-no-spreading */}
            {...dataAttributes /* eslint-disable-line react/jsx-props-no-spreading */}
        >
            {!noInvalidFieldIcon && (
                <StyledIcon name="alertOctagon" size={isMobile ? '24' : '16'} />
            )}
            {children}
        </StyledValidationMessage>
    );
});

ValidationMessage.displayName = 'InvalidFieldMessage';
