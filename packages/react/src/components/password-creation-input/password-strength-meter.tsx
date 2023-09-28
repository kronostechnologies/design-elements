import { VoidFunctionComponent } from 'react';
import styled, { StyledProps } from 'styled-components';
import { PasswordStrengthEnum } from './password-strength.enum';

const PasswordMeterContainer = styled.div`
    display: flex;
    width: 100%;
`;

interface ProgressBarProps {
    isFilled: boolean;
    passwordStrength: PasswordStrengthEnum;
}

function getContainerBackgroundColor(
    { isFilled, passwordStrength, theme }: StyledProps<ProgressBarProps>,
): string {
    if (!isFilled) {
        return theme.colors['mid-grey'];
    }
    switch (passwordStrength) {
        case PasswordStrengthEnum.WEAK:
            return theme.colors['alert-2.1'];
        case PasswordStrengthEnum.FAIR:
            return theme.colors['warning-3.3'];
        case PasswordStrengthEnum.GOOD:
            return theme.colors['success-1.3'];
        case PasswordStrengthEnum.STRONG:
            return theme.colors['success-1.1'];
        default:
            return theme.colors['mid-grey'];
    }
}

const ProgressBar = styled.div<ProgressBarProps>`
    background-color: ${getContainerBackgroundColor};
    height: 0.25rem;
    margin-right: var(--spacing-1x);
    width: 100%;

    &:last-child {
        margin-right: 0;
    }
`;

interface PasswordStrengthMeterProps {
    strength: PasswordStrengthEnum;
}

export const PasswordStrengthMeter: VoidFunctionComponent<PasswordStrengthMeterProps> = ({ strength }) => (
    <PasswordMeterContainer>
        <ProgressBar
            passwordStrength={strength}
            isFilled={strength > PasswordStrengthEnum.NONE}
        />
        <ProgressBar
            passwordStrength={strength}
            isFilled={strength > PasswordStrengthEnum.WEAK}
        />
        <ProgressBar
            passwordStrength={strength}
            isFilled={strength > PasswordStrengthEnum.FAIR}
        />
        <ProgressBar
            passwordStrength={strength}
            isFilled={strength > PasswordStrengthEnum.GOOD}
        />
    </PasswordMeterContainer>
);
