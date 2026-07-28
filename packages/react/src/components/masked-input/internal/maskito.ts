import type { MaskitoOptions, MaskitoPlugin } from '@maskito/core';
import type { MaskitoMask } from '@maskito/core/src/lib/types/mask';
import { type MaskitoDateMode, maskitoDateOptionsGenerator } from '@maskito/kit';
import { type DateMaskOptions, isBasicMask, type MaskProps } from './mask';
import { deleteFixedCharsPlugin } from './plugins';
import { addTrailingFixedCharsPostprocessor, type MaskPostprocessor, type MaskPreprocessor } from './processors';

type MaskOptions = MaskitoOptions;

const DEFAULT_DATE_SEPARATOR = '-' as const;

function extractSeparator(mode: DateMaskOptions['format']): string {
    return mode.match(/[^a-z^A-Z]/)?.[0] ?? DEFAULT_DATE_SEPARATOR;
}

export interface MaskitoDateOptions {
    mode: MaskitoDateMode;
    separator: string;
}

export function createMaskitoDateOptions(
    mode: DateMaskOptions['format'],
): MaskitoDateOptions {
    const separator = extractSeparator(mode);
    const safeSeparator = separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return {
        mode: mode.toLocaleLowerCase()
            .replace(new RegExp(safeSeparator, 'g'), '/') as MaskitoDateMode,
        separator,
    };
}

function createDateMaskOptions({
    format,
}: DateMaskOptions): MaskOptions {
    const { mode: maskitoMode, separator } = createMaskitoDateOptions(format);
    return maskitoDateOptionsGenerator({
        mode: maskitoMode,
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
