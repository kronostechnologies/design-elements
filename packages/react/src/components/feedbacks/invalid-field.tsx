import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { useDeviceContext } from '../device-context-provider/device-context-provider';

const Field = styled.div<{ isMobile: boolean }>`
    color: ${props => props.theme.notifications['error-2.1']};
    font-size: ${({ isMobile }) => isMobile ? '0.875rem' : '0.75rem'};
    font-weight: var(--font-normal);
    letter-spacing: 0.02rem;
    line-height: ${({ isMobile }) => isMobile ? '1.5rem' : '1.25rem'};
    margin: var(--spacing-half) 0 0;
`;

interface InvalidFieldProps {
    controlId: string;
    feedbackMsg: string;
}

function InvalidField({ controlId, feedbackMsg }: InvalidFieldProps): ReactElement {
    const { isMobile } = useDeviceContext();

    return (
        <Field
            aria-live="polite"
            id={`${controlId}_invalid`}
            isMobile={isMobile}
            role="alert"
        >
            {feedbackMsg}
        </Field>
    );
}

export { InvalidField };
