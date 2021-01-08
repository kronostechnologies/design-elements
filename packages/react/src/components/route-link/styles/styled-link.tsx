import styled from 'styled-components';
import { focus } from '../../../utils/css-state';

type Type = 'external' | 'route';

interface ContainerProps {
    activeClassName?: string;
    disabled?: boolean;
    exact?: boolean;
    $hasLabel: boolean;
    to?: string;
    type: Type;
}

export const StyledLink = styled.a<ContainerProps>`
    align-items: center;
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
    display: inline-flex;
    text-decoration: none;

    svg {
        margin-right: ${({ $hasLabel }) => ($hasLabel ? 'var(--spacing-1x)' : '0')};
    }

    ${focus};
`;
