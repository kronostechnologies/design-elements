import { type FC, useCallback, useMemo } from 'react';
import type { DateMaskFormat } from '../internal/date-mask';
import type { MaskProps } from '../internal/mask';
import { MaskedInput, type MaskedInputProps } from '../internal/masked-input';
import { useDateMask } from './use-date-mask';

export type DateMaskedInputProps = Omit<MaskedInputProps, keyof MaskProps | 'onChange' | 'value'> & {
    defaultValue?: string;
    format?: DateMaskFormat;
    value?: string | Date;

    onChange?(date: Date | null, rawValue: string, formattedValue: string): void;
}

export const DateMaskedInput: FC<DateMaskedInputProps> = ({
    defaultValue,
    format,
    onChange,
    value,
    ...otherProps
}) => {
    const { dateMask, formatDate, parseDate } = useDateMask({ format });

    const handleChange: MaskedInputProps['onChange'] = useCallback((rawValue: string, formattedValue: string) => {
        onChange?.(parseDate(formattedValue), rawValue, formattedValue);
    }, [onChange, parseDate]);

    const formattedValue = useMemo(
        () => {
            if (value === undefined || typeof value === 'string') {
                return value;
            }
            return value instanceof Date ? formatDate(value) : undefined;
        },
        [formatDate, value],
    );

    return (
        <MaskedInput
            {...otherProps /* eslint-disable-line react/jsx-props-no-spreading */}
            dateMask={dateMask}
            defaultValue={defaultValue}
            onChange={handleChange}
            value={formattedValue}
        />
    );
};

DateMaskedInput.displayName = 'DateMaskedInput';
