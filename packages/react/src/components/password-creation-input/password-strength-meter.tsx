import React, { VoidFunctionComponent } from 'react';
import styled, { StyledProps } from 'styled-components';
import { PasswordStrengthEnum } from './password-strength';

const PasswordMeterContainer = styled.div`
    display: flex;
    width: 100%;
`;

function getContainerBackgroundColor(
    { isFilled, passwordStrength, theme }: StyledProps<{ isFilled: boolean; passwordStrength: PasswordStrengthEnum }>,
): string {
    if (!isFilled) {
        return theme.greys['mid-grey'];
    }
    switch (passwordStrength) {
        case PasswordStrengthEnum.Weak:
            return '#cd2c23';
        case PasswordStrengthEnum.Fair:
            return '#ffb302';
        case PasswordStrengthEnum.Good:
            return '#81c200';
        case PasswordStrengthEnum.Strong:
            return '#008533';
        default:
            return theme.greys['mid-grey'];
    }
}

const ProgressBar = styled.div<{ isFilled: boolean, passwordStrength: PasswordStrengthEnum }>`
    background-color: ${getContainerBackgroundColor};
    height: 4px;
    margin: var(--spacing-half) var(--spacing-1x) var(--spacing-1x) 0;
    width: 100%;

    &:last-child {
        margin-right: 0;
    }
`;

interface PasswordStrengthMeterProps {
    strength: PasswordStrengthEnum;
}

export const PasswordStrengthMeter: VoidFunctionComponent<PasswordStrengthMeterProps> = ({ strength }) => (
    <PasswordMeterContainer id="idPasswordMeter">
        <ProgressBar
            passwordStrength={strength}
            isFilled={strength > PasswordStrengthEnum.None}
        />
        <ProgressBar
            passwordStrength={strength}
            isFilled={strength > PasswordStrengthEnum.Weak}
        />
        <ProgressBar
            passwordStrength={strength}
            isFilled={strength > PasswordStrengthEnum.Fair}
        />
        <ProgressBar
            passwordStrength={strength}
            isFilled={strength > PasswordStrengthEnum.Good}
        />
    </PasswordMeterContainer>
);
