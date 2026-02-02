import { ReactElement, useMemo, VoidFunctionComponent } from 'react';
import styled from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { ResolvedTheme } from '../../themes/theme';
import { focus } from '../../utils/css-state';
import { v4 as uuid } from '../../utils/uuid';
import { useDeviceContext } from '../device-context-provider/device-context-provider';

export type LabelPosition = 'left' | 'right';

interface StyledLabelProps {
    theme: ResolvedTheme;
    isMobile: boolean;
    disabled: boolean;
    labelPosition: LabelPosition;
}
const StyledLabel = styled.label<StyledLabelProps>`
    color: ${({ theme }) => theme.component['toggle-switch-label-text-color']};
    font-size: ${({ isMobile }) => (isMobile ? 1 : 0.875)}rem;
    line-height: ${({ isMobile }) => (isMobile ? 2 : 1.5)}rem;
    margin:
 ${({ labelPosition }) => (
        labelPosition === 'left'
            ? '0 var(--spacing-1x) 0 0'
            : '0 0 0 var(--spacing-1x)'
    )};
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
    background: ${({ theme }) => theme.component['toggle-switch-toggled-background-color']};
    border: 1px solid ${({ theme }) => theme.component['toggle-switch-toggled-border-color']};
    border-radius: ${({ isMobile }) => (isMobile ? 1 : 0.75)}rem;
    height: ${({ isMobile }) => (isMobile ? 'var(--size-2x)' : 'var(--size-1halfx)')};
    position: relative;
    vertical-align: middle;
    width: ${({ isMobile }) => (isMobile ? 'var(--size-3x)' : 'var(--size-2halfx)')};

    ${focus};

    &[aria-checked='false'] {
        background: ${({ theme }) => theme.component['toggle-switch-background-color']};
        border-color: ${({ theme }) => theme.component['toggle-switch-border-color']};

        ${StyledButtonSpan} {
            transition: right 0.1s ease-in-out;
        }
    }

    &[aria-checked='true'] > ${StyledButtonSpan} {
        right: ${({ isMobile }) => (isMobile ? 4 : 3)}px;
        transition: right 0.1s ease-in-out;
    }

    &:disabled {
        background: ${({ theme }) => theme.component['toggle-switch-disabled-background-color']};
        border-color: ${({ theme }) => theme.component['toggle-switch-disabled-border-color']};

        &[aria-checked='true'] {
            background: ${({ theme }) => theme.component['toggle-switch-disabled-toggled-background-color']};
            border-color: ${({ theme }) => theme.component['toggle-switch-disabled-toggled-border-color']};
        }
    }
`;

interface ToggleSwitchProps {
    label: string;
    labelPosition?: LabelPosition;
    disabled?: boolean;
    toggled: boolean;
    onToggle(value: boolean): void;
}

export const ToggleSwitch: VoidFunctionComponent<ToggleSwitchProps> = ({
    label,
    labelPosition = 'right',
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

    const renderLabel = (): ReactElement => (
        <StyledLabel
            id={labelId}
            data-testid="switch-label"
            htmlFor={buttonId}
            isMobile={isMobile}
            disabled={!!disabled}
            labelPosition={labelPosition}
        >
            {label}
        </StyledLabel>
    );

    return (
        <>
            {labelPosition === 'left' && renderLabel()}
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
            {labelPosition === 'right' && renderLabel()}
        </>
    );
};

ToggleSwitch.displayName = 'ToggleSwitch';
