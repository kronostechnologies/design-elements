import React from 'react';
import styled from 'styled-components';

const Field = styled.div`
  color: rgb(164, 12, 46);
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.0166em;
  line-height: 1.1666;
  margin: 0.25rem 0 0;
`;

const InvalidField = ({ controlId, feedbackMsg }) => (
    <Field
        role="alert"
        aria-live="polite"
        id={`${controlId}_invalid`}
    >
        {feedbackMsg}
    </Field>
);

export default InvalidField;
