import { createContext, useContext } from 'react';
import { FieldControlProps } from './types';

export const FieldControlContext = createContext<FieldControlProps>({});

export function useFieldControlContext(newContext: FieldControlProps): FieldControlProps {
    const prevContext = useContext(FieldControlContext);

    return {
        ...prevContext,
        ...newContext,
    };
}
