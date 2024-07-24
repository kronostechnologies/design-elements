import { TableContextProps, User } from '../types';

export function sortUsers<T extends User>(
    array: T[],
    sortBy: TableContextProps['sortBy'],
): T[] {
    if (!sortBy) return array;
    return array.sort((a, b) => {
        let valueA = a[sortBy.key] || '';
        let valueB = b[sortBy.key] || '';

        // For case-insensitive comparison
        valueA = typeof valueA === 'string' ? valueA.toLowerCase() : valueA.toString();
        valueB = typeof valueB === 'string' ? valueB.toLowerCase() : valueB.toString();

        if (valueA < valueB) return sortBy.desc ? 1 : -1;
        if (valueA > valueB) return sortBy.desc ? -1 : 1;
        return 0;
    });
}
