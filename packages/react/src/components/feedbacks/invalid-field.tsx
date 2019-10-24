import React from 'react';

import styled from 'styled-components';
import { equisoftTheme } from '../../themes/equisoft';

const Field = styled.div`
  color: ${equisoftTheme.notifications['error-2.1']};
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.0166em;
  line-height: 1.1666;
  margin: 0.25rem 0 0;
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
