import { useMemo } from 'react';
import { v4 as uuid } from '../utils/uuid';

export function useId(providedId?: string): string {
    return useMemo(() => providedId ?? uuid(), [providedId]);
}
