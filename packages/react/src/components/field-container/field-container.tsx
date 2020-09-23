import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';

import { InvalidField } from '../feedbacks/invalid-field';
import { Label } from '../label/label';
import { Theme } from '../theme-wrapper/theme-wrapper';

const StyledDiv = styled.div<StyledDivProps>`
    margin: ${({ disableMargin }) => disableMargin ? '0' : '0 0 var(--spacing-3x)'};

    input,
    select,
    textarea {
        border-color: ${({ theme, valid }) => valid ? theme.greys.grey : theme.notifications['error-2.1']};
    }

    &:focus {
        border-color: ${({ theme, valid }) => valid ? theme.main['primary-1.1'] : theme.notifications['error-2.1']};
    }
`;

interface StyledDivProps {
    theme: Theme;
    valid: boolean;
    disableMargin?: boolean;
}

interface FieldContainerProps {
    children: ReactNode;
    disableMargin?: boolean;
    fieldId: string;
    label?: string;
    valid: boolean;
    validationErrorMessage: string;
}

export function FieldContainer({
    children,
    fieldId,
    label,
    valid,
    validationErrorMessage,
    ...props
}: FieldContainerProps): ReactElement {
    return (
        <StyledDiv {...props} valid={valid}>
            {label && <Label forId={fieldId}>{label}</Label>}
            {children}
            {!valid && <InvalidField controlId={fieldId} feedbackMsg={validationErrorMessage} />}
        </StyledDiv>
    );
}
