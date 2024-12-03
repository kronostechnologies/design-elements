import { forwardRef, PropsWithChildren, ReactElement, Ref } from 'react';
import styled from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { useId } from '../../hooks/use-id';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { useFieldControlContext } from '../field-container/context';
import { Icon } from '../icon/icon';
import { InvalidFieldMessageProps } from './types';

const StyledValidationMessage = styled.span<{ $isMobile: boolean }>`
    color: ${(props) => props.theme.component['field-error-text-color']};
    display: flex;
    font-size: ${({ $isMobile }) => ($isMobile ? '0.875rem' : '0.75rem')};
    font-weight: var(--font-normal);
    letter-spacing: 0.02rem;
    line-height: ${({ $isMobile }) => ($isMobile ? '1.5rem' : '1.25rem')};
`;

const StyledIcon = styled(Icon)`
    align-self: center;
    display: flex;
    margin-right: var(--spacing-base);
`;

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
