import { FC } from 'react';
import type { BasicMask, MaskProps } from '../masked-input/internal/mask';
import { MaskedInput, type MaskedInputProps } from '../masked-input/internal/masked-input';

export type PhoneInputProps = Omit<MaskedInputProps, 'inputType' | keyof MaskProps> & BasicMask;

export const PhoneInput: FC<PhoneInputProps> = (props) => (
    <MaskedInput
        data-testid="phone-text-input"
        inputType="tel"
        {...props /* eslint-disable-line react/jsx-props-no-spreading */}
    />
);

PhoneInput.displayName = 'PhoneInput';
