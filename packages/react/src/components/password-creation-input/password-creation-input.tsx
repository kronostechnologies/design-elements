import { ChangeEvent, useState, VoidFunctionComponent, useMemo } from 'react';
import styled, { StyledProps } from 'styled-components';
import { FieldContainer } from '../field-container/field-container';
import { IconButton } from '../buttons/icon-button';
import { TextInput } from '../text-input/text-input';
import { useTranslation } from '../../i18n/use-translation';
import { getPasswordStrength } from './password-strength';
import { PasswordRule } from './password-rule';
import { getDefaultValidationConditions, ValidationCondition } from './validation-condition';
import { v4 as uuid } from '../../utils/uuid';
import { PasswordStrengthContainer } from './password-strength-container';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { Tooltip } from '../tooltip/tooltip';

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

const PasswordContainer = styled.div`
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
    display: flex;
    flex-direction: row;
    margin-bottom: calc(var(--spacing-1x) * 1.5);
    position: relative;

    > div:first-of-type:focus-within {
        border-radius: var(--border-radius);

        /* TODO change when updating thematization */
        box-shadow: 0 0 0 2px #84c6ea;
        outline: none;

        input,
        + span > button {
            /* TODO change when updating thematization */
            border-color: #006296;
        }
    }
`;

export function getBorderColor({ isValid, theme }: StyledProps<{ isValid: boolean; }>): string {
    if (isValid) {
        return theme.ref['color-neutral-65'];
    }

    return theme.ref['color-alert-50'];
}

const StyledInput = styled(TextInput)`
    flex: 1;
    margin-bottom: 0;

    input { /* stylelint-disable-line no-descending-specificity */
        ::-ms-reveal {
            display: none;
        }

        border-color: ${getBorderColor};
        border-radius: var(--border-radius) 0 0 var(--border-radius);
        border-width: 1px 0 1px 1px;
        width: calc(100% - 2rem);
    }
`;

const StyledIconButton = styled(IconButton)<{ isValid: boolean }>`
    background-color: white;
    border-color: ${getBorderColor};
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
    border-width: 1px 1px 1px 0;
    min-height: 2rem;
    position: absolute;
    transform: translateX(-2rem);
    width: 2rem;
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
            <PasswordContainer>
                <StyledInput
                    id={id}
                    isValid={isValid || isEmpty}
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
                    />
                </Tooltip>
            </PasswordContainer>
            <PasswordStrengthContainer strength={strength} id={passwordStrengthId} />
        </StyledFieldContainer>
    );
};
