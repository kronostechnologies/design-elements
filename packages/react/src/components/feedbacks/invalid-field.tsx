import { VoidFunctionComponent } from 'react';
import styled from 'styled-components';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon } from '../icon/icon';

const Field = styled.span<{ isMobile: boolean }>`
    color: ${(props) => props.theme.component['field-error-text-color']};
    display: flex;
    font-size: ${({ isMobile }) => (isMobile ? '0.875rem' : '0.75rem')};
    font-weight: var(--font-normal);
    letter-spacing: 0.02rem;
    line-height: ${({ isMobile }) => (isMobile ? '1.5rem' : '1.25rem')};
`;

const StyledIcon = styled(Icon)`
    align-self: center;
    display: flex;
    margin-right: var(--spacing-base);
`;

interface InvalidFieldProps {
    controlId: string;
    feedbackMsg: string;
    noIcon?: boolean;
}

export const InvalidField: VoidFunctionComponent<InvalidFieldProps> = ({ controlId, feedbackMsg, noIcon }) => {
    const { isMobile } = useDeviceContext();

    return (
        <Field
            data-testid="invalid-field"
            id={`${controlId}_invalid`}
            isMobile={isMobile}
        >
            {!noIcon && (
                <StyledIcon name="alertOctagon" size={isMobile ? '24' : '16'} />
            )}
            {feedbackMsg}
        </Field>
    );
};

InvalidField.displayName = 'InvalidField';
