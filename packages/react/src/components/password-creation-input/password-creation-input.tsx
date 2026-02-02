import { ChangeEvent, useState, VoidFunctionComponent, useMemo } from 'react';
import styled from 'styled-components';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { IconButton } from '../buttons/icon-button';
import { FieldContainer } from '../field-container/field-container';
import { useTranslation } from '../../i18n/use-translation';
import { Tooltip } from '../tooltip/tooltip';
import { getPasswordStrength } from './password-strength';
import { PasswordRule } from './password-rule';
import { getDefaultValidationConditions, ValidationCondition } from './validation-condition';
import { v4 as uuid } from '../../utils/uuid';
import { PasswordStrengthContainer } from './password-strength-container';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { inputsStyle } from '../text-input/styles/inputs';

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

interface PasswordCreationInputProps {
    name?: string;
    id?: string;
    onChange(newPassword: string, isValid: boolean, event: ChangeEvent<HTMLInputElement>): void;
    validations?: ValidationCondition[];
}

function isPasswordValid(conditions: ValidationCondition[], value: string): boolean {
    return conditions.every((condition) => condition.isValid(value));
}

export const PasswordCreationInput: VoidFunctionComponent<PasswordCreationInputProps> = ({
    id: providedId,
    name,
    onChange,
    validations,
    ...otherProps
}) => {
    const { t } = useTranslation('password-creation-input');
    const { isMobile } = useDeviceContext();
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const isEmpty = password.length === 0;
    const strength = getPasswordStrength(password);
    const conditions = validations ?? getDefaultValidationConditions(t);
    const passwordStrengthId = useMemo(() => uuid(), []);
    const id = useMemo(() => providedId || uuid(), [providedId]);
    const hintId = useMemo(() => uuid(), []);
    const isValid = isPasswordValid(conditions, password);
    const dataAttributes = useDataAttributes(otherProps);

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
                            isValid={condition.isValid(password)}
                            isEmpty={isEmpty}
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
            <PasswordStrengthContainer strength={strength} id={passwordStrengthId} />
        </FieldContainer>
    );
};

PasswordCreationInput.displayName = 'PasswordCreationInput';
