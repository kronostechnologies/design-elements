import React, { ReactNode } from 'react';
import styled from 'styled-components';

import { Child } from '../buttons/abstract-button';
import { InvalidField } from '../feedbacks/invalid-field';
import { Label } from './label';

const StyledDiv = styled.div`
  margin: 0 0 1.5rem;

  input,
  select,
  textarea {
    border-color: ${props => (props.valid ? 'rgb(217, 221, 226)' : 'rgb(164, 12, 46)')};
  }

  &:focus {
    border-color: ${props => (props.valid ? 'rgb(0, 128, 165)' : 'rgb(164, 12, 46)')};
  }
`;

interface FieldContainerProps {
    children: Child;
    fieldId: string;
    label: string;
    valid: boolean;
    validMsg: string;

}

const FieldContainer = ({ children, fieldId, label, valid, validMsg, ...props }: FieldContainerProps): ReactNode => (
    <StyledDiv {...props} valid={valid}>
        {label && (
            <Label forId={fieldId}>
                {label}
            </Label>
        )}

        {children}

        {!valid &&
            <InvalidField controlId={fieldId} feedbackMsg={validMsg} />
        }
    </StyledDiv>
);

export { FieldContainer } ;
