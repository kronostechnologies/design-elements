import { focus } from '@design-elements/utils/state';
import styled from 'styled-components';

interface ContainerProps {
    activeClassName?: string;
    disabled?: boolean;
    exact?: boolean;
    to?: string;
}

export const StyledLink = styled.a<ContainerProps>`
    align-items: center;
    cursor: ${props => props.disabled ? 'default' : 'pointer'};
    display: inline-flex;
    text-decoration: none;

    svg {
        margin-right: var(--spacing-1x);
    }

    &.iconOnly svg {
        margin: 0;
    }

    &.external {
        color: ${props => props.disabled ? '#7fbfd2' : '#0080a5'};
        ${focus}

        &:hover {
            ${props => props.disabled ? '' : 'text-decoration: underline'};
        }

        &:visited {
            color: #094c6c;

            svg {
                color: #094c6c;
            }
        }
    }

    &.navigation {
        color: ${props => props.disabled ? '#9ca7b4' : '#57666e'};
        ${focus}

        &:hover {
            ${props => props.disabled ? '' : 'color: #000;'}
        }

        &.active {
            ${props => props.disabled ? '' : 'color: #0080a5;'}
        }
    }
`;
