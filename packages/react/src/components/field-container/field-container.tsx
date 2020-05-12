import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';

import { InvalidField } from '../feedbacks/invalid-field';
import { Label } from '../label/label';
import { Theme } from '../theme-wrapper/theme-wrapper';

const StyledDiv = styled.div`
    margin: 0 0 var(--spacing-3x);

    input,
    select,
    textarea {
        border-color: ${(props: {theme: Theme, valid: boolean}) => props.valid ? props.theme.greys.grey : props.theme.notifications['error-2.1']};
    }

    &:focus {
        border-color: ${props => props.valid ? props.theme.main['primary-1.1'] : props.theme.notifications['error-2.1']};
    }
`;

export type DeviceType = 'mobile' | 'desktop';

interface FieldContainerProps {
    children: ReactNode;
    device?: DeviceType;
    fieldId: string;
    label?: string;
    valid: boolean;
    validationErrorMessage: string;
}

export function FieldContainer(
    { children, device = 'desktop', fieldId, label, valid, validationErrorMessage, ...props }: FieldContainerProps,
): ReactElement {
    return (
        <StyledDiv {...props} valid={valid}>
            {label && <Label device={device} forId={fieldId}>{label}</Label>}
            {children}
            {!valid && <InvalidField controlId={fieldId} feedbackMsg={validationErrorMessage} />}
        </StyledDiv>
    );
}
