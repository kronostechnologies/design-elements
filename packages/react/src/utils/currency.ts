export function formatCurrency(value: number, precision: number, locale?: string, currency: string = 'CAD'): string {
    return Intl
        .NumberFormat(locale, {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: precision,
            maximumFractionDigits: precision,
        })
        .format(value);
}
