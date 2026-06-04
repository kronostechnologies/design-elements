import type { DateMaskFormat } from './date-mask';
import { type MaskPostprocessor, type MaskPreprocessor } from './processors';

export interface BaseMask {
    /**
     * Separators contained in the mask that should be ignored when extracting the raw value.
     * @default '()- /.'.
     */
    ignoredSeparators?: string;
    preprocessors?: MaskPreprocessor[];
    postprocessors?: MaskPostprocessor[];
}

export interface BasicMask extends BaseMask {
    mask: string;
    /**
     * The recommended format is to use an Array of RegExp or string,
     * where each element corresponds to a character in the mask.
     *
     * If the pattern is a RegExp, the RegExp need to allow partial matches,
     * because the mask is applied on each input change.
     * For example, if the mask is '____-____' and the pattern is /^\d{4}-\d{4}$/,
     * the user won't be able to input anything, because the pattern doesn't allow partial matches.
     * In this case, the pattern should be /^\d{0,4}-?\d{0,4}$/.
     */
    pattern: RegExp | Array<RegExp | string>;
}
export interface DateMaskOptions {
    mask: string;
    format: DateMaskFormat;
}

export interface DateMask extends BaseMask {
    dateMask: DateMaskOptions;
}

export type MaskProps =
    | BasicMask
    | DateMask;

export function isBasicMask(mask: MaskProps): mask is BasicMask {
    return 'mask' in mask && 'pattern' in mask;
}

export function isDateMask(mask: MaskProps): mask is DateMask {
    return 'dateMask' in mask && !!mask.dateMask.mask;
}

export function getTextMask(props: MaskProps): string {
    if (isBasicMask(props)) {
        return props.mask;
    }

    if (isDateMask(props)) {
        return props.dateMask.mask;
    }

    return '';
}
