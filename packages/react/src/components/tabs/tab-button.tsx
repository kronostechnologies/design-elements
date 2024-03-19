import { forwardRef, KeyboardEvent, ReactElement, Ref } from 'react';
import styled, { css } from 'styled-components';
import { IconButton } from '../buttons/icon-button';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { useTranslation } from '../../i18n/use-translation';
import { focus, focusVisibleReset } from '../../utils/css-state';
import { Icon, IconName } from '../icon/icon';

const selectedIndicatorPosition = (global: boolean | undefined): string => (global ? 'bottom: 0' : 'top: 0');

const StyledButton = styled.button<{ $global?: boolean; $isSelected?: boolean; $removable?: boolean; }>`
    align-items: center;
    color: ${({ $isSelected, theme }) => ($isSelected ? theme.component['tabs-tab-selected-text-color'] : theme.component['tabs-tab-text-color'])};
    display: flex;
    font-family: var(--font-family);
    font-size: 0.875rem;
    gap: var(--spacing-half);
    padding: 0 var(--spacing-2x);
    padding-right: ${({ $removable }) => ($removable && 'var(--spacing-4x)')};
    position: relative;
    user-select: none;

    &::after {
        content: '';
        display: block;
        height: 4px;
        left: 0;
        position: absolute;
        width: 100%;
        ${({ $global }) => selectedIndicatorPosition($global)};
    }

    ${({ $isSelected, theme }) => !$isSelected && css`
        &:active {
            color: ${theme.component['tabs-tab-active-text-color']};
            font-weight: var(--font-semi-bold);

            &::after {
                background-color: ${theme.component['tabs-tab-active-indicator-color']} !important;
            }
        }
    `}

    ${({ $isSelected, theme }) => $isSelected && css`
        background: ${theme.greys.white};
        font-weight: var(--font-semi-bold);

        &::after {
            background-color: ${theme.component['tabs-tab-selected-indicator-color']};
        }
    `}

    ${focus};
    ${focusVisibleReset};
`;

const StyledButtonIcon = styled(Icon)`
    color: ${({ theme }) => theme.component['tabs-tab-icon-color']};
    vertical-align: middle;
`;

const StyledTab = styled.div<{ $isSelected: boolean; }>`
    display: flex;
    position: relative;

    ${({ $isSelected, theme }) => !$isSelected && css`
        &:hover {
            ${StyledButton} {
                &::after {
                    background-color: ${theme.component['tabs-tab-hover-indicator-color']};
                    color: ${theme.component['tabs-tab-hover-text-color']};
                }
            }
        }
    `};
`;

const DeleteButton = styled(IconButton)`
    min-height: var(--size-1x);
    min-width: var(--size-1x);
    padding: 0;
    position: absolute;
    right: var(--spacing-1halfx);
    top: 50%;
    transform: translateY(-50%);
    width: var(--size-1x);
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

interface TabButtonProps {
    global?: boolean;
    id: string;
    children: string;
    panelId: string;
    leftIcon?: IconName
    rightIcon?: IconName;
    isSelected: boolean;
    onClick(): void;
    onRemove?(tabId: string): void;
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
    onRemove,
    onKeyDown,
    ...rest
}: TabButtonProps, ref: Ref<HTMLButtonElement>): ReactElement => {
    const { t } = useTranslation('tabs');
    const dataAttributes = useDataAttributes(rest);
    const dataTestId = dataAttributes['data-testid'];
    const hasRemove = !!onRemove;

    return (
        <StyledTab $isSelected={isSelected} data-testid={dataTestId}>
            <StyledButton
                type="button"
                id={id}
                aria-controls={panelId}
                role="tab"
                aria-selected={isSelected}
                ref={ref}
                data-testid="tab-button"
                tabIndex={isSelected ? undefined : -1}
                onClick={onClick}
                onKeyDown={onKeyDown}
                $removable={hasRemove}
                $isSelected={isSelected}
                $global={global}
            >
                {leftIcon && (
                    <StyledButtonIcon
                        aria-hidden="true"
                        data-testid="tabs-tab-left-icon"
                        name={leftIcon}
                        size="16"
                    />
                )}
                <ButtonLabel data-testid="tabs-tab-text" data-content={children}>
                    {children}
                </ButtonLabel>
                {rightIcon && (
                    <StyledButtonIcon
                        aria-hidden="true"
                        data-testid="tabs-tab-right-icon"
                        name={rightIcon}
                        size="16"
                    />
                )}
            </StyledButton>
            {hasRemove && (
                <DeleteButton
                    buttonType="tertiary"
                    onClick={() => onRemove(id)}
                    data-testid="tab-delete"
                    aria-label={t('dismissTab', { label: children })}
                    iconName='x'
                />
            )}
        </StyledTab>
    );
});
