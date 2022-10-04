import styled from 'styled-components';
import { focus } from '../../../utils/css-state';

type Type = 'external' | 'route';

interface ContainerProps {
    activeClassName?: string;
    disabled?: boolean;
    end?: boolean;
    $hasLabel: boolean;
    to?: string;
    type: Type;
}

export const StyledLink = styled.a<ContainerProps>`
    align-items: center;
    color: ${({ disabled, theme }) => (disabled ? theme.main['primary-1.2'] : theme.main['primary-1.1'])};
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
    display: inline-flex;
    text-decoration: underline;

    ${focus};

    &:focus:not(:focus-visible) {
        box-shadow: none;
    }

    ${({ theme }) => focus({ theme }, false, '&:focus-visible')}
`;
