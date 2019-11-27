import React from 'react';
import styled from 'styled-components';

const Field = styled.div`
  color: ${props => props.theme.notifications['error-2.1']};
  font-size: 0.75rem;
  font-weight: var(--font-normal);
  letter-spacing: 0.025rem;
  line-height: 1.25rem;
  margin: var(--spacing-half) 0 0;
`;

interface InvalidFieldProps {
    controlId: string;
    feedbackMsg: string;
}

const InvalidField = ({ controlId, feedbackMsg }: InvalidFieldProps) => (
    <Field
        role="alert"
        aria-live="polite"
        id={`${controlId}_invalid`}
    >
        {feedbackMsg}
    </Field>
);

export { InvalidField };
