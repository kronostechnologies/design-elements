import styled from 'styled-components';
import { focus } from '../../../../utils/css-state';

type SelectionSuffix = '-selected' | '';

function getSelectionSuffix(isSelected: boolean): SelectionSuffix {
    return isSelected ? '-selected' : '';
}

export const PageButtonWrapper = styled.li`
    list-style: none;
`;

export const StyledButton = styled.button<{ $isSelected: boolean, $isMobile: boolean }>`
    align-items: center;
    background-color: ${({ $isSelected, theme }) => theme.component[`pagination-page${getSelectionSuffix($isSelected)}-background-color`]};
    border: ${({ $isSelected, theme }) => ($isSelected ? `1px solid ${theme.component['pagination-page-selected-border-color']}` : 'none')};
    border-radius: var(--border-radius-4x);
    display: flex;
    justify-content: center;
    max-height: ${({ $isMobile }) => ($isMobile ? 'var(--size-2x)' : 'var(--size-1halfx)')};
    min-width: ${({ $isMobile }) => ($isMobile ? 'var(--size-2x)' : 'var(--size-1halfx)')};
    padding: ${({ $isMobile }) => ($isMobile ? '0.25rem 0.5rem' : '0.125rem 0.25rem')};
    
    ${focus};

    &:hover {
        background-color: ${({ $isSelected, theme }) => theme.component[`pagination-page${getSelectionSuffix($isSelected)}-hover-background-color`]};
    }
`;

export const StyledText = styled.span<{ $isSelected: boolean, $isMobile: boolean }>`
    color: ${({ $isSelected, theme }) => theme.component[`pagination-page${getSelectionSuffix($isSelected)}-text-color`]};
    font-size: ${({ $isMobile }) => ($isMobile ? 1 : 0.875)}rem;
    font-weight: ${({ $isSelected }) => ($isSelected ? 'var(--font-bold)' : 'var(--font-normal)')};
    letter-spacing: 0.0125rem;
    line-height: ${({ $isMobile }) => ($isMobile ? 1.5 : 1.25)}rem;

    &:hover {
        ${({ $isSelected, theme }) => !$isSelected && `
            color: ${theme.component['pagination-page-hover-text-color']};
        `}
    }
`;
