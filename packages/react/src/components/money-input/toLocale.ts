export function toLocale(
    language: string,
    currency: string,
): string {
    if (!language.match(/^[a-z]{2}-[a-z]{2}$/i)) {
        switch (currency.toUpperCase()) {
            case 'CAD':
                return `${language}-CA`;
            case 'USD':
                return `${language}-US`;
        }
    }

    return language;
}
