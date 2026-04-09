import type { MaskitoOptions, MaskitoPlugin } from '@maskito/core';
import type { MaskitoMask } from '@maskito/core/src/lib/types/mask';
import { type MaskitoDateMode, maskitoDateOptionsGenerator } from '@maskito/kit';
import type { Replace } from '../../utils/types';
import { deleteFixedCharsPlugin } from './plugins';
import { addTrailingFixedCharsPostprocessor, type MaskPostprocessor, type MaskPreprocessor } from './processors';

type MaskOptions = MaskitoOptions;

export interface BaseMask {
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

export const DEFAULT_DATE_SEPARATOR = '-' as const;
export type DefaultDateMaskSeparator = typeof DEFAULT_DATE_SEPARATOR;

export interface DateMaskOptions<Separator extends string = DefaultDateMaskSeparator> {
    mask: Replace<MaskitoDateMode, '/', Separator>
        | Uppercase<Replace<MaskitoDateMode, '/', Separator>>
        | Uppercase<Replace<Replace<MaskitoDateMode, 'YYYY', 'AAAA'>, 'DD', 'JJ'>>;
    separator?: Separator;
    max?: Date;
    min?: Date;
}

export interface DateMask<Separator extends string = DefaultDateMaskSeparator> extends BaseMask {
    dateMask: DateMaskOptions<Separator>;
}

export type MaskProps =
    | BasicMask
    | DateMask<string>;

function isBasicMask(mask: MaskProps): mask is BasicMask {
    return 'mask' in mask && 'pattern' in mask;
}

function isDateMask(mask: MaskProps): mask is DateMask {
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

export function createDateMode<Separator extends string = DefaultDateMaskSeparator>({
    mask,
    separator,
}: Pick<DateMaskOptions<Separator>, 'mask' | 'separator'>): MaskitoDateMode {
    return mask.toLocaleLowerCase()
        .replace('aaaa', 'yyyy')
        .replace('jj', 'dd')
        .replace(new RegExp(separator || DEFAULT_DATE_SEPARATOR as Separator, 'g'), '/') as MaskitoDateMode;
}

function createDateMaskOptions<Separator extends string = DefaultDateMaskSeparator>({
    mask = 'YYYY-MM-DD' as DateMaskOptions<Separator>['mask'],
    max,
    min,
    separator = DEFAULT_DATE_SEPARATOR as Separator,
}: Omit<DateMaskOptions<Separator>, 'type'>): MaskOptions {
    const mode = createDateMode({ mask, separator });
    return maskitoDateOptionsGenerator({
        max,
        min,
        mode,
        separator,
    });
}

function configurePlugins(pattern: MaskitoMask): MaskitoPlugin[] {
    if (Array.isArray(pattern)) {
        return [deleteFixedCharsPlugin(pattern)];
    }

    return [];
}

function configurePreprocessors(...preprocessors: MaskPreprocessor[]): MaskPreprocessor[] {
    return [...preprocessors];
}

function configurePostprocessors(
    pattern: MaskitoMask,
    ...postprocessors: MaskPostprocessor[]
): MaskPostprocessor[] {
    const result: MaskPostprocessor[] = [...postprocessors];
    if (Array.isArray(pattern)) {
        result.push(addTrailingFixedCharsPostprocessor(pattern));
    }
    return result;
}

function orEmpty<T>(array: readonly T[] | undefined): readonly T[] {
    return array || [];
}

function merge<T>(array1: readonly T[] | undefined, array2: readonly T[] | undefined): T[] {
    return [...orEmpty(array1), ...orEmpty(array2)];
}

export function convertToMaskitoOptions(props: MaskProps): MaskOptions {
    if (isBasicMask(props)) {
        return {
            mask: props.pattern,
            preprocessors: configurePreprocessors(...orEmpty(props.preprocessors)),
            postprocessors: configurePostprocessors(props.pattern, ...orEmpty(props.postprocessors)),
            plugins: configurePlugins(props.pattern),
        };
    }

    const dateMaskOptions = createDateMaskOptions(props.dateMask);

    return {
        ...dateMaskOptions,
        preprocessors: configurePreprocessors(...merge(props.preprocessors, dateMaskOptions.preprocessors)),
        postprocessors: configurePostprocessors(
            dateMaskOptions.mask,
            ...merge(props.postprocessors, dateMaskOptions.postprocessors),
        ),
        plugins: [...(dateMaskOptions.plugins || []), ...configurePlugins(dateMaskOptions.mask)],
    };
}
