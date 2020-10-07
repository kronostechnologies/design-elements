import { focus } from '@design-elements/utils/state';
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import styled from 'styled-components';

type PartialButtonProps = Pick<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'type'>;

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
    ${focus}
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

export interface AbstractButtonProps extends PartialButtonProps {
    label?: string;
    children?: ReactNode;
    disabled?: boolean;
    onClick?(): void;
}
