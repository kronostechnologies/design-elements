import { useMemo } from 'react';
import { v4 as uuid } from '../utils/uuid';

export function useUniqueId(id?: string): string {
    return useMemo(() => id ?? uuid(), [id]);
}
