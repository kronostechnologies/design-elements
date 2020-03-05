const DEFAULT_CURRENCY = 'CAD';

export function formatCurrency(value: number, precision: number, locale?: 'en-CA' | 'fr-CA'): string {

    return Intl
        .NumberFormat(locale, {
            style: 'currency',
            currency: DEFAULT_CURRENCY,
            minimumFractionDigits: precision,
            maximumFractionDigits: precision,
        })
        .format(value);
}
