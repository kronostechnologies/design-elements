import { createContext, useContext } from 'react';

export interface FormFieldControlProps {
    formId?: string;
    ariaLabel?: string;
    ariaLabelledby?: string;
    ariaDescribedby?: string
    disabled?: boolean;
    required?: boolean;
    invalid?: boolean;
}

export const FormFieldContext = createContext<FormFieldControlProps>({});

export function useFormFieldContext(newContext: FormFieldControlProps): FormFieldControlProps {
    const prevContext = useContext(FormFieldContext);

    return {
        ...prevContext,
        ...newContext,
    };
}
