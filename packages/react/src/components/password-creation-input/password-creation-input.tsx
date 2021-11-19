import React, { ChangeEvent, useState, VoidFunctionComponent } from 'react';
import styled from 'styled-components';
import { IconButton } from '../buttons/icon-button';
import { TextInput } from '../text-input/text-input';
import { useTranslation } from '../../i18n/use-translation';
import { getPasswordStrength } from './password-strength';
import { PasswordStrengthMeter } from './password-strength-meter';
import { PasswordCondition } from './password-condition';
import { getDefaultValidationConditions, ValidationCondition } from './validation-condition';

const StyledUl = styled.ul`
    font-size: 0.75rem;
    margin-bottom: var(--spacing-1x);
    margin: 0;
    padding: 0;
`;

const PasswordContainer = styled.div`
    display: flex;
    margin-bottom: var(--spacing-1x);
`;

const StyledInput = styled(TextInput)`
    flex: 1;
    height: var(--spacing-3x);
    margin-bottom: 0;

    input {
        border-width: 1px 0 1px 1px;
        border-radius: var(--border-radius) 0 0 var(--border-radius);
    }
`;

const StyledIconButton = styled(IconButton)`
    background: ${({ theme }) => theme.greys.white};
    border-radius: 0;
    border-color: ${({ theme }) => theme.greys['dark-grey']};
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
    border-type: solid;
    border-width: 1px 1px 1px 0;
    height: 100%;

    :hover {
        background-color: transparent;
    }
`;

interface PasswordCreationInputProps {
    onChange(event: ChangeEvent<HTMLInputElement>, isValid: boolean): void;
    validations?: ValidationCondition[];
}

export const PasswordCreationInput: VoidFunctionComponent<PasswordCreationInputProps> = ({ onChange, validations }) => {
    const { t } = useTranslation('password-creation-input');
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const isEmpty = password.length === 0;
    const { strength: passwordStrength, label: passwordStrengthLabel } = getPasswordStrength(password, t);
    const conditions = validations ?? getDefaultValidationConditions(t);

    const handleShowPassword = (): void => {
        setShowPassword(!showPassword);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const newPassword = event.target.value;
        setPassword(newPassword);
        const isValid = conditions.every((condition) => condition.isValid(newPassword));
        onChange(event, isValid);
    };

    return (
        <>
            <label>{t('create-password')}</label>
            <div id="idHint" aria-live="assertive" aria-hidden="true" aria-atomic="true">
                <StyledUl>
                    {conditions.map((condition) => (
                        <PasswordCondition
                            key={condition.label}
                            password={password}
                            condition={condition}
                            isEmpty={isEmpty}
                        />
                    ))}
                </StyledUl>
            </div>
            <PasswordContainer>
                <StyledInput
                    id="password"
                    name="password"
                    autoComplete="new-password"
                    aria-describedby="idHint idPasswordStrength"
                    aria-invalid="false"
                    onChange={handleChange}
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
            </PasswordContainer>
            <PasswordStrengthMeter strength={passwordStrength} />
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
};
