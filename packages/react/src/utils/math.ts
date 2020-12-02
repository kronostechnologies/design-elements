export function isNumber(value: unknown): value is number {
    return typeof value === 'number' && Number.isFinite(value);
}

export function toInt(value: number | string | undefined, fallbackValue: number): number {
    if (value === undefined) {
        return fallbackValue;
    }

    const parsedValue = parseInt(value.toString(), 10);
    return isNumber(parsedValue) ? parsedValue : fallbackValue;
}

export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}
