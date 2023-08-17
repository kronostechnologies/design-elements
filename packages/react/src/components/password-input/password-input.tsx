import { ChangeEvent, useState, VoidFunctionComponent, useMemo, FocusEvent } from 'react';
import styled, { css } from 'styled-components';
import { FieldContainer } from '../field-container/field-container';
import { IconButton } from '../buttons/icon-button';
import { TextInput } from '../text-input/text-input';
import { useTranslation } from '../../i18n/use-translation';
import { v4 as uuid } from '../../utils/uuid';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { Tooltip } from '../tooltip/tooltip';

const PasswordContainer = styled.div`
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
    display: flex;
    flex-direction: row;
    margin-bottom: calc(var(--spacing-1x) * 1.5);
    position: relative;

    > div:focus-within {
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

const StyledTextInput = styled(TextInput)`
    flex: 1;
    margin-bottom: 0;

    input {
        &::-ms-reveal {
            display: none;
        }

        border-radius: var(--border-radius) 0 0 var(--border-radius);
        border-width: 1px 0 1px 1px;
        width: calc(100% - 2rem);
    }
`;

const StyledIconButton = styled(IconButton) <{ isValid: boolean }>`
    position: absolute;
    width: 2rem;
    min-height: 2rem;
    border-color: ${({ theme }) => theme.greys['dark-grey']};
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
    border-width: 1px 1px 1px 0;
    background-color: white;
    transform: translateX(-2rem);

    ${(props) => !props.isValid && css`
        border-color: ${props.theme.notifications['alert-2.1']};
    `}

    &:disabled {
        border-color: ${({ theme }) => theme.greys['grey']};
        background-color: ${({ theme }) => theme.greys['light-grey']};
    }
`;

interface PasswordInputProps {
    id?: string;
    name?: string;
    label?: string;
    hint?: string;
    disabled?: boolean;
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    validationErrorMessage?: string;
    onChange?(newPassword: string, event: ChangeEvent<HTMLInputElement>): void;
    onBlur?(event: FocusEvent<HTMLInputElement>): void;
    onFocus?(event: FocusEvent<HTMLInputElement>): void;
}

export const PasswordInput: VoidFunctionComponent<PasswordInputProps> = ({
    id: providedId,
    name,
    label,
    hint,
    disabled,
    placeholder,
    value,
    defaultValue,
    validationErrorMessage,
    onBlur,
    onChange,
    onFocus,
    ...otherProps
}) => {
    const { t } = useTranslation('password-input');
    const [showPassword, setShowPassword] = useState(false);
    const isValid = validationErrorMessage === undefined || validationErrorMessage === '';
    const id = useMemo(() => providedId || uuid(), [providedId]);
    const dataAttributes = useDataAttributes(otherProps);

    const handleShowPassword = (): void => {
        setShowPassword(!showPassword);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const newPassword = event.target.value;
        onChange?.(newPassword, event);
    };

    return (
        <FieldContainer
            fieldId={id}
            label={label}
            hint={hint}
            validationErrorMessage={validationErrorMessage ?? ''}
            valid={isValid}
        >
            <PasswordContainer>
                <StyledTextInput
                    id={id}
                    disabled={disabled}
                    name={name ?? 'password'}
                    autoComplete="current-password"
                    ariaInvalid={!isValid}
                    onBlur={onBlur}
                    onChange={handleChange}
                    onFocus={onFocus}
                    placeholder={placeholder}
                    data-testid="password-input"
                    type={showPassword ? 'text' : 'password'}
                    defaultValue={defaultValue}
                    value={value}
                    {...dataAttributes}
                />
                <Tooltip desktopPlacement="top" label={showPassword ? t('hide-password') : t('show-password')}>
                    <StyledIconButton
                        isValid={isValid}
                        disabled={disabled}
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
        </FieldContainer>
    );
};

PasswordInput.displayName = 'PasswordInput';
