import { ChangeEvent, useState, VoidFunctionComponent, useMemo, FocusEvent, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { FieldContainer } from '../field-container/field-container';
import { IconButton } from '../buttons/icon-button';
import { TextInput } from '../text-input/text-input';
import { useTranslation } from '../../i18n/use-translation';
import { v4 as uuid } from '../../utils/uuid';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { focus } from '../../utils/css-state';
import { Tooltip } from '../tooltip/tooltip';

const StyledIconButton = styled(IconButton)`
`;

const PasswordContainer = styled.div<{ $isValid: boolean; $iconButtonFocused: boolean; $isDisabled: boolean | undefined }>`
    display: flex;
    flex-direction: row;
    border: 1px solid ${({ theme }) => theme.component['password-input-show-password-button-border-color']};
    border-radius: var(--border-radius);
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
    ${(props) => !props.$isValid && css`
        border-color: ${props.theme.component['password-input-show-password-button-invalid-border-color']};
`}
    ${(props) => props.$isDisabled && css`
        &:disabled {
            background-color: ${({ theme }) => theme.component['password-input-show-password-button-disabled-background-color']};
            border-color: ${({ theme }) => theme.component['password-input-show-password-button-disabled-border-color']};
        }
`}
`;

const StyledTextInput = styled(TextInput)`
    flex: 1;
    margin-bottom: 0;

    input,
 input:not(:focus),
 input:focus,
 input:focus-within {
        &::-ms-reveal {
            display: none;
        }

        border: none transparent;
        box-shadow: none;
        outline: none;
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
    const [iconButtonFocused, setIconButtonFocused] = useState(false);

    const handleShowPassword = useCallback((): void => {
        setShowPassword(!showPassword);
    }, [showPassword]);

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        const newPassword = event.target.value;
        onChange?.(newPassword, event);
    }, [onChange]);

    return (
        <FieldContainer
            fieldId={id}
            label={label}
            hint={hint}
            validationErrorMessage={validationErrorMessage ?? ''}
            valid={isValid}
        >
            <PasswordContainer
                $isValid={isValid}
                $iconButtonFocused={iconButtonFocused}
                $isDisabled={disabled}
            >
                <StyledTextInput
                    id={id}
                    disabled={disabled}
                    name={name ?? 'password'}
                    autoComplete={showPassword ? 'off' : 'current-password'}
                    ariaInvalid={!isValid}
                    onBlur={onBlur}
                    onChange={handleChange}
                    onFocus={onFocus}
                    placeholder={placeholder}
                    data-testid="password-input"
                    type={showPassword ? 'text' : 'password'}
                    defaultValue={defaultValue}
                    value={value}
                    {...dataAttributes /* eslint-disable-line react/jsx-props-no-spreading */}
                />
                <Tooltip
                    desktopPlacement="top"
                    label={showPassword ? t('hide-password') : t('show-password')}
                >
                    <StyledIconButton
                        disabled={disabled}
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
        </FieldContainer>
    );
};
