import { KeyboardEvent, ReactElement, forwardRef, Ref } from 'react';
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

    onClick(): void;

    onKeyDown?(event: KeyboardEvent<HTMLButtonElement>): void;
}

export const TabButton = forwardRef(({
    id,
    panelId,
    children,
    leftIcon,
    rightIcon,
    isSelected,
    onClick,
    onKeyDown,
}: TabButtonProps, ref: Ref<HTMLButtonElement>): ReactElement => (
    <StyledButton
        id={id}
        aria-controls={panelId}
        role="tab"
        aria-selected={isSelected}
        ref={ref}
        data-testid="tab-button"
        tabIndex={isSelected ? undefined : -1}
        isSelected={isSelected}
        onClick={onClick}
        onKeyDown={onKeyDown}
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
));
