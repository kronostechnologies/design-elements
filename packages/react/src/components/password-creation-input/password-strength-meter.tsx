import { type FC } from 'react';
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
        return theme.component['password-strength-meter-empty-color'];
    }
    switch (passwordStrength) {
        case PasswordStrengthEnum.WEAK:
            return theme.component['password-strength-meter-weak-color'];
        case PasswordStrengthEnum.FAIR:
            return theme.component['password-strength-meter-fair-color'];
        case PasswordStrengthEnum.GOOD:
            return theme.component['password-strength-meter-good-color'];
        case PasswordStrengthEnum.STRONG:
            return theme.component['password-strength-meter-strong-color'];
        default:
            return theme.component['password-strength-meter-empty-color'];
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

export const PasswordStrengthMeter: FC<PasswordStrengthMeterProps> = ({ strength }) => (
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

PasswordStrengthMeter.displayName = 'PasswordStrengthMeter';
