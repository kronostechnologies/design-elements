import { User } from '../types';

export function sortUsers<T extends User>(
    array: T[],
    key: keyof User,
    isDescending: boolean = false,
): T[] {
    return array.sort((a, b) => {
        let valueA = a[key] || '';
        let valueB = b[key] || '';

        // For case-insensitive comparison
        valueA = typeof valueA === 'string' ? valueA.toLowerCase() : valueA.toString();
        valueB = typeof valueB === 'string' ? valueB.toLowerCase() : valueB.toString();

        if (valueA < valueB) return isDescending ? 1 : -1;
        if (valueA > valueB) return isDescending ? -1 : 1;
        return 0;
    });
}
