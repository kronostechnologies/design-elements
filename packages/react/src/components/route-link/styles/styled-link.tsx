import styled from 'styled-components';
import { focus, focusVisibleReset } from '../../../utils/css-state';

type DisabledSuffix = '-disabled' | '';

function getDisabledSuffix(disabled: boolean | undefined): DisabledSuffix {
    return disabled === true ? '-disabled' : '';
}

interface ContainerProps {
    disabled?: boolean;
    $hasLabel: boolean;
    $isMobile: boolean;
}

export const StyledLink = styled.a<ContainerProps>`
    align-items: center;
    border-radius: var(--border-radius);
    color: ${({ disabled, theme }) => theme.component[`route-link${getDisabledSuffix(disabled)}-text-color`]};
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
    display: inline-flex;
    font-size: ${({ $isMobile }) => ($isMobile ? '1rem' : '0.875rem')};
    line-height: 1.5rem;
    padding: 4px;
    text-decoration: underline;

    &:hover {
        ${({ disabled, theme }) => !disabled && `
             color: ${theme.component['route-link-hover-text-color']};
        `}
    }

    &:visited {
        ${({ disabled, theme }) => !disabled && `
             color: ${theme.component['route-link-visited-text-color']};
        `}
    }

    ${focus};

    ${focusVisibleReset};

    ${({ theme }) => focus({ theme }, false, '&:focus-visible')}
`;
