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

// TODO: Should also support Number type
export function isWithinPrecision(value: string, precision: number): boolean {
    if (precision === 0 && value.includes('.')) {
        return false;
    }
    if (precision > 0 && value.split('.')[1]?.length > precision) {
        return false;
    }
    return true;
}

// TODO: Should also support Number type
export function truncateAtPrecision(value: string, precision: number): string {
    if (value === '' || !value.includes('.')) {
        return value;
    }

    const atDot = value.indexOf('.');
    return value.slice(0, precision === 0 ? atDot : atDot + precision + 1);
}
