import { forwardRef, PropsWithChildren, ReactElement, Ref } from 'react';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { useId } from '../../hooks/use-id';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { useFieldControlContext } from '../field-container/context';
import { StyledIcon, StyledValidationMessage } from './styled';
import { InvalidFieldMessageProps } from './types';

export const InvalidFieldMessage = forwardRef(({
    children,
    id: providedId,
    noInvalidFieldIcon,
    ...otherProps
}: PropsWithChildren<InvalidFieldMessageProps>, ref: Ref<HTMLSpanElement>): ReactElement => {
    const { isMobile } = useDeviceContext();
    const dataAttributes = useDataAttributes(otherProps);
    const { slotIds } = useFieldControlContext({});
    const id = useId(providedId ?? slotIds?.invalid);

    return (
        <StyledValidationMessage
            data-testid="invalid-field"
            id={id}
            ref={ref}
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

InvalidFieldMessage.displayName = 'InvalidFieldMessage';
