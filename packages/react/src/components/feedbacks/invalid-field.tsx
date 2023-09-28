import { VoidFunctionComponent } from 'react';
import styled from 'styled-components';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon } from '../icon/icon';

const Field = styled.div<{ isMobile: boolean }>`
    color: ${(props) => props.theme.colors['alert-2.1']};
    display: flex;
    font-size: ${({ isMobile }) => (isMobile ? '0.875rem' : '0.75rem')};
    font-weight: var(--font-normal);
    letter-spacing: 0.02rem;
    line-height: ${({ isMobile }) => (isMobile ? '1.5rem' : '1.25rem')};
`;

const StyledSpan = styled.span`
    margin-left: var(--spacing-base);
`;

const StyledIcon = styled.div`
    align-items: center;
    display: flex;
`;

interface InvalidFieldProps {
    controlId: string;
    feedbackMsg: string;
    noIcon?: boolean;
}

const InvalidField: VoidFunctionComponent<InvalidFieldProps> = ({ controlId, feedbackMsg, noIcon }) => {
    const { isMobile } = useDeviceContext();

    return (
        <Field
            aria-live="polite"
            id={`${controlId}_invalid`}
            isMobile={isMobile}
            role="alert"
        >
            {!noIcon && (
                <StyledIcon><Icon name="alertOctagon" size={isMobile ? '24' : '16'} /></StyledIcon>
            )}
            <StyledSpan>{feedbackMsg}</StyledSpan>
        </Field>
    );
};

export { InvalidField };
