import {
    ChangeEvent,
    useState,
    VoidFunctionComponent,
    useCallback,
} from 'react';
import { IconButton } from '../buttons/icon-button';
import { useTranslation } from '../../i18n/use-translation';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { InputField } from '../input/input-field';
import { InputFieldProps } from '../input/types';
import { Tooltip } from '../tooltip/tooltip';

type BaseInputFieldProps = Pick<InputFieldProps,
    | 'id'
    | 'name'
    | 'value'
    | 'defaultValue'
    | 'className'
    | 'disabled'
    | 'noMargin'
    | 'placeholder'
    | 'label'
    | 'hint'
    | 'tooltip'
    | 'onBlur'
    | 'onFocus'
    | 'rightAdornment'
>;

interface PasswordInputProps extends BaseInputFieldProps {
    validationErrorMessage?: string;
    onChange?(newPassword: string, event: ChangeEvent<HTMLInputElement>): void;
}

export const PasswordInput: VoidFunctionComponent<PasswordInputProps> = ({
    validationErrorMessage,
    onChange,
    disabled,
    name,
    ...otherProps
}) => {
    const { t } = useTranslation('password-input');
    const [showPassword, setShowPassword] = useState(false);
    const isValid = validationErrorMessage === undefined || validationErrorMessage === '';
    const dataAttributes = useDataAttributes(otherProps);

    const handleShowPassword = useCallback((): void => {
        setShowPassword(!showPassword);
    }, [showPassword]);

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        const newPassword = event.target.value;
        onChange?.(newPassword, event);
    }, [onChange]);

    return (
        <InputField
            data-testid="password-input"
            validationErrorMessage={validationErrorMessage ?? ''}
            valid={isValid}
            disabled={disabled}
            name={name ?? 'password'}
            autoComplete={showPassword ? 'off' : 'current-password'}
            type={showPassword ? 'text' : 'password'}
            onChange={handleChange}
            rightAdornment={(
                <Tooltip
                    desktopPlacement="top"
                    label={showPassword ? t('hide-password') : t('show-password')}
                >
                    <IconButton
                        data-testid="show-password-button"
                        disabled={disabled}
                        buttonType="tertiary"
                        aria-label={t('show-password')}
                        iconName={showPassword ? 'eyeOff' : 'eye'}
                        aria-pressed={showPassword}
                        type="button"
                        onClick={handleShowPassword}
                    />
                </Tooltip>
            )}
            {...otherProps /* eslint-disable-line react/jsx-props-no-spreading */}
            {...dataAttributes /* eslint-disable-line react/jsx-props-no-spreading */}
        />
    );
};
