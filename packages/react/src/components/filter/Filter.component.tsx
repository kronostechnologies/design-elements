import { ReactElement, useCallback, useState, MouseEvent } from 'react';
import styled from 'styled-components';
import { Button } from '../buttons/button';
import { Disclosure } from '../disclosure/disclosure';
import { FilterOption, FilterType, FilterMode } from './types';

function getDefault<O>(
    defaultOptionValue: O,
    options: FilterOption<O>[],
): FilterOption<O> {
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

const StyledDisclosure = styled(Disclosure)`
    button {
        background: #fff;
        border: 3px solid #60666e;
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

const StyledButton = styled(Button)<StyledButtonProps>`
    border-radius: 0;
    border-left: ${({ $selected }) => (
        $selected ? '4px solid var(--color-background-indicator-selected, #006296)' : '0px solid;')
    };
`;

const FilterButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
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
    const [selectedOption, setSelectedOption] = useState<FilterOption<O>>(
        getDefault(defaultOption, options),
    );

    const optionOnClick = useCallback((option: FilterOption<O>) => {
        console.info('setSelectOption', option.value);
        setSelectedOption(option);
        onFilterChange(key, option.value);
    }, [onFilterChange, key]);

    if (mode !== 'single-select') {
        console.warn('mode not supported yet');
    }

    return (
        <StyledDisclosure
            idContent={key}
            buttonProps={{
                label: `${label} : ${selectedOption.value}`,
                rightIconName: selectedOption === defaultOption ? 'chevronDown' : 'chevronUp',
                buttonType: 'tertiary',
            }}
        >
            <FilterButtonsContainer>
                {
                    options.map((option: FilterOption<O>) => (
                        <StyledButton
                            key={`${key}-${option.label}`}
                            $selected={option.value === selectedOption?.value}
                            label={option.label}
                            onClick={(_: MouseEvent<HTMLButtonElement>) => {
                                console.info('option on click', option.label);
                                optionOnClick(option);
                            }}
                            buttonType='tertiary'
                        />
                    ))
                }
            </FilterButtonsContainer>
        </StyledDisclosure>
    );
};
