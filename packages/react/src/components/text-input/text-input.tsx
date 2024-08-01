import {
    forwardRef,
    ReactElement,
    Ref,
} from 'react';
import { useTranslation } from '../../i18n/use-translation';
import { InputField } from '../input/input-field';
import { InputFieldProps } from '../input/types';

type BaseInputFieldProps = Pick<InputFieldProps,
    | 'inputMode'
    | 'name'
    | 'value'
    | 'autoComplete'
    | 'ariaDescribedby'
    | 'className'
    | 'disabled'
    | 'id'
    | 'noMargin'
    | 'defaultValue'
    | 'placeholder'
    | 'required'
    | 'pattern'
    | 'type'
    | 'valid'
    | 'label'
    | 'hint'
    | 'tooltip'
    | 'onBlur'
    | 'onChange'
    | 'onFocus'
    | 'onInvalid'
    | 'onKeyDown'
    | 'onKeyUp'
    | 'onMouseUp'
    | 'leftAdornment'
    | 'rightAdornment'
>;

interface TextInputProps extends BaseInputFieldProps {
    validationErrorMessage?: string;
}

export const TextInput = forwardRef(({
    type = 'text',
    validationErrorMessage,
    ...props
}: TextInputProps, ref: Ref<HTMLInputElement>): ReactElement => {
    const { t } = useTranslation('text-input');

    return (
        <InputField
            {...props /* eslint-disable-line react/jsx-props-no-spreading */}
            validationErrorMessage={validationErrorMessage || t('validationErrorMessage')}
            type={type}
            ref={ref}
        />
    );
});

TextInput.displayName = 'TextInput';
