import { ChangeEvent, useState, VoidFunctionComponent, useMemo, FocusEvent, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { FieldContainer } from '../field-container/field-container';
import { IconButton } from '../buttons/icon-button';
import { TextInput } from '../text-input/text-input';
import { useTranslation } from '../../i18n/use-translation';
import { v4 as uuid } from '../../utils/uuid';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { Tooltip } from '../tooltip/tooltip';
import { focus } from '../../utils/css-state';

const StyledTextInput = styled(TextInput)`
    flex: 1;
    margin-bottom: 0;

    input {
        &::-ms-reveal {
            display: none;
        }

        border-radius: var(--border-radius) 0 0 var(--border-radius);
        border-right-width: 0;
    }
`;

const StyledIconButton = styled(IconButton) <{ $isValid: boolean }>`
    background-color: ${({ theme }) => theme.ref['color-white']};
    border-color: ${({ theme }) => theme.ref['color-neutral-65']};
    border-left-width: 0;
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
    min-height: 2rem;
    width: 2rem;

    ${(props) => !props.$isValid && css`
        border-color: ${props.theme.ref['color-alert-50']};
    `}

    &:disabled {
        background-color: ${({ theme }) => theme.ref['color-neutral-05']};
        border-color: ${({ theme }) => theme.ref['color-neutral-15']};
    }
`;

const PasswordContainer = styled.div`
    display: flex;
    flex-direction: row;

    &:focus-within {
        border-radius: var(--border-radius);
        ${({ theme }) => focus({ theme }, true, '&')}

        input,
        ${StyledIconButton} {
            border-color: ${({ theme }) => theme.ref['color-brand-50']};
        }
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
            <PasswordContainer>
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
                <Tooltip desktopPlacement="top" label={showPassword ? t('hide-password') : t('show-password')}>
                    <StyledIconButton
                        $isValid={isValid}
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
