import styled from "styled-components";
import { IconButton } from "../buttons/icon-button";

export const ArrowButton = styled(IconButton)<{ disabled?: boolean }>`
    align-items: center;
    background-color: ${({ theme }) => theme.component['combobox-arrow-button-background-color']};
    border: 0;
    color: ${({ disabled, theme }) => theme.component[`combobox-arrow-button${disabled ? '-disabled' : ''}-icon-color`]};    display: flex;
    height: var(--size-1x);
    padding: var(--spacing-half);
    position: absolute;
    right: 0;
    width: var(--size-1x);

    &:hover {
        background-color: ${({ theme }) => theme.component['combobox-arrow-button-hover-background-color']};
    }
`;
