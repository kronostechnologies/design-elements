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
        return theme.ref['color-neutral-30'];
    }
    switch (passwordStrength) {
        case PasswordStrengthEnum.WEAK:
            return theme.ref['color-alert-50'];
        case PasswordStrengthEnum.FAIR:
            return theme.ref['color-warning-50'];
        case PasswordStrengthEnum.GOOD:
            return theme.ref['color-success-20'];
        case PasswordStrengthEnum.STRONG:
            return theme.ref['color-success-50'];
        default:
            return theme.ref['color-neutral-30'];
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
