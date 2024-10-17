import { ReactElement, useCallback, useState } from 'react';
import styled from 'styled-components';
import { Button } from '../buttons/button';
import { Disclosure } from '../disclosure/disclosure';
import { FilterOption, FilterType, FilterMode } from './types';

function getDefault<O>(
    defaultOptionValue: O,
    options: FilterOption<O>[],
): FilterOption<O> | undefined {
    if (!options) {
        return undefined;
    }
    const defaultOption = options.find(
        (option) => option.value === defaultOptionValue,
    );

    if (defaultOption) {
        return defaultOption;
    }

    return options[0];
}

interface StyledButtonProps {
    $selected: boolean;
}

const StyledButton = styled(Button)<StyledButtonProps>`
    border-left: ${({ $selected }) => (
        $selected ? '0px solid;' : '4px solid var(--color-background-indicator-selected, #006296)')
    };
`;

interface FilterProps<T, O> {
    mode: FilterMode,
    filter: FilterType<T, O>
    onFilterChange: (key: string, optionValue: O) => void;
}

export const Filter = <T, O>({
    filter: {
        defaultOption,
        key,
        options,
        label,
    },
    mode,
    onFilterChange,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: FilterProps<T, O>): ReactElement => {
    const [selectedOption, setSelectedOption] = useState<FilterOption<O> | undefined>(
        getDefault(defaultOption, options),
    );

    const optionOnClick = useCallback((option: FilterOption<O>) => {
        setSelectedOption(option);
        onFilterChange(key, option.value);
    }, [onFilterChange, key]);

    if (mode !== 'single-select') {
        console.warn('mode not supported yet');
    }

    return (
        <Disclosure
            idContent={key}
            buttonProps={{
                label,
                rightIconName: selectedOption === defaultOption ? 'chevronDown' : 'chevronUp',
                buttonType: 'tertiary',
            }}
        >
            {
                options.map((option: FilterOption<O>) => (
                    <StyledButton
                        $selected={option.value === selectedOption}
                        label={option.label}
                        onClick={() => optionOnClick(option)}
                        buttonType='tertiary'
                    />
                ))
            }
        </Disclosure>
    );
};
