import { type FC, type Ref, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../../../i18n/use-translation';
import { Listbox, type ListboxOption } from '../../../listbox';
import type { ListboxRef } from '../../../listbox/listbox';
import type { FilterDateRangePreset } from '../../filter-date-range';
import { type ComputedPreset, computePreset } from './presets';

const Container = styled(Listbox)`
    border: none;
    border-bottom-right-radius: 0;
    border-right: 1px solid ${({ theme }) => theme.component['filter-divider-color']};
    border-top-right-radius: 0;
    box-shadow: none;
    display: flex;
    grid-area: shortcuts;
    max-height: unset;
    min-width: 186px;
    outline: none;
    padding: var(--spacing-half) 0;
`;

export interface PresetsProps {
    firstFocusableRef?: Ref<HTMLElement>;

    onCustomPresetClick(): void;

    onPresetClick(preset: ComputedPreset | null): void;

    presets: FilterDateRangePreset[];
    selectedPreset: string | null;
}

export const CUSTOM_PRESET = 'custom';

export const PresetsList: FC<PresetsProps> = ({
    firstFocusableRef,
    onCustomPresetClick,
    onPresetClick,
    presets: providedPresets,
    selectedPreset,
}) => {
    const { t } = useTranslation('filter');
    const presets: ComputedPreset[] = useMemo(
        () => providedPresets.map((preset) => computePreset(preset, t)),
        [providedPresets, t],
    );
    const options: ListboxOption[] = useMemo(() => {
        const items: ListboxOption[] = [{
            label: t('all'),
            value: 'all',
        }];
        items.push(
            ...presets.map((preset) => ({
                label: preset.label,
                value: preset.label,
            })),
            {
                label: t('custom'),
                value: CUSTOM_PRESET,
            },
        );
        return items;
    }, [presets, t]);

    const handleChange = useCallback((listboxOption: ListboxOption) => {
        if (listboxOption.value === CUSTOM_PRESET) {
            onCustomPresetClick();
        } else {
            const matchingPreset: ComputedPreset | null = presets
                .find((preset) => preset.label === listboxOption.value) ?? null;
            onPresetClick(matchingPreset);
        }
    }, [onCustomPresetClick, onPresetClick, presets]);

    return (
        <Container
            focusable={false}
            keyboardNav
            onOptionClick={handleChange}
            options={options}
            ref={firstFocusableRef as Ref<ListboxRef>}
            value={selectedPreset ?? 'all'}
        />
    );
};

PresetsList.displayName = 'PresetsList';
