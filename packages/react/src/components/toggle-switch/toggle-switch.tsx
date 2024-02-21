import { useMemo, VoidFunctionComponent } from 'react';
import styled from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { ResolvedTheme } from '../../themes/theme';
import { focus } from '../../utils/css-state';
import { v4 as uuid } from '../../utils/uuid';
import { useDeviceContext } from '../device-context-provider/device-context-provider';

interface StyledLabelProps {
    theme: ResolvedTheme;
    isMobile: boolean;
    disabled: boolean;
}
const StyledLabel = styled.label<StyledLabelProps>`
    color: ${({ theme }) => theme.component['toggle-switch-label-text-color']};
    font-size: ${({ isMobile }) => (isMobile ? 1 : 0.875)}rem;
    line-height: ${({ isMobile }) => (isMobile ? 2 : 1.5)}rem;
    margin-left: var(--spacing-1x);
    user-select: none;
`;

interface StyledButtonSpanProps {
    theme: ResolvedTheme;
    isMobile: boolean;
}

const StyledButtonSpan = styled.span<StyledButtonSpanProps>`
    background: ${({ theme }) => theme.component['toggle-switch-knob-background-color']};
    border-radius: 100%;
    box-sizing: border-box;
    height: ${({ isMobile }) => (isMobile ? 1.375 : 1)}rem;
    position: absolute;
    right: calc(100% - ${({ isMobile }) => (isMobile ? 1.625 : 1.1875)}rem);
    top: 50%;
    transform: translateY(-50%);
    width: ${({ isMobile }) => (isMobile ? 1.375 : 1)}rem;
`;

interface StyledButtonProps {
    theme: ResolvedTheme;
    isMobile: boolean
}

const StyledButton = styled.button<StyledButtonProps>`
    background: ${({ theme }) => theme.component['toggle-switch-container-toggled-background-color']};
    border: 1px solid ${({ theme }) => theme.component['toggle-switch-container-toggled-border-color']};
    border-radius: ${({ isMobile }) => (isMobile ? 1 : 0.75)}rem;
    height: ${({ isMobile }) => (isMobile ? 'var(--size-2x)' : 'var(--size-1halfx)')};
    position: relative;
    vertical-align: middle;
    width: ${({ isMobile }) => (isMobile ? 'var(--size-3x)' : 'var(--size-2halfx)')};

    ${({ theme }) => focus({ theme }, true)};

    &[aria-checked='false'] {
        background: ${({ theme }) => theme.component['toggle-switch-container-background-color']};
        border-color: ${({ theme }) => theme.component['toggle-switch-container-border-color']};

        ${StyledButtonSpan} {
            transition: right 0.1s ease-in-out;
        }
    }

    &[aria-checked='true'] > ${StyledButtonSpan} {
        right: ${({ isMobile }) => (isMobile ? 4 : 3)}px;
        transition: right 0.1s ease-in-out;
    }

    &:disabled {
        background: ${({ theme }) => theme.component['toggle-switch-container-disabled-background-color']};
        border-color: ${({ theme }) => theme.component['toggle-switch-container-disabled-border-color']};

        &[aria-checked='true'] {
            background: ${({ theme }) => theme.component['toggle-switch-container-disabled-toggled-background-color']};
            border-color: ${({ theme }) => theme.component['toggle-switch-container-disabled-toggled-border-color']};
        }
    }
`;

interface ToggleSwitchProps {
    label: string;
    disabled?: boolean;
    toggled: boolean;
    onToggle(value: boolean): void;
}

export const ToggleSwitch: VoidFunctionComponent<ToggleSwitchProps> = ({
    label,
    disabled,
    onToggle,
    toggled,
    ...otherProps
}) => {
    const { isMobile } = useDeviceContext();
    const labelId = useMemo(uuid, []);
    const buttonId = useMemo(uuid, []);
    const dataAttributes = useDataAttributes(otherProps);

    const handleClick = (): void => {
        onToggle(!toggled);
    };

    return (
        <>
            <StyledButton
                id={buttonId}
                role="switch"
                aria-readonly={!!disabled}
                aria-checked={toggled}
                aria-labelledby={labelId}
                data-testid="toggle-switch"
                type="button"
                isMobile={isMobile}
                disabled={disabled}
                onClick={handleClick}
                {...dataAttributes /* eslint-disable-line react/jsx-props-no-spreading */}
            >
                <StyledButtonSpan isMobile={isMobile} />
            </StyledButton>
            <StyledLabel id={labelId} htmlFor={buttonId} isMobile={isMobile} disabled={!!disabled}>{label}</StyledLabel>
        </>
    );
};
