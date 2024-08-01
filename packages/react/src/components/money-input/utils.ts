import { formatCurrency } from '../../utils/currency';

export function safeFormatCurrency(
    value: number | null,
    precision: number,
    locale: string,
    currency: string,
): string {
    return value === null ? '' : formatCurrency(value, precision, locale, currency);
}

export function roundValueToPrecision(amount: number | null, precision: number): number | null {
    return amount !== null && !Number.isNaN(amount)
        ? Math.round(amount * (10 ** precision)) / (10 ** precision)
        : null;
}

export function parseAndRound(val: string, precision: number): number | null {
    return val === '' ? null : roundValueToPrecision(Number(val.replace(',', '.')), precision);
}
