import { ChangeEvent, type FC, useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { useTranslation } from '../../i18n/use-translation';
import { v4 as uuid } from '../../utils/uuid';
import { IconButton } from '../buttons';
import { useDeviceContext } from '../device-context-provider';
import { FieldContainer } from '../field-container';
import { inputsStyle } from '../text-input/styles';
import { Tooltip } from '../tooltip';
import { PasswordRule } from './password-rule';
import { getPasswordStrength } from './password-strength';
import { PasswordStrengthContainer } from './password-strength-container';
import { getDefaultValidationConditions, ValidationCondition } from './validation-condition';

const StyledUl = styled.ul`
    font-size: 0.75rem;
    margin: 0 0 var(--spacing-half) 0;
    padding: 0;
`;

const PasswordInputContainer = styled.div`
    align-items: center;
    display: flex;
    margin-bottom: var(--spacing-1x);
    position: relative;
`;

const StyledInput = styled.input<{ isMobile: boolean }>`
    ${({ theme, isMobile }) => inputsStyle({ theme, isMobile, isFocusable: true })};
    padding-right: var(--size-2x);
`;

const ShowPasswordButton = styled.div`
    position: absolute;
    right: 0.25rem;
`;

export interface PasswordCreationInputProps {
    name?: string;
    id?: string;
    onChange(newPassword: string, isValid: boolean, event: ChangeEvent<HTMLInputElement>): void;
    validations?: ValidationCondition[];
    liveValidation?: boolean;
    validateField?: (triggerValidation: () => void) => void;
}

function isPasswordValid(conditions: ValidationCondition[], value: string): boolean {
    return conditions.every((condition) => condition.isValid(value));
}

export const PasswordCreationInput: FC<PasswordCreationInputProps> = ({
    id: providedId,
    name,
    onChange,
    validations,
    liveValidation = true,
    validateField,
    ...otherProps
}) => {
    const { t } = useTranslation('password-creation-input');
    const { isMobile } = useDeviceContext();
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [manuallyTriggered, setManuallyTriggered] = useState(false);
    const [frozenPassword, setFrozenPassword] = useState('');
    const isEmpty = password.length === 0;
    const strength = getPasswordStrength(password);
    const conditions = validations ?? getDefaultValidationConditions(t);
    const passwordStrengthId = useMemo(() => uuid(), []);
    const id = useMemo(() => providedId || uuid(), [providedId]);
    const hintId = useMemo(() => uuid(), []);
    const isValid = isPasswordValid(conditions, password);
    const dataAttributes = useDataAttributes(otherProps);

    const shouldShowValidation = liveValidation || manuallyTriggered;

    let passwordToValidate = password;
    if (!liveValidation && manuallyTriggered) {
        passwordToValidate = frozenPassword;
    }

    const triggerValidation = useCallback(() => {
        setManuallyTriggered(true);
        setFrozenPassword(password);
    }, [password]);

    useEffect(() => {
        if (validateField) {
            validateField(triggerValidation);
        }
    }, [validateField, triggerValidation]);

    const handleShowPassword = (): void => {
        setShowPassword(!showPassword);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const newPassword = event.target.value;
        setPassword(newPassword);
        const newPasswordIsValid = isPasswordValid(conditions, newPassword);
        onChange(newPassword, newPasswordIsValid, event);
    };

    return (
        <FieldContainer
            fieldId={id}
            label={t('create-password')}
            validationErrorMessage=""
            noInvalidFieldIcon
            valid={isValid || isEmpty}
        >
            <div id={hintId} aria-live="assertive" aria-hidden="true" aria-atomic="true">
                <StyledUl>
                    {conditions.map((condition) => (
                        <PasswordRule
                            key={condition.label}
                            label={condition.label}
                            isValid={condition.isValid(passwordToValidate)}
                            isEmpty={passwordToValidate.length === 0}
                            showValidation={shouldShowValidation}
                            isManuallyTriggered={manuallyTriggered}
                        />
                    ))}
                </StyledUl>
            </div>
            <PasswordInputContainer>
                <StyledInput
                    id={id}
                    name={name ?? 'password'}
                    autoComplete="new-password"
                    aria-describedby={`${hintId} ${passwordStrengthId}`}
                    aria-invalid={!isValid}
                    onChange={handleChange}
                    data-testid="password-input"
                    type={showPassword ? 'text' : 'password'}
                    isMobile={isMobile}
                    {...dataAttributes /* eslint-disable-line react/jsx-props-no-spreading */}
                />
                <ShowPasswordButton>
                    <Tooltip
                        desktopPlacement="top"
                        label={showPassword ? t('hide-password') : t('show-password')}
                    >
                        <IconButton
                            buttonType="tertiary"
                            aria-label={t('show-password')}
                            iconName={showPassword ? 'eyeOff' : 'eye'}
                            aria-pressed={showPassword}
                            data-testid="show-password-button"
                            type="button"
                            onClick={handleShowPassword}
                            size="small"
                        />
                    </Tooltip>
                </ShowPasswordButton>
            </PasswordInputContainer>
            {liveValidation && (
                <PasswordStrengthContainer strength={strength} id={passwordStrengthId} />
            )}
        </FieldContainer>
    );
};

PasswordCreationInput.displayName = 'PasswordCreationInput';
