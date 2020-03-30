import React from 'react';
import { Select } from '../select/select';

interface Option {
    label: string;
    value: string;
}

// ----------------------------------------------------------------
// Importer les types de SelectProps lorsque le PR de react-docgen
// permettant de handle les imports sera merged
//
// PR: https://github.com/reactjs/react-docgen/pull/352
// ----------------------------------------------------------------

interface ComboboxProps {
    /**
     * The default selected option
     */
    defaultValue?: string;
    /**
     * Disables input
     */
    disabled?: boolean;
    label?: string;
    name?: string;
    /**
     * Number of visible items in the list before overflow
     * @default 4
     */
    numberOfItemsVisible?: number;
    /**
     * { value: string; label?: string; }[]
     */
    options: Option[];
    placeholder?: string;
    required?: boolean;
    /**
     * Adds a skip button
     */
    skipOption?: { label: string; value?: string };
    /**
     * Sets input validity
     */
    valid?: boolean;
    /**
     * Sets error message
     * @default You must select an option
     */
    validationErrorMessage?: string;
    /**
     * OnChange callback function, invoked when an option is selected
     */
    onChange?(option: Option): void;
}

export const Combobox = (props: ComboboxProps) => (
    <Select searchable {...props}/>
);
