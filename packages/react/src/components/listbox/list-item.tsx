import styled, { css } from 'styled-components';

export interface ListItemProps {
    $disabled?: boolean;
    $isMobile?: boolean;
    $selected?: boolean;
    $focused?: boolean;
    $multiselect?: boolean;
}

export const ListItem = styled.li<ListItemProps>`
    align-items: center;
    color: ${({ $disabled, theme }) => ($disabled ? theme.component['listbox-item-disabled-text-color'] : theme.component['listbox-item-text-color'])};
    display: flex;
    font-size: ${({ $isMobile }) => ($isMobile ? '1rem' : '0.875rem')};
    font-weight: ${({ $selected }) => ($selected ? 'var(--font-semi-bold)' : 'var(--font-normal)')};
    line-height: var(--size-1halfx);
    min-height: var(--size-1halfx);
    padding: var(--spacing-half) var(--spacing-2x);
    position: relative;
    user-select: none;

    &:hover {
        background-color: ${({ theme, $disabled }) => ($disabled ? theme.component['listbox-item-disabled-background-color'] : theme.component['listbox-item-hover-background-color'])};
    }

    ${({ $focused, $disabled, theme }) => ($focused && css`
        outline: 2px solid ${$disabled ? 'transparent' : theme.component['focus-outside-border-color']};
        outline-offset: -2px;
    `)}

    ${({ $selected, $multiselect }) => (!$multiselect && css`
        &::before {
            background-color: ${({ theme }) => theme.component['listbox-item-indicator-selected-color']};
            content: '';
            display: block;
            height: 100%;
            left: 0;
            position: absolute;
            visibility: ${$selected ? 'visible' : 'hidden'};
            width: 4px;
        }
    `)}
`;
