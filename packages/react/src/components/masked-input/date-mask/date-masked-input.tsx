import { type FC, useCallback, useMemo } from 'react';
import type { DateMaskFormat } from '../internal/date-mask';
import type { MaskProps } from '../internal/mask';
import { MaskedInput, type MaskedInputProps } from '../internal/masked-input';
import { useDateMask } from './use-date-mask';

export type DateMaskedInputProps = Omit<MaskedInputProps, keyof MaskProps | 'defaultValue' | 'onChange' | 'value'> & {
    defaultValue?: string | Date;
    format?: DateMaskFormat;
    value?: string | Date | null;

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

    const formatDateOrStringValue = useCallback(
        (valueToFormat: string | Date | undefined | null): string | undefined => {
            if (valueToFormat === null) {
                return '';
            }
            if (valueToFormat === undefined || typeof valueToFormat === 'string') {
                return valueToFormat;
            }
            return valueToFormat instanceof Date ? formatDate(valueToFormat) : undefined;
        },
        [formatDate],
    );

    const formattedValue = useMemo(() => formatDateOrStringValue(value), [formatDateOrStringValue, value]);
    const formattedDefaultValue = useMemo(
        () => formatDateOrStringValue(defaultValue),
        [formatDateOrStringValue, defaultValue],
    );

    return (
        <MaskedInput
            {...otherProps /* eslint-disable-line react/jsx-props-no-spreading */}
            dateMask={dateMask}
            defaultValue={formattedDefaultValue ?? undefined}
            onChange={handleChange}
            value={formattedValue}
        />
    );
};

DateMaskedInput.displayName = 'DateMaskedInput';
