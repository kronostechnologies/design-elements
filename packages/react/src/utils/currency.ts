export function formatCurrency(value: number, precision: number, locale?: string, currency = 'CAD'): string {
    return Intl
        .NumberFormat(locale, {
            style: 'currency',
            currency,
            minimumFractionDigits: precision,
            maximumFractionDigits: precision,
            currencyDisplay: 'narrowSymbol',
        })
        .format(value);
}
