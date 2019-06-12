import React from 'react';
import styled from 'styled-components';

import Label from './label';
import InvalidField from '../feedbacks/invalid-field';

const FieldContainer = styled.div`
  margin: 0 0 1.5rem;

  input,
  select,
  textarea {
    border-color: ${props => props.valid ? 'rgb(217, 221, 226)' : 'rgb(164, 12, 46)'};
  }
`;

export default ({ children, fieldId, label, optional, valid, validMsg, ...props }) => (
    <FieldContainer valid={valid} {...props}>
        {label &&
         (
             <Label forId={fieldId}>
                 {label}
                 {optional && ` (${optional})`}
             </Label>
         )
        }

        {children}

        {!valid &&
         (<InvalidField controlId={fieldId} feedbackMsg={validMsg} />)
        }
    </FieldContainer>
);
