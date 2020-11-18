import React, { ReactElement, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { Icon, IconName } from '@design-elements/components/icon/icon';
import { focus } from '@design-elements/utils/css-state';

const StyledButton = styled.button<{isSelected: boolean}>`
    align-items: center;
    cursor: pointer;
    display: flex;
    justify-content: center;
    line-height: 24px;
    min-height: 48px;
    min-width: 82px;
    ${focus}
    ${({ isSelected, theme }) => isSelected ?
        `::after {
                content: '';
                background-color: ${theme.main['primary-1.1']};
                bottom: 0;
                display: block;
                height: 4px;
                left: 0;
                position: absolute;
                width: 100%;
            }` :
        ''
    }
    padding-left: 16px;
    padding-right: 16px;
    position: relative;
`;

const StyledButtonText = styled.span<{isSelected: boolean}>`
    color: ${({ isSelected, theme }) => isSelected ? `${theme.main['primary-1.1']}` : `${theme.greys['dark-grey']}`};
    font-family: Open Sans, sans-serif;
    font-size: 0.875rem;
    -webkit-text-stroke-width: ${({ isSelected }) => isSelected ? '0.4px' : '0'};

    ${/* sc-select */ StyledButton}:hover & {
        color: ${({ theme }) => theme.main['primary-2']};
    }
`;

const LeftIcon = styled(Icon)<{$isSelected: boolean}>`
    color: ${({ $isSelected, theme }) => $isSelected ? theme.main['primary-1.1'] : theme.greys['dark-grey']};
    padding-right: var(--spacing-half);

    ${/* sc-select */ StyledButton}:hover & {
        color: ${({ theme }) => theme.main['primary-2']};
    }
`;

const RightIcon = styled(Icon)<{$isSelected: boolean}>`
    color: ${({ $isSelected, theme }) => $isSelected ? theme.main['primary-1.1'] : theme.greys['dark-grey']};
    padding-left: var(--spacing-half);

    ${/* sc-select */ StyledButton}:hover & {
        color: ${({ theme }) => theme.main['primary-2']};
    }
`;

interface TabButtonProps {
    children: string;
    leftIcon?: IconName | null;
    rightIcon?: IconName | null;
    isSelected: boolean;
    isFocused: boolean;
    onClick(): void;
    onFocus(): void;
}

export function TabButton({
    children,
    leftIcon = null,
    rightIcon = null,
    isSelected,
    isFocused,
    onClick,
    onFocus,
}: TabButtonProps): ReactElement {
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (isFocused) {
            buttonRef?.current?.focus();
        } else {
            buttonRef?.current?.blur();
        }
    }, [isFocused]);

    return (
        <StyledButton
            ref={buttonRef}
            data-testid="tab-button"
            tabIndex={isSelected ? undefined : -1}
            onClick={onClick}
            onFocus={onFocus}
            isSelected={isSelected}
        >
            {leftIcon != null && (
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
            {rightIcon != null && (
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
