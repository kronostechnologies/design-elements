import { FC } from 'react';
import { MaskedInput, type MaskedInputProps } from '../masked-input';

export interface PhoneInputProps extends Omit<MaskedInputProps, 'inputType'> {
}

export const PhoneInput: FC<PhoneInputProps> = (props) => {
    return (
        <MaskedInput
            data-testid="phone-text-input"
            inputType="tel"
            {...props /* eslint-disable-line react/jsx-props-no-spreading */}
        />
    );
};

PhoneInput.displayName = 'PhoneInput';
