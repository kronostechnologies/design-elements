import styled from "styled-components";
import { IconButton } from "../buttons/icon-button";

export const ClearButton = styled(IconButton)<{ disabled?: boolean }>`
    align-items: center;
    background-color: transparent;
    border: 0;
color: ${({ disabled, theme }) => (disabled ? theme.component['combobox-clear-button-disabled-icon-color'] : theme.component['combobox-clear-button-icon-color'])};    display: flex;
    height: var(--size-1x);
    padding: var(--spacing-half);
    position: absolute;
    right: calc(var(--size-1x) + var(--spacing-1halfx));
    width: var(--size-1x);

    &::after {
        border-right: ${({ theme }) => `1px solid ${theme.component['combobox-clear-button-border-right-color']}`};
        content: '';
        height: calc(var(--size-2x) - var(--spacing-2x));
        margin-left: var(--spacing-1x);
    }

    &:hover {
        background-color: transparent;
    }
`;
