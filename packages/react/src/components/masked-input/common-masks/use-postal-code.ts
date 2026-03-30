import { useMemo } from 'react';
import { type BasicMask } from '../mask';
import { toUpperCase } from '../processors';

/**
 * A mask for Canadian postal codes in the format "A1A 1A1", where "A" represents a letter and "1" represents a digit.
 * The mask automatically converts input to uppercase.
 */
export function usePostalCodeMask(): BasicMask {
    return useMemo(
        () => ({
            mask: 'A1A 1A1',
            pattern: [/[A-Z]/, /\d/, /[A-Z]/, ' ', /\d/, /[A-Z]/, /\d/],
            preprocessors: [toUpperCase()],
        } satisfies BasicMask),
        [],
    );
}
