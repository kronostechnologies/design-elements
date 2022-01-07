import { ReactElement, useMemo } from 'react';
import styled from 'styled-components';
import { Theme } from '../../themes';
import { focus } from '../../utils/css-state';
import { v4 as uuid } from '../../utils/uuid';
import { useDeviceContext } from '../device-context-provider/device-context-provider';

interface StyledLabelProps {
    theme: Theme;
    isMobile: boolean;
    disabled: boolean;
}
const StyledLabel = styled.label<StyledLabelProps>`
    ${({ disabled }) => (disabled ? '' : 'cursor: pointer;')}

    color: ${({ theme }) => theme.greys.black};
    font-size: ${({ isMobile }) => (isMobile ? 1 : 0.875)}rem;
    line-height: ${({ isMobile }) => (isMobile ? 2 : 1.5)}rem;
    margin-left: var(--spacing-1x);
    user-select: none;
`;

interface StyledButtonSpanProps {
    theme: Theme;
    isMobile: boolean;
}

const StyledButtonSpan = styled.span<StyledButtonSpanProps>`
    background: ${({ theme }) => theme.greys.white};
    border-radius: 100%;
    box-sizing: border-box;
    height: ${({ isMobile }) => (isMobile ? 22 : 16)}px;
    position: absolute;
    right: calc(100% - ${({ isMobile }) => (isMobile ? 26 : 19)}px);
    top: 50%;
    transform: translateY(-50%);
    width: ${({ isMobile }) => (isMobile ? 22 : 16)}px;
`;

interface StyledButtonProps {
    theme: Theme;
    isMobile: boolean
}

const StyledButton = styled.button<StyledButtonProps>`
    &:not([disabled]) {
        cursor: pointer;
    }

    background: ${({ theme }) => theme.notifications['success-1.1']};
    border: 1px solid ${({ theme }) => theme.notifications['success-1.1']};
    border-radius: ${({ isMobile }) => (isMobile ? 16 : 12)}px;
    height: ${({ isMobile }) => (isMobile ? 32 : 24)}px;
    position: relative;
    vertical-align: middle;
    width: ${({ isMobile }) => (isMobile ? 48 : 36)}px;

    &[aria-checked="false"] {
        background: ${({ theme }) => theme.greys['mid-grey']};
        border-color: ${({ theme }) => theme.greys['mid-grey']};

        ${StyledButtonSpan} {
            transition: right 0.1s ease-in-out;
        }
    }

    &[aria-checked="true"] > ${StyledButtonSpan} {
        right: ${({ isMobile }) => (isMobile ? 4 : 3)}px;
        transition: right 0.1s ease-in-out;
    }

    &:disabled {
        background: ${({ theme }) => theme.greys.grey};
        border-color: ${({ theme }) => theme.greys.grey};

        &[aria-checked="true"] {
            background: ${({ theme }) => theme.notifications['success-1.3']};
            border-color: ${({ theme }) => theme.notifications['success-1.3']};
        }
    }

    ${focus}
`;

interface ToggleSwitchProps {
    label: string;
    disabled?: boolean;
    toggled: boolean;
    onToggle(value: boolean): void;
}

export function ToggleSwitch({
    label, disabled, onToggle, toggled,
} : ToggleSwitchProps): ReactElement {
    const { isMobile } = useDeviceContext();
    const labelId = useMemo(uuid, []);
    const buttonId = useMemo(uuid, []);

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
            >
                <StyledButtonSpan isMobile={isMobile} />
            </StyledButton>
            <StyledLabel id={labelId} htmlFor={buttonId} isMobile={isMobile} disabled={!!disabled}>{label}</StyledLabel>
        </>
    );
}
