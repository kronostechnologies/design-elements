import {
    ChangeEvent,
    useState,
    VoidFunctionComponent,
    useMemo,
    FocusEvent,
    useCallback,
} from 'react';
import styled from 'styled-components';
import { IconButton } from '../buttons/icon-button';
import { useTranslation } from '../../i18n/use-translation';
import { v4 as uuid } from '../../utils/uuid';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { FieldContainer } from '../field-container/field-container';
import { Input } from '../text-input/text-input';
import { Tooltip } from '../tooltip/tooltip';

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

const PasswordInputContainer = styled.div`
    position: relative;
    display: flex;
`;

const StyledInput = styled(Input)`
    padding-right: var(--size-2x)
`;

export const ShowPasswordButton = styled.div`
    position: absolute;
    right: 0;
`;

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
    const { isMobile } = useDeviceContext();
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
            valid={isValid}
            label={label}
            hint={hint}
            validationErrorMessage={validationErrorMessage ?? ''}
        >
            <PasswordInputContainer>
                <StyledInput
                    id={id}
                    disabled={disabled}
                    name={name ?? 'password'}
                    autoComplete={showPassword ? 'off' : 'current-password'}
                    aria-invalid={!isValid}
                    onBlur={onBlur}
                    onChange={handleChange}
                    onFocus={onFocus}
                    placeholder={placeholder}
                    data-testid="password-input"
                    type={showPassword ? 'text' : 'password'}
                    defaultValue={defaultValue}
                    value={value}
                    isMobile={isMobile}
                    {...dataAttributes /* eslint-disable-line react/jsx-props-no-spreading */}
                />
                <ShowPasswordButton>
                    <Tooltip
                        desktopPlacement="top"
                        label={showPassword ? t('hide-password') : t('show-password')}
                    >
                        <IconButton
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
                </ShowPasswordButton>
            </PasswordInputContainer>
        </FieldContainer>
    );
};
