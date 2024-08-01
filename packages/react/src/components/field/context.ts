import { createContext, useContext } from 'react';

export interface FieldControlProps {
    id?: string;
    ariaLabel?: string;
    ariaLabelledby?: string;
    ariaDescribedby?: string
    disabled?: boolean;
    required?: boolean;
    valid?: boolean;
}

export const FieldControlContext = createContext<FieldControlProps>({});

export function useFieldControlContext(newContext: FieldControlProps): FieldControlProps {
    const prevContext = useContext(FieldControlContext);

    return {
        ...prevContext,
        ...newContext,
    };
}
