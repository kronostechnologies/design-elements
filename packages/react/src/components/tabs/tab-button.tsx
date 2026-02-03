import { forwardRef, ReactElement, Ref } from 'react';
import styled, { css } from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { useTranslation } from '../../i18n/use-translation';
import { focus } from '../../utils/css-state';
import { IconButton } from '../buttons';
import { Icon } from '../icon';
import type { TabButtonProps, TabSize } from './types';

const StyledButton = styled.button<{ $size?: TabSize; $selected?: boolean; $removable?: boolean; }>`
    align-items: center;
    color: ${({ $selected, theme }) => ($selected ? theme.component['tab-button-selected-text-color'] : theme.component['tab-button-text-color'])};
    display: flex;
    font-family: var(--font-family);
    font-size: ${({ $size }) => ($size === 'medium' ? '0.875rem' : '0.75rem')};
    gap: var(--spacing-half);
    padding: ${({ $size }) => ($size === 'medium' ? '0 var(--spacing-2x)' : '0 var(--spacing-1x)')};
    padding-right: ${({ $removable }) => ($removable && 'var(--spacing-4x)')};
    position: relative;
    user-select: none;

    &:hover {
        color: ${({ theme }) => theme.component['tab-button-hover-text-color']};
    }

    &::after {
        bottom: 0;
        content: '';
        display: block;
        height: ${({ $size }) => ($size === 'medium' ? '0.25rem' : '0.125rem')};
        left: 0;
        position: absolute;
        width: 100%;
    }

    ${({ theme }) => focus({ theme }, { focusType: 'focus-visible', insideOnly: true })};

    ${({ $selected, theme }) => !$selected && css`
        &:active {
            color: ${theme.component['tab-button-active-text-color']};
            font-weight: var(--font-semi-bold);

            &::after {
                background-color: ${theme.component['tab-button-indicator-active-background-color']} !important;
            }
        }
    `}

    ${({ $selected, theme }) => $selected && css`
        font-weight: var(--font-semi-bold);

        &::after {
            background-color: ${theme.component['tab-button-indicator-selected-background-color']};
        }
    `}
`;

const StyledButtonIcon = styled(Icon)`
    color: ${({ theme }) => theme.component['tab-button-icon-color']};
    vertical-align: middle;
`;

const StyledTab = styled.div<{ $selected: boolean; }>`
    display: flex;
    position: relative;

    ${({ $selected, theme }) => !$selected && css`
        &:hover {
            ${StyledButton} {
                &::after {
                    background-color: ${theme.component['tab-button-indicator-hover-background-color']};
                    color: ${theme.component['tab-button-hover-text-color']};
                }
            }
        }
    `};
`;

const DeleteButton = styled(IconButton)`
    position: absolute;
    right: var(--spacing-1x);
    top: 50%;
    transform: translateY(-50%);
`;

const ButtonLabel = styled.span`
    // Prevent width shifting between normal and semi-bold
    &::after {
        content: attr(data-content);
        display: block;
        font-weight: var(--font-semi-bold);
        height: 0;
        visibility: hidden;
    }
`;

export const TabButton = forwardRef(({
    size,
    id,
    panelId,
    children,
    leftIcon,
    rightIcon,
    isSelected,
    onClick,
    onRemove,
    onKeyDown,
    ...rest
}: TabButtonProps, ref: Ref<HTMLButtonElement>): ReactElement => {
    const { t } = useTranslation('tabs');
    const dataAttributes = useDataAttributes(rest);
    const dataTestId = dataAttributes['data-testid'] ?? 'tab';
    const hasRemove = !!onRemove;

    return (
        <StyledTab
            $selected={isSelected}
            data-testid={dataTestId}
            onKeyDown={onKeyDown}
        >
            <StyledButton
                type="button"
                id={id}
                aria-controls={panelId}
                role="tab"
                aria-selected={isSelected}
                ref={ref}
                data-testid={`${dataTestId}-button`}
                tabIndex={isSelected ? undefined : -1}
                onClick={onClick}
                $removable={hasRemove}
                $selected={isSelected}
                $size={size}
            >
                {leftIcon && (
                    <StyledButtonIcon
                        aria-hidden="true"
                        data-testid={`${dataTestId}-left-icon`}
                        name={leftIcon}
                        size="16"
                    />
                )}
                <ButtonLabel data-testid={`${dataTestId}-text`} data-content={children}>
                    {children}
                </ButtonLabel>
                {rightIcon && (
                    <StyledButtonIcon
                        aria-hidden="true"
                        data-testid={`${dataTestId}-right-icon`}
                        name={rightIcon}
                        size="16"
                    />
                )}
            </StyledButton>
            {hasRemove && (
                <DeleteButton
                    buttonType="tertiary"
                    onClick={() => onRemove()}
                    data-testid={`${dataTestId}-delete`}
                    aria-label={t('dismissTab', { label: children })}
                    iconName='x'
                    focusable={isSelected}
                    size="small"
                />
            )}
        </StyledTab>
    );
});

TabButton.displayName = 'TabButton';
