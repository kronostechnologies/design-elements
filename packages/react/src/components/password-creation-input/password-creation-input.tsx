import { ChangeEvent, useState, VoidFunctionComponent, useMemo } from 'react';
import styled, { StyledProps } from 'styled-components';
import { FieldContainer } from '../field-container/field-container';
import { IconButton } from '../buttons/icon-button';
import { TextInput } from '../text-input/text-input';
import { useTranslation } from '../../i18n/use-translation';
import { Tooltip } from '../tooltip/tooltip';
import { getPasswordStrength } from './password-strength';
import { PasswordRule } from './password-rule';
import { getDefaultValidationConditions, ValidationCondition } from './validation-condition';
import { v4 as uuid } from '../../utils/uuid';
import { PasswordStrengthContainer } from './password-strength-container';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { focus } from '../../utils/css-state';

const StyledFieldContainer = styled(FieldContainer)`
    > :nth-child(2) {
        margin-bottom: 0;
    }
`;

const StyledUl = styled.ul`
    font-size: 0.75rem;
    margin: 0 0 var(--spacing-half) 0;
    padding: 0;
`;

const PasswordContainer = styled.div<{ $isValid: boolean; $iconButtonFocused: boolean; }>`
    border: 1px solid ${({ theme }) => theme.component['password-input-show-password-button-border-color']};
    border-radius: var(--border-radius);
    display: flex;
    flex-direction: row;
    margin-bottom: calc(var(--spacing-1x) * 1.5);
    position: relative;
    transition: all 0.25s ease-in-out;
    ${({ theme, $iconButtonFocused }) => !$iconButtonFocused && focus(
        { theme },
        false,
        undefined,
        true,
        false,
        false,
        'focus-within',
    )}
`;

export function getBorderColor({ isValid, theme }: StyledProps<{ isValid: boolean; }>): string {
    if (isValid) {
        return theme.component['password-creation-input-border-color'];
    }

    return theme.component['password-creation-input-error-border-color'];
}

const StyledInput = styled(TextInput)`
    flex: 1;
    margin-bottom: 0;

    input,
 input:not(:focus),
 input:focus,
 input:focus-within {
        ::-ms-reveal {
            display: none;
        }

        border: none transparent;
        box-shadow: none;
        outline: none;
    }
`;

const StyledIconButton = styled(IconButton)<{ isValid: boolean }>`
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
    const [iconButtonFocused, setIconButtonFocused] = useState(false);

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
        <StyledFieldContainer
            fieldId={id}
            label={t('create-password')}
            validationErrorMessage=""
            noInvalidFieldIcon
            valid={isValid}
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
            <PasswordContainer
                $isValid={isValid}
                $iconButtonFocused={iconButtonFocused}
            >
                <StyledInput
                    id={id}
                    name={name ?? 'password'}
                    autoComplete="new-password"
                    ariaDescribedBy={`${hintId} ${passwordStrengthId}`}
                    ariaInvalid={!isValid}
                    onChange={handleChange}
                    data-testid="password-input"
                    type={showPassword ? 'text' : 'password'}
                    {...dataAttributes /* eslint-disable-line react/jsx-props-no-spreading */}
                />
                <Tooltip
                    desktopPlacement="top"
                    label={showPassword ? t('hide-password') : t('show-password')}
                >
                    <StyledIconButton
                        isValid={isValid || isEmpty}
                        buttonType="tertiary"
                        aria-label={t('show-password')}
                        iconName={showPassword ? 'eyeOff' : 'eye'}
                        aria-pressed={showPassword}
                        data-testid="show-password-button"
                        type="button"
                        onClick={handleShowPassword}
                        onFocus={() => setIconButtonFocused(true)}
                        onBlur={() => setIconButtonFocused(false)}
                    />
                </Tooltip>
            </PasswordContainer>
            <PasswordStrengthContainer strength={strength} id={passwordStrengthId} />
        </StyledFieldContainer>
    );
};
