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

    &:focus{
        border-color: ${props => props.valid ? 'rgb(0, 128, 165)' : 'rgb(164, 12, 46)'};
    }
`;

export default ({ children, fieldId, label, valid, validMsg, ...props }) => (
    <FieldContainer {...props} valid={valid}>
        {label &&
             <Label forId={fieldId}>
                 {label}
             </Label>
        }

        {children}

        {!valid &&
         <InvalidField controlId={fieldId} feedbackMsg={validMsg} />
        }
    </FieldContainer>
);
