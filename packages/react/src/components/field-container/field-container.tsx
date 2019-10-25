import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';

import { equisoftTheme } from '../../themes/equisoft';
import { InvalidField } from '../feedbacks/invalid-field';
import { Label } from '../label/label';

const StyledDiv = styled.div`
  ${(props: {theme?: Theme, valid: boolean}) => {
      let theme = props.theme;
      if (theme) {
          if (Object.entries(theme).length === 0 && theme.constructor === Object) {
              theme = equisoftTheme;
          }
      } else {
          theme = equisoftTheme;
      }
      return `
      margin: 0 0 1.5rem;

      input,
      select,
      textarea {
        border-color: ${props.valid ? theme.greys.grey : theme.notifications['error-2.1']};
      }

      &:focus {
        border-color: ${props.valid ? theme.main['primary-1.1'] : theme.notifications['error-2.1']};
      }
    `;
  }}`;

interface FieldContainerProps {
    children: ReactNode;
    fieldId: string;
    label?: string;
    valid: boolean;
    validationErrorMessage: string;
}

export function FieldContainer(
    { children, fieldId, label, valid, validationErrorMessage, ...props }: FieldContainerProps,
): ReactElement {
    return (
        <StyledDiv {...props} valid={valid}>
            {label && <Label forId={fieldId}>{label}</Label>}
            {children}
            {!valid && <InvalidField controlId={fieldId} feedbackMsg={validationErrorMessage} />}
        </StyledDiv>
    );
}
