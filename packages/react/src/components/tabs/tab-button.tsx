import React, { ReactElement, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { focus } from '../../utils/css-state';
import { Icon, IconName } from '../icon/icon';

const StyledButton = styled.button<{ isSelected: boolean }>`
    align-items: center;
    bottom: -1px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    line-height: 1.5rem;
    min-height: 48px;
    min-width: 82px;

    ${focus};

    ${({ isSelected, theme }) => isSelected && `
        ::after {
            content: '';
            background-color: ${theme.main['primary-1.1']};
            bottom: 0;
            display: block;
            height: 4px;
            left: 0;
            position: absolute;
            width: 100%;
        }
    `}

    padding-left: var(--spacing-2x);
    padding-right: var(--spacing-2x);
    position: relative;
    z-index: 1;
`;

const StyledButtonText = styled.span<{ isSelected: boolean }>`
    color: ${({ isSelected, theme }) => (isSelected ? `${theme.main['primary-1.1']}` : `${theme.greys['dark-grey']}`)};
    font-family: Open Sans, sans-serif;
    font-size: 0.875rem;
    -webkit-text-stroke-width: ${({ isSelected }) => (isSelected ? '0.4px' : '0')};

    ${/* sc-select */ StyledButton}:hover & {
        color: ${({ theme }) => theme.main['primary-2']};
    }
`;

const LeftIcon = styled(Icon)<{ $isSelected: boolean }>`
    color: ${({ $isSelected, theme }) => ($isSelected ? theme.main['primary-1.1'] : theme.greys['dark-grey'])};
    padding-right: var(--spacing-half);

    ${/* sc-select */ StyledButton}:hover & {
        color: ${({ theme }) => theme.main['primary-2']};
    }
`;

const RightIcon = styled(Icon)<{ $isSelected: boolean }>`
    color: ${({ $isSelected, theme }) => ($isSelected ? theme.main['primary-1.1'] : theme.greys['dark-grey'])};
    padding-left: var(--spacing-half);

    ${/* sc-select */ StyledButton}:hover & {
        color: ${({ theme }) => theme.main['primary-2']};
    }
`;

interface TabButtonProps {
    id: string;
    panelId: string;
    children: string;
    leftIcon?: IconName
    rightIcon?: IconName;
    isSelected: boolean;
    isFocused: boolean;

    onClick(): void;

    onFocus(): void;
}

export function TabButton({
    id,
    panelId,
    children,
    leftIcon,
    rightIcon,
    isSelected,
    isFocused,
    onClick,
    onFocus,
}: TabButtonProps): ReactElement {
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (isFocused) {
            buttonRef.current?.focus();
        } else {
            buttonRef.current?.blur();
        }
    }, [isFocused]);

    return (
        <StyledButton
            id={id}
            aria-controls={panelId}
            role="tab"
            aria-selected={isSelected}
            ref={buttonRef}
            data-testid="tab-button"
            tabIndex={isSelected ? undefined : -1}
            onClick={onClick}
            onFocus={onFocus}
            isSelected={isSelected}
        >
            {leftIcon && (
                <LeftIcon
                    data-testid="tab-button-left-icon"
                    $isSelected={isSelected}
                    name={leftIcon}
                    size="16"
                />
            )}
            <StyledButtonText data-testid="tab-button-text" isSelected={isSelected}>
                {children}
            </StyledButtonText>
            {rightIcon && (
                <RightIcon
                    data-testid="tab-button-right-icon"
                    $isSelected={isSelected}
                    name={rightIcon}
                    size="16"
                />
            )}
        </StyledButton>
    );
}
