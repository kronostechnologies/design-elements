import styled from 'styled-components';
import { focus, focusVisibleReset } from '../../../utils/css-state';

interface ContainerProps {
    disabled?: boolean;
    $hasLabel: boolean;
    $isMobile: boolean;
}

export const StyledLink = styled.a<ContainerProps>`
    align-items: center;
    color: ${({ disabled, theme }) => (disabled ? theme.main['primary-1.2'] : theme.main['primary-1.1'])};
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
    display: inline-flex;
    font-size: ${({ $isMobile }) => ($isMobile ? '1rem' : '0.875rem')};
    line-height: 1.5rem;
    text-decoration: underline;

    &:hover {
        ${({ disabled, theme }) => (disabled ? '' : `color: ${theme.main['primary-1.3']};`)};
    }

    &:visited {
        ${({ disabled }) => (disabled ? '' : 'color: #62a;')}; /* TODO change colors when updating thematization */
    }

    ${focus};

    ${focusVisibleReset};

    ${({ theme }) => focus({ theme }, false, '&:focus-visible')}
`;
