export type Currency = 'CAD' | 'USD';
export type Locale = 'en-CA' | 'fr-CA' | 'en-US';

export function formatCurrency(value: number, precision: number, locale?: Locale, currency: Currency = 'CAD'): string {
    return Intl
        .NumberFormat(locale, {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: precision,
            maximumFractionDigits: precision,
        })
        .format(value);
}
