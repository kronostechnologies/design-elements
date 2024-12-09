import styled from 'styled-components';

interface StyledDivProps {
    $hasLabel: boolean;
    $hasHint: boolean;
    $valid: boolean;
    $noMargin?: boolean;
}

export const StyledDiv = styled.div<StyledDivProps>`
    margin: ${({ $noMargin }) => ($noMargin ? '0' : '0 0 var(--spacing-3x)')};

    input,
    select,
    textarea {
        border-color: ${({ theme, $valid }) => ($valid ? theme.component['field-input-border-color'] : theme.component['field-input-error-border-color'])};
    }

    > :nth-child(${({ $hasLabel, $hasHint, $valid }) => ($hasLabel ? 1 : 0) + ($hasHint ? 1 : 0) + (!$valid ? 1 : 0)}) {
        margin-bottom: var(--spacing-half);
    }
`;
