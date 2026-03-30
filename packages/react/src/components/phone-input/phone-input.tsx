import { FC } from 'react';
import { BasicMask, MaskedInput, type MaskedInputProps, MaskProps } from '../masked-input';

export type PhoneInputProps = Omit<MaskedInputProps, 'inputType' | keyof MaskProps> & BasicMask;

/**
 * @deprecated Use {@link MaskedInput} with inputType=tel and a phone mask instead.
 */
export const PhoneInput: FC<PhoneInputProps> = (props) => (
    <MaskedInput
        data-testid="phone-text-input"
        inputType="tel"
        {...props /* eslint-disable-line react/jsx-props-no-spreading */}
    />
);

PhoneInput.displayName = 'PhoneInput';
