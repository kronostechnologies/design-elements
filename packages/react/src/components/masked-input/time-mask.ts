import type { MaskitoTimeMode, MaskitoTimeSegments } from '@maskito/kit';

export interface TimeMaskOptions {
    mask: MaskitoTimeMode;
    timeSegmentMaxValues?: Partial<MaskitoTimeSegments<number>>;
    timeSegmentMinValues?: Partial<MaskitoTimeSegments<number>>;
    type: 'time';
}

export function createTimeMask(options: Omit<TimeMaskOptions, 'type'>): TimeMaskOptions {
    return {
        ...options,
        type: 'time',
    };
}
