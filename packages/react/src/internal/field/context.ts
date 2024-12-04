import { createContext, useContext, useMemo } from 'react';

export interface FieldSlotIds {
    label?: string;
    hint?: string;
    invalid?: string;
}

export interface FieldControlProps {
    id?: string;
    ariaLabel?: string;
    ariaLabelledby?: string;
    ariaDescribedby?: string
    disabled?: boolean;
    required?: boolean;
    valid?: boolean;
    slotIds?: FieldSlotIds;
}

export const FieldContext = createContext<FieldControlProps>({});

export function useFieldControl(overrides: FieldControlProps | null = null): FieldControlProps {
    const prevContext = useContext(FieldContext);

    return useMemo(() => ({
        ...prevContext,
        ...overrides,
    }), [prevContext, overrides]);
}
