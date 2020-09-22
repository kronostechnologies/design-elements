import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import styled from 'styled-components';

type PartialButtonProps = Pick<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'type'>;

export interface AbstractButtonProps extends PartialButtonProps {
    label?: string;
    children?: ReactNode;
    disabled?: boolean;

    onClick?(): void;
}

export const AbstractButton = styled.button<{ isMobile: boolean }>`
    align-items: center;
    appearance: none;
    background: inherit;
    border: 1px solid;
    border-radius: 1.5rem;
    color: inherit;
    display: inline-flex;
    font-family: inherit;
    font-size: ${({ isMobile }) => isMobile ? 0.875 : 0.75}rem;
    font-weight: var(--font-bold);
    height: ${({ isMobile }) => isMobile ? 48 : 32}px;
    justify-content: center;
    letter-spacing: ${({ isMobile }) => isMobile ? 0.53 : 0.4}px;
    line-height: ${({ isMobile }) => isMobile ? 1.5 : 1}rem;
    min-height: 2rem;
    min-width: 2rem;
    outline: none;
    padding: ${({ isMobile }) => isMobile ? '0 var(--spacing-3x);' : '0 var(--spacing-2x);'};
    text-transform: uppercase;
    user-select: none;

    &:not(:disabled) {
        cursor: pointer;
    }

    > svg {
        color: inherit;
    }
`;

export const LegacyAbstractButton = styled.button`
    align-items: center;
    appearance: none;
    background: inherit;
    border: 1px solid;
    border-radius: 1.6rem;
    color: inherit;
    display: inline-flex;
    font-family: inherit;
    font-size: 0.75rem;
    font-weight: var(--font-bold);
    justify-content: center;
    letter-spacing: 0.55px;
    min-height: 2rem;
    min-width: 2rem;
    outline: none;
    padding: var(--spacing-half) var(--spacing-2x);
    text-transform: uppercase;
    transition: all 0.2s ease-in-out;
    user-select: none;

    &:not(:disabled) {
        cursor: pointer;
    }

    > svg {
        color: inherit;
    }
`;
