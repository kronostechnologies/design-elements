import { PropsWithChildren, VoidFunctionComponent } from 'react';
import styled from 'styled-components';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
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

export const InvalidFieldMessage: VoidFunctionComponent<PropsWithChildren<InvalidFieldMessageProps>> = ({
    children, id, noInvalidFieldIcon,
}) => {
    const { isMobile } = useDeviceContext();

    return (
        <StyledValidationMessage
            data-testid="invalid-field"
            id={id}
            $isMobile={isMobile}
        >
            {!noInvalidFieldIcon && (
                <StyledIcon name="alertOctagon" size={isMobile ? '24' : '16'} />
            )}
            {children}
        </StyledValidationMessage>
    );
};
