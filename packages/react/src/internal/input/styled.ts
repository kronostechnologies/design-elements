import styled from 'styled-components';
import { focus } from '../../utils/css-state';

export const StyledInput = styled.input<{ $isMobile: boolean }>`
    background: ${({ theme }) => theme.component['text-input-background-color']};
    border: 1px solid;
    border-radius: var(--border-radius);
    box-sizing: border-box;
    color: ${({ theme }) => theme.component['text-input-text-color']};
    font-family: inherit;
    font-size: ${({ $isMobile }) => ($isMobile ? '1rem' : '0.875rem')};
    letter-spacing: ${({ $isMobile }) => ($isMobile ? '0.02875rem' : '0.015rem')};
    line-height: 1.5rem;
    margin: 0;
    min-height: var(--size-2x);
    outline: none;
    padding: 0 var(--spacing-1x);
    width: 100%;

    &::placeholder {
        color: ${({ theme }) => theme.component['text-input-placeholder-text-color']};
    }

    &:valid,
    &[aria-invalid='false'] {
        border-color: ${({ theme }) => theme.component['text-input-border-color']};
    }

    &:invalid,
    &[aria-invalid='true'] {
        border-color: ${({ theme }) => theme.component['text-input-error-border-color']};
    }

    &:disabled,
    &[aria-disabled='true'] {
        background-color: ${({ theme }) => theme.component['text-input-disabled-background-color']};
        border-color: ${({ theme }) => theme.component['text-input-disabled-border-color']};
        color: ${({ theme }) => theme.component['text-input-disabled-text-color']};

        &,
        &::placeholder {
            color: ${({ theme }) => theme.component['text-input-placeholder-disabled-text-color']};
        }
    }

    ${({ theme }) => focus({ theme })};
`;
