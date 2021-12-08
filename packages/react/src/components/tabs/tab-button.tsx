import { KeyboardEvent, ReactElement, forwardRef, Ref } from 'react';
import styled, { css } from 'styled-components';
import { focus } from '../../utils/css-state';
import { Icon, IconName } from '../icon/icon';

interface $isSelected {
    $isSelected: boolean;
}

const StyledButton = styled.button<$isSelected & { $isGlobal?: boolean; }>`
    align-items: center;
    border-bottom: ${({ $isGlobal }) => ($isGlobal ? 'none' : '1px solid #878f9a')}; /* TODO change colors when updating thematization */
    bottom: -1px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    line-height: 1.5rem;
    min-height: 48px;
    min-width: 82px;
    padding: 0 var(--spacing-2x);
    position: relative;

    &:hover {
        background-color: ${({ theme }) => theme.greys.grey};
    }

    ${focus};

    ${({ $isGlobal, $isSelected, theme }) => ($isGlobal && $isSelected) && css`
        z-index: 1;

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

    ${({ $isGlobal, $isSelected, theme }) => (!$isGlobal && $isSelected) && css`
        background-color: ${theme.greys.white};

        /* TODO change with next thematization */
        border: 1px solid #878f9a;
        border-bottom: 1px solid transparent;
        border-radius: var(--border-radius-2x) var(--border-radius-2x) 0 0;
        z-index: 1;
    `}
`;

const StyledButtonText = styled.span<$isSelected>`
    color: ${({ theme }) => theme.greys.black};
    font-family: var(--font-family);
    font-size: 0.875rem;
    font-weight: ${({ $isSelected }) => ($isSelected ? 'var(--font-semi-bold)' : 'var(--font-normal)')};
`;

const LeftIcon = styled(Icon)<$isSelected>`
    color: ${({ theme }) => theme.greys.black};
    padding-right: var(--spacing-half);
`;

const RightIcon = styled(Icon)<$isSelected>`
    color: ${({ theme }) => theme.greys.black};
    padding-left: var(--spacing-half);
`;

interface TabButtonProps {
    global?: boolean;
    id: string;
    children: string;
    panelId: string;
    leftIcon?: IconName
    rightIcon?: IconName;
    isSelected: boolean;

    onClick(): void;

    onKeyDown?(event: KeyboardEvent<HTMLButtonElement>): void;
}

export const TabButton = forwardRef(({
    global,
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
        $isGlobal={global}
        $isSelected={isSelected}
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
        <StyledButtonText data-testid="tab-button-text" $isSelected={isSelected}>
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
