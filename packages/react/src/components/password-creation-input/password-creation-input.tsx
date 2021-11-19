import { Icon } from '../icon/icon';
import { IconButton } from '../buttons/icon-button';
import React, { ChangeEvent, ReactElement, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';

const StyledUl = styled.ul`
    font-size: 12px;
    margin: 0;
    padding: 0;
    margin-bottom: var(--spacing-1x);
`;

const StyledLi = styled.li<{ isEmpty: boolean, isSuccess: boolean }>`
    padding-left: var(--spacing-1x);
    display: flex;
    align-items: center;
    height: 16px;
    ::marker {
        line-height: 16px;
        font-size: 11px;
    }

    ${({ isSuccess, isEmpty, theme }) => {
        if (isEmpty) {
            return `
                display: list-item;
                list-style-type: disc;
                list-style-position: inside;
                color: ${theme.greys['dark-grey']}
            `;
        }

        if (isSuccess) {
            return `
                color: green;
                list-style: none;
            `;
        }
        return `
            color: red;
            list-style: none;
        `;
    }};
`;

const StyledIcon = styled(Icon)`
    margin-left: -6px;
    margin-right: 6px;
`;

const StyledSpan = styled.span`
    position: relative;
    left: var(--spacing-1x);
    height: var(--spacing-2x);
`;

const StyledInput = styled.input`
    flex: 1;
    height: var(--spacing-3x);
    max-width: 210px;
    margin-bottom: 0;
    border-radius: 4px;
`;

const StyledIconButton = styled(IconButton)`
    border-radius: 0;
    :hover {
        background-color: transparent;
    }
    margin-left: -32px;
    height: var(--spacing-3x);
    margin-bottom: var(--spacing-1x);
`;

const ButtonContainer = styled.div`
    display: flex;
    max-width: 210px;
`;

const PasswordMeterContainer = styled.div`
    display: flex;
    width: 100%;
    max-width: 210px;
    div:last-child {
        margin-right: 0;
    }
`;

const ProgressBar = styled.div<{ isFilled: boolean, passwordStrength: string }>`
    background-color: ${({ isFilled, theme }) => (isFilled ? 'green' : theme.greys['mid-grey'])};
    background-color: ${({ isFilled, theme, passwordStrength }) => {
        if (!isFilled) {
            return theme.greys['mid-grey'];
        }

        if (passwordStrength === 'good') {
            return '#81c200';
        }
        if (passwordStrength === 'strong') {
            return '#008533';
        }
        if (passwordStrength === 'fair') {
            return '#ffb302';
        }

        return '#cd2c23';
    }};
    height: 4px;
    width: 100%;
    margin: 4px var(--spacing-1x) 4px 0;
`;

interface PasswordCreationInputProps {
    onChange(event: ChangeEvent<HTMLInputElement>, isValid: boolean): void;
}

export function PasswordCreationInput({ onChange }: PasswordCreationInputProps): ReactElement {
    const { t } = useTranslation('password-creation-input');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    let passwordStrengthLabel = '';
    let passwordStrength = 'weak';
    const [password, setPassword] = useState<string>('');
    const isEmpty = password.length === 0;
    const isLongEnough = password.length >= 8;
    const isVeryLong = password.length >= 12;
    const hasAnUpperCaseLetter = password.toLowerCase() !== password;
    const hasALowerCaseLetter = password.toUpperCase() !== password;
    const successIcon = <StyledIcon size="16" name="check" aria-hidden="true" />;
    const failureIcon = <StyledIcon size="16" name="alertTriangle" aria-hidden="true" />;
    let lengthConditionIcon;
    let upperCaseConditionIcon;
    let lowerCaseConditionIcon;
    if (!isEmpty) {
        lengthConditionIcon = isLongEnough ? successIcon : failureIcon;
        upperCaseConditionIcon = hasAnUpperCaseLetter ? successIcon : failureIcon;
        lowerCaseConditionIcon = hasALowerCaseLetter ? successIcon : failureIcon;
    }

    if (!isEmpty && !isLongEnough) {
        passwordStrengthLabel = t('weak');
        passwordStrength = 'weak';
    }

    if (isLongEnough || (hasAnUpperCaseLetter && hasALowerCaseLetter)) {
        passwordStrengthLabel = t('fair');
        passwordStrength = 'fair';
    }

    if (isLongEnough && hasAnUpperCaseLetter && hasALowerCaseLetter) {
        passwordStrengthLabel = t('good');
        passwordStrength = 'good';
        if (password.length > 8) {
            passwordStrengthLabel = t('strong');
            passwordStrength = 'strong';
        }
    }
    if (passwordStrengthLabel) {
        passwordStrengthLabel = t('password-is') + passwordStrengthLabel;
    }

    const handleShowPassword = (): void => {
        setShowPassword(!showPassword);
    };

    const handlePasswordChanged = (event: ChangeEvent<HTMLInputElement>): void => {
        setPassword(event.target.value);
        const isValid = isLongEnough && hasALowerCaseLetter && hasAnUpperCaseLetter;
        onChange(event, isValid);
    };

    return (
        <>
            <label>{t('create-password')}</label>
            <div id="idHint" aria-live="assertive" aria-hidden="true" aria-atomic="true">
                <StyledUl>
                    <StyledLi isEmpty={isEmpty} isSuccess={isLongEnough}>
                        {lengthConditionIcon}
                        <StyledSpan>{t('min-8-characters')}</StyledSpan>
                    </StyledLi>
                    <StyledLi isEmpty={isEmpty} isSuccess={hasAnUpperCaseLetter}>
                        {upperCaseConditionIcon}
                        <StyledSpan>{t('min-1-upper-case')}</StyledSpan>
                    </StyledLi>
                    <StyledLi isEmpty={isEmpty} isSuccess={hasALowerCaseLetter}>
                        {lowerCaseConditionIcon}
                        <StyledSpan>{t('min-1-lower-case')}</StyledSpan>
                    </StyledLi>
                </StyledUl>
            </div>
            <ButtonContainer>
                <StyledInput
                    id="password"
                    name="password"
                    autoComplete="new-password"
                    aria-describedby="idHint idPasswordStrength"
                    aria-invalid="false"
                    onChange={handlePasswordChanged}
                    data-testid="password-input"
                    type={showPassword ? 'text' : 'password'}
                />
                <StyledIconButton
                    buttonType="tertiary"
                    aria-label={t('show-password')}
                    iconName={showPassword ? 'eye' : 'eyeOff'}
                    aria-pressed="false"
                    data-testid="show-password-button"
                    type="button"
                    onClick={handleShowPassword}
                />
            </ButtonContainer>
            <PasswordMeterContainer id="idPasswordMeter">
                <ProgressBar
                    passwordStrength={passwordStrength}
                    isFilled={isLongEnough || hasALowerCaseLetter || hasAnUpperCaseLetter}
                />
                <ProgressBar
                    passwordStrength={passwordStrength}
                    isFilled={isLongEnough || (hasAnUpperCaseLetter && hasALowerCaseLetter)}
                />
                <ProgressBar
                    passwordStrength={passwordStrength}
                    isFilled={isLongEnough && hasAnUpperCaseLetter && hasALowerCaseLetter}
                />
                <ProgressBar
                    passwordStrength={passwordStrength}
                    isFilled={isLongEnough && hasAnUpperCaseLetter && hasALowerCaseLetter && isVeryLong}
                />
            </PasswordMeterContainer>
            <div
                id="idPasswordStrength"
                aria-live="polite"
                aria-hidden="true"
                data-testid="password-strength"
            >
                {passwordStrengthLabel}
            </div>
        </>
    );
}
