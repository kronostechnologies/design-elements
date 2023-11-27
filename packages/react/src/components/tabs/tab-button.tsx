import { forwardRef, KeyboardEvent, ReactElement, Ref } from 'react';
import styled, { css } from 'styled-components';
import { focus, focusVisibleReset } from '../../utils/css-state';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon, IconName } from '../icon/icon';

interface IsSelected {
    $isSelected: boolean;
}

interface StyledButtonProps extends IsSelected {
    $isGlobal?: boolean;
    $isMobile: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
    align-items: center;
    border-bottom: ${({ $isGlobal, theme }) => ($isGlobal ? 'none' : `1px solid ${theme.ref['color-neutral-50']}`)};
    bottom: -1px;
    color: ${({ $isGlobal, theme }) => ($isGlobal ? `${theme.ref['color-neutral-90']}` : `${theme.ref['color-neutral-50']}`)};
    cursor: pointer;
    display: flex;
    justify-content: center;
    line-height: 1.5rem;
    min-height: ${({ $isMobile }) => ($isMobile ? 'var(--size-3halfx)' : 'var(--size-3x)')};
    min-width: 82px;
    padding: 0 var(--spacing-2x);
    position: relative;

    &:hover {
        background-color: ${({ theme }) => theme.ref['color-neutral-15']};
    }

    ${focus};
    ${({ theme }) => focus({ theme }, false, ':focus-visible')};
    ${focusVisibleReset};

    &:focus {
        z-index: 2;
    }

    ${({ $isGlobal, $isSelected, theme }) => ($isGlobal && $isSelected) && css`
        z-index: 1;

        ::after {
            background-color: ${theme.ref['color-brand-50']};
            bottom: 0;
            content: '';
            display: block;
            height: 4px;
            left: 0;
            position: absolute;
            width: 100%;
        }
    `}

    ${({ $isGlobal, $isSelected, theme }) => (!$isGlobal && $isSelected) && css`
        background-color: ${theme.ref['color-white']};
        border: 1px solid ${theme.ref['color-neutral-50']};
        border-bottom: 1px solid transparent;
        border-radius: var(--border-radius-2x) var(--border-radius-2x) 0 0;
        color: ${theme.ref['color-neutral-90']};
        z-index: 1;
    `}
`;

const StyledButtonText = styled.span<IsSelected & { $isMobile: boolean; }>`
    color: ${({ theme }) => theme.ref['color-black']};
    font-family: var(--font-family);
    font-size: ${({ $isMobile }) => ($isMobile ? 1 : 0.875)}rem;
    font-weight: ${({ $isSelected }) => ($isSelected ? 'var(--font-semi-bold)' : 'var(--font-normal)')};
    line-height: 1.5rem;
`;

const LeftIcon = styled(Icon)<IsSelected>`
    color: ${({ theme }) => theme.ref['color-black']};
    height: 1rem;
    min-width: fit-content;
    padding-right: var(--spacing-half);
    width: 1rem;
`;

const RightIcon = styled(Icon)<IsSelected>`
    color: ${({ theme }) => theme.ref['color-black']};
    height: 1rem;
    min-width: fit-content;
    padding-left: var(--spacing-half);
    width: 1rem;
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
}: TabButtonProps, ref: Ref<HTMLButtonElement>): ReactElement => {
    const { isMobile } = useDeviceContext();

    return (
        <StyledButton
            id={id}
            aria-controls={panelId}
            role="tab"
            aria-selected={isSelected}
            ref={ref}
            data-testid="tab-button"
            tabIndex={isSelected ? undefined : -1}
            $isGlobal={global}
            $isMobile={isMobile}
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
            <StyledButtonText data-testid="tab-button-text" $isSelected={isSelected} $isMobile={isMobile}>
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
});
