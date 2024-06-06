import { focus } from "../../utils/css-state";
import { ResolvedTheme } from "../../themes/theme";
import styled from "styled-components";

interface StyledInputProps {
    disabled?: boolean,
    theme: ResolvedTheme,
    $valid: boolean
    $isMobile: boolean,
}

function getBorderColor({ disabled, theme, $valid }: StyledInputProps): string {
    if (disabled) {
        return theme.component['combobox-disabled-border-color'];
    }
    if (!$valid) {
        return theme.component['combobox-error-border-color'];
    }

    return theme.component['combobox-border-color'];
}

export const Textbox = styled.input<StyledInputProps>`
    background-color: ${({ disabled, theme }) => (disabled ? theme.component['combobox-disabled-background-color'] : theme.component['combobox-background-color'])};
    border: 1px solid ${getBorderColor};
    border-radius: var(--border-radius);
    box-sizing: border-box;
    color: ${({ disabled, theme }) => disabled && theme.component['combobox-disabled-text-color']};
    font-size: ${({ $isMobile }) => ($isMobile ? '1rem' : '0.875rem')};
    height: ${({ $isMobile }) => ($isMobile ? 'var(--size-2halfx)' : 'var(--size-2x)')};
    padding: 0 var(--spacing-1x);
    width: 100%;

    ${focus};
    
    &::placeholder {
        color: ${({ theme }) => theme.component['combobox-placeholder-text-color']};
        font-style: italic;
    }
`;

