import { createContext, useContext } from 'react';

export interface FormFieldControlProps {
    formId?: string;
    ariaLabel?: string;
    ariaLabelledby?: string;
    ariaDescribedby?: string
    disabled?: boolean;
    required?: boolean;
    valid?: boolean;
}

export const FormFieldContext = createContext<FormFieldControlProps>({});

function applyDefault<T>(fields: T, defaults: T, keys: (keyof T)[]): T {
    const result = <T>{};
    keys.forEach((key) => {
        result[key] = fields[key] === undefined ? defaults[key] : fields[key];
    });
    return result;
}

export function useFormFieldContext(props: FormFieldControlProps): FormFieldControlProps {
    const context = useContext(FormFieldContext);

    return applyDefault(
        props,
        context,
        [
            'formId',
            'ariaLabel',
            'ariaLabelledby',
            'ariaDescribedby',
            'valid',
            'required',
            'disabled',
        ],
    );
}
