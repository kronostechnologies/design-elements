import { ReactElement, useCallback, useState, MouseEvent } from 'react';
import styled, { css } from 'styled-components';
import { Disclosure } from '../disclosure/disclosure';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { FilterOption, FilterType, FilterMode } from './types';
import { Option } from './filter-option';

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

const StyledDisclosure = styled(Disclosure)<{ selected: boolean }>`
    > button {
        background: ${({ theme }) => theme.component['filter-background-color']};
        border: 1px solid ${({ theme }) => theme.component['filter-border-color']};
        border-radius: 0.25rem;
        color: ${({ theme }) => theme.component['filter-label-color']};
        font-size: 0.875rem;
        font-weight: 400;
        letter-spacing: 0.015rem;
        line-height: 1.5rem;
        padding: 0 0.5rem;
        text-transform: none;

        &:hover {
            background: ${({ theme }) => theme.component['filter-hover-background-color']};
            color: ${({ theme }) => theme.component['filter-hover-label-color']};
        }
        ${({ selected, theme }) => selected && css`
            background: ${theme.component['filter-selected-background-color']};
            border-color: ${theme.component['filter-selected-border-color']};
            color: ${theme.component['filter-selected-label-color']};
            &:hover {
                background: ${theme.component['filter-selected-hover-background-color']};
            }`
        }
    }
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
}: FilterProps<T, O>): ReactElement => {
    const [selectedOption, setSelectedOption] = useState<FilterOption<O>>(
        getDefault(defaultOption, options),
    );
    const [expanded, setExpanded] = useState(false);
    const { isMobile } = useDeviceContext();

    const optionOnClick = useCallback((option: FilterOption<O>) => {
        setSelectedOption(option);
        onFilterChange(key, option.value);
        setExpanded(false);
    }, [onFilterChange, key]);

    const isAllSelected = selectedOption?.value === 'all';

    if (mode !== 'single-select') {
        console.warn('mode not supported yet');
    }

    return (
        <StyledDisclosure
            idContent={key}
            buttonProps={{
                label: `${label} : ${selectedOption.value}`,
                rightIconName: expanded ? 'chevronUp' : 'chevronDown',
                buttonType: 'secondary',
            }}
            expanded={expanded}
            setExpanded={setExpanded}
            selected={!isAllSelected}
        >
            {
                options.map((option: FilterOption<O>) => (
                    <Option
                        key={`${key}-${option.label}`}
                        $selected={option.value === selectedOption?.value}
                        disabled={option.disabled}
                        focusable
                        isMobile={isMobile}
                        label={option.label}
                        onClick={(_: MouseEvent<HTMLButtonElement>) => {
                            optionOnClick(option);
                        }}
                        buttonType="tertiary"
                    />
                ))
            }
        </StyledDisclosure>
    );
};
