import type { MaskitoPlugin } from '@maskito/core';
import type { MaskitoMask } from '@maskito/core/src/lib/types/mask';
import { type MaskitoDateMode, maskitoDateOptionsGenerator } from '@maskito/kit';
import type { Replace } from '../../utils/types';
import type { MaskOptions } from './mask-options';
import { deleteNextMaskedCharPlugin } from './plugins';
import { type MaskPostprocessor, type MaskPreprocessor, addTrailingFixedCharsPostprocessor } from './processors';

export interface BaseMask {
    preprocessors?: MaskPreprocessor[];
    postprocessors?: MaskPostprocessor[];
}

export interface BasicMask extends BaseMask {
    mask: string;
    /**
     * If the pattern is a RegExp, the RegExp need to allow partial matches,
     * because the mask is applied on each input change.
     * For example, if the mask is '____-____' and the pattern is /^\d{4}-\d{4}$/,
     * the user won't be able to input anything, because the pattern doesn't allow partial matches.
     * In this case, the pattern should be /^\d{0,4}-?\d{0,4}$/.
     *
     * If the pattern is an Array, each element in the Array should represent a single character.
     */
    pattern: RegExp | Array<RegExp | string>;
}

export const DEFAULT_DATE_SEPARATOR = '-' as const;
export type DefaultDateMaskSeparator = typeof DEFAULT_DATE_SEPARATOR;

export interface DateMaskOptions<Separator extends string = DefaultDateMaskSeparator> {
    mask: Replace<MaskitoDateMode, '/', Separator> | Uppercase<Replace<MaskitoDateMode, '/', Separator>>;
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
        return [deleteNextMaskedCharPlugin(pattern)];
    }

    return [];
}

function configurePreprocessors(preprocessors: MaskPreprocessor[] | undefined): MaskPreprocessor[] | undefined {
    return preprocessors;
}

function configurePostprocessors(
    postprocessors: MaskPostprocessor[] | undefined,
    pattern: MaskitoMask,
): MaskPostprocessor[] {
    const result: MaskPostprocessor[] = postprocessors || [];
    if (Array.isArray(pattern)) {
        result.push(addTrailingFixedCharsPostprocessor(pattern));
    }
    return result;
}

export function convertToMaskOptions(props: MaskProps): MaskOptions {
    if (isBasicMask(props)) {
        return {
            mask: props.pattern,
            preprocessors: configurePreprocessors(props.preprocessors),
            postprocessors: configurePostprocessors(props.postprocessors, props.pattern),
            plugins: configurePlugins(props.pattern),
        };
    }

    const dateMaskOptions = createDateMaskOptions(props.dateMask);
    return {
        ...dateMaskOptions,
        preprocessors: configurePreprocessors(props.preprocessors),
        postprocessors: configurePostprocessors(props.postprocessors, dateMaskOptions.mask),
        plugins: [...(dateMaskOptions.plugins || []), ...configurePlugins(dateMaskOptions.mask)],
    };
}
