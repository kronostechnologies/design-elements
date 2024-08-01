import { InputFieldProps } from '../input/types';

type CommonInputFieldProps = Pick<InputFieldProps,
    | 'className'
    | 'required'
    | 'disabled'
    | 'label'
    | 'hint'
>;

export interface MoneyInputProps extends CommonInputFieldProps {
    value?: number | null;
    /**
     * Sets input locale and changes visual format accordingly
     * @default fr-CA
     */
    locale?: string;
    /**
     * Sets currency
     * @default CAD
     */
    currency?: string;
    /**
     * Sets number of decimals
     * @default 2
     */
    precision?: number;
    validationErrorMessage?: string;

    onChange?(value: number | null, formattedValue: string): void;
}
