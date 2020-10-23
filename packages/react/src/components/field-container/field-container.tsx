import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';

import { useDeviceContext } from '@design-elements/components/device-context-provider/device-context-provider';
import { InvalidField } from '../feedbacks/invalid-field';
import { Label } from '../label/label';
import { Theme } from '../theme-wrapper/theme-wrapper';

const StyledDiv = styled.div<StyledDivProps>`
    margin: ${({ noMargin }) => noMargin ? '0' : '0 0 var(--spacing-3x)'};

    input,
    select,
    textarea {
        border-color: ${({ theme, valid }) => valid ? theme.greys['dark-grey'] : theme.notifications['error-2.1']};
    }

    &:focus {
        border-color: ${({ theme, valid }) => valid ? theme.main['primary-1.1'] : theme.notifications['error-2.1']};
    }

    > :nth-child(${({ hasLabel, hasHint, valid }) => (hasLabel ? 1 : 0) + (hasHint ? 1 : 0) + (!valid ? 1 : 0)}) {
      margin-bottom: var(--spacing-half);
    }
`;

interface StyledDivProps {
    theme: Theme;
    hasLabel: boolean;
    hasHint: boolean;
    valid: boolean;
    noMargin?: boolean;
}

const StyledHint = styled.span<{isMobile: boolean}>`
    display: block;
    color: ${props => props.theme.greys['dark-grey']};
    font-size: ${({ isMobile }) => isMobile ? '0.875rem' : '0.75rem'};
    font-weight: var(--font-normal);
    letter-spacing: 0.02rem;
    line-height: ${({ isMobile }) => isMobile ? '1.5rem' : '1.25rem'};
`;

export interface FieldContainerProps {
    children: ReactNode;
    noMargin?: boolean;
    fieldId: string;
    label?: string;
    valid: boolean;
    validationErrorMessage: string;
    hint?: string;
}

export function FieldContainer({
    children,
    fieldId,
    label,
    valid,
    validationErrorMessage,
    hint,
    ...props
}: FieldContainerProps): ReactElement {
    const { isMobile } = useDeviceContext();

    return (
        <StyledDiv {...props} hasLabel={!!label} hasHint={!!hint} valid={valid}>
            {label && <Label forId={fieldId}>{label}</Label>}
            {hint && <StyledHint isMobile={isMobile}>{hint}</StyledHint>}
            {!valid && <InvalidField controlId={fieldId} feedbackMsg={validationErrorMessage} />}
            {children}
        </StyledDiv>
    );
}
