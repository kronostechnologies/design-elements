import { useState, useCallback, useMemo, ReactElement } from 'react';
import styled from 'styled-components';
import { MenuButton } from '@equisoft/design-elements-react';

const StyledMenuButton = styled(MenuButton)`
    button {
        background: #fff;
        border-color: #60666e;
        border-radius: 0.25rem;
        color: #1b1c1e;
        font-size: 0.875rem;
        font-weight: 400;
        letter-spacing: 0.015rem;
        line-height: 1.5rem;
        padding: 0 0.5rem;
        text-transform: none;
    }
`;

const Label = styled.span`
    color: #60666e;
    margin-right: 4px;
`;

export interface Option<O> {
    label: string,
    value: O,
}

export interface OptionsSelectorProps<O> {
    buttonLabel: string;
    defaultOption: O;
    options: Option<O>[];
    onChange: (option: Option<O>) => void;
}

function getDefault<O>(defaultOptionValue: O, options: Option<O>[]): Option<O> | undefined {
    if (!options) {
        return undefined;
    }
    const defaultOption = options.find((option) => option.value === defaultOptionValue);
    if (defaultOption) {
        return defaultOption;
    }

    return options[0];
}

export const OptionsSelector = <O, >({
    buttonLabel,
    defaultOption,
    options,
    onChange,
}: OptionsSelectorProps<O>): ReactElement | null => {
    const [selectedOption, setSelectedOption] = useState<Option<O> | undefined>(
        getDefault(defaultOption, options),
    );

    const optionOnClick = useCallback((option: Option<O>) => {
        setSelectedOption(option);
        onChange(option);
    }, [onChange]);

    const menuOptions = useMemo(() => options.map((option: Option<O>) => ({
        label: option.label,
        onClick: () => optionOnClick(option),
    })), [options, optionOnClick]);

    return (
        <StyledMenuButton buttonType='secondary' options={menuOptions}>
            <Label>{buttonLabel}</Label>
            {selectedOption?.label ?? ''}
        </StyledMenuButton>
    );
};
