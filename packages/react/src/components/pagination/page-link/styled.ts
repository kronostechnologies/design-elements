import styled from 'styled-components';
import { focus } from '../../../utils/css-state';

type SelectionSuffix = '-selected' | '';

function getSelectionSuffix(isSelected: boolean): SelectionSuffix {
    return isSelected ? '-selected' : '';
}

export const Page = styled.div<{ isSelected: boolean, isMobile: boolean }>`
    align-items: center;
    background-color: ${({ isSelected, theme }) => theme.component[`pagination-page${getSelectionSuffix(isSelected)}-background-color`]};
    border: ${({ isSelected, theme }) => (isSelected ? `1px solid ${theme.component['pagination-page-selected-border-color']}` : 'none')};
    border-radius: var(--border-radius-4x);
    display: flex;
    flex-direction: column;
    gap: 0;
    height: ${({ isMobile }) => (isMobile ? 'var(--size-2x)' : 'var(--size-1halfx)')};
    justify-content: center;
    min-width: ${({ isMobile }) => (isMobile ? 'var(--size-2x)' : 'var(--size-1halfx)')};
    padding: 0.125rem;
    width: inherit;
    
    ${focus};

    &:hover {
        background-color: ${({ isSelected, theme }) => theme.component[`pagination-page${getSelectionSuffix(isSelected)}-hover-background-color`]};
        cursor: ${({ isSelected }) => (isSelected ? 'default' : 'pointer')};
    }
`;

export const StyledText = styled.a<{ isSelected: boolean, isMobile: boolean }>`
    color: ${({ isSelected, theme }) => theme.component[`pagination-page${getSelectionSuffix(isSelected)}-text-color`]};
    font-size: ${({ isMobile }) => (isMobile ? 0.875 : 0.875)}rem;
    font-style: normal;
    font-weight: ${({ isSelected }) => (isSelected ? 'var(--font-bold)' : 'var(--font-normal)')};
    letter-spacing: 0.0125rem;
    line-height: ${({ isMobile }) => (isMobile ? 1.25 : 1.25)}rem;
    text-align: center;
`;
