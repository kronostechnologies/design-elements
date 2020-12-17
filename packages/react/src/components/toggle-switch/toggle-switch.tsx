import { focus } from '@design-elements/utils/css-state';
import React, { ReactElement, useMemo } from 'react';
import styled from 'styled-components';
import uuid from 'uuid/v4';
import { Theme } from '@design-elements/themes/theme';
import { useDeviceContext } from '@design-elements/components/device-context-provider/device-context-provider';

const StyledDiv = styled.div`
    position: relative;
`;

interface StyledLabelProps {
    theme: Theme;
    isMobile: boolean;
    disabled: boolean;
}
const StyledLabel = styled.label<StyledLabelProps>`
    ${({ disabled }) => (disabled ? '' : 'cursor: pointer;')}

    color: ${({ theme }) => theme.greys.black};
    display: block;
    font-size: ${({ isMobile }) => (isMobile ? 1 : 0.875)}rem;
    left: ${({ isMobile }) => (isMobile ? 56 : 42)}px;
    line-height: ${({ isMobile }) => (isMobile ? 2 : 1.5)}rem;
    position: relative;
    user-select: none;
`;

interface StyledButton {
    theme: Theme;
    disabled: boolean;
    isMobile: boolean
}
const StyledButton = styled.button<StyledButton>`
    ${({ disabled }) => (disabled ? '' : 'cursor: pointer;')}

    background: ${({ theme }) => theme.greens.green};
    border: 1px solid ${({ theme }) => theme.greens.green};
    border-radius: ${({ isMobile }) => (isMobile ? 16 : 12)}px;
    height: ${({ isMobile }) => (isMobile ? 32 : 24)}px;
    position: absolute;
    width: ${({ isMobile }) => (isMobile ? 48 : 36)}px;

    &[aria-checked="false"] {
        background: ${({ theme }) => theme.greys['mid-grey']};
        border-color: ${({ theme }) => theme.greys['mid-grey']};

        span {
            transition: right 0.1s ease-in-out;
        }
    }

    &[aria-checked="true"] > span {
        right: ${({ isMobile }) => (isMobile ? 4 : 3)}px;
        transition: right 0.1s ease-in-out;
    }

    &:disabled {
        background: ${({ theme }) => theme.greys.grey};
        border-color: ${({ theme }) => theme.greys.grey};

        &[aria-checked="true"] {
            background: ${({ theme }) => theme.greens['light-green']};
            border-color: ${({ theme }) => theme.greens['light-green']};
        }
    }

    ${(props) => focus(props)}
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
        onToggle?.(!toggled);
    };

    return (
        <>
            <StyledDiv>
                <StyledButton
                    id={buttonId}
                    role="switch"
                    aria-readonly={!!disabled}
                    aria-checked={toggled}
                    aria-labelledby={labelId}
                    data-testid="test-toggle-switch"
                    type="button"
                    isMobile={isMobile}
                    disabled={!!disabled}
                    onClick={!disabled ? handleClick : undefined}
                >
                    <StyledButtonSpan isMobile={isMobile} />
                </StyledButton>
            </StyledDiv>
            <StyledLabel id={labelId} htmlFor={buttonId} isMobile={isMobile} disabled={!!disabled}>{label}</StyledLabel>
        </>
    );
}
