import { format, isSameDay } from 'date-fns';
import { type FC, useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from '../../i18n/use-translation';
import { DS_CLASS_PREFIX } from '../../utils/component-classes';
import { v4 as uuid } from '../../utils/uuid';
import { type DropdownMenuCloseFunction } from '../dropdown-menu-button';
import { getLocaleDateMaskFormatOrDefault } from '../masked-input/date-mask';
import { DateRangePanel, type DateRangePanelProps } from './internal/date-range';
import { FilterDropdownButton } from './internal/filter-dropdown-button';

export type FilterDateRangeValue = {
    from: Date | null;
    to: Date | null;
};

type WithOptionalLabel<T> = T & { label?: string; };

type RelativeRangePreset = WithOptionalLabel<
    | { days: number; }
    | { weeks: number; }
    | { months: number; }
    | { years: number; }
>;

type CustomRangePreset = WithOptionalLabel<{
    end?: Date;
    start?: Date;
}>;

export type FilterDateRangePreset = CustomRangePreset | RelativeRangePreset;

export interface FilterDateRangeProps {
    async?: boolean;
    label: string;
    /**
     * Use FilterDateRangePresets to generate common presets.
     */
    presets?: FilterDateRangePreset[];
    value?: FilterDateRangeValue;

    onChange?(value: FilterDateRangeValue): void;
}

/**
 * @alpha This component is experimental and may change without a major version bump.
 */
export const FilterDateRange: FC<FilterDateRangeProps> = ({
    async = false,
    label,
    onChange,
    presets,
    value,
}) => {
    const { i18n, t } = useTranslation('filter');
    const dropdownMenuId = useMemo(() => `${DS_CLASS_PREFIX}${uuid()}`, []);
    const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
    const dateRangePanelRef = useRef<HTMLDivElement>(null);

    const handleChange: DateRangePanelProps['onChange'] = useCallback((newValue) => {
        setSelectedPreset(null);
        if (!async) {
            onChange?.(newValue);
        }
    }, [async, onChange]);

    const hasFiltersApplied = Boolean(value?.from || value?.to);

    const handleApply = useCallback((newValue: FilterDateRangeValue, close: DropdownMenuCloseFunction) => {
        onChange?.(newValue);
        close();
    }, [onChange]);

    const handleCancel = useCallback((close: DropdownMenuCloseFunction) => {
        close();
    }, []);

    const handlePresetChange = useCallback((preset: string | null) => {
        setSelectedPreset(preset);
    }, []);

    const dateFormat = useMemo(() => getLocaleDateMaskFormatOrDefault(i18n.language), [i18n.language]);
    const labelWithValues = useMemo(() => {
        if (value?.from && value?.to) {
            const context = isSameDay(value.to, value.from) ? 'sameDay' : undefined;
            return t('date.range', { context, from: format(value.from, dateFormat), to: format(value.to, dateFormat) });
        }
        if (value?.from) {
            return t('date.range', { context: 'from', from: format(value.from, dateFormat) });
        }
        if (value?.to) {
            return t('date.range', { context: 'to', to: format(value.to, dateFormat) });
        }
        return '';
    }, [dateFormat, t, value?.from, value?.to]);

    return (
        <FilterDropdownButton
            firstItemRef={dateRangePanelRef}
            label={hasFiltersApplied ? labelWithValues : label}
            render={(close: DropdownMenuCloseFunction) => (
                <DateRangePanel
                    async={async}
                    firstFocusableRef={dateRangePanelRef}
                    onApply={(newValue) => handleApply(newValue, close)}
                    onCancel={() => handleCancel(close)}
                    onChange={handleChange}
                    onPresetChange={handlePresetChange}
                    presets={presets}
                    selectedPreset={selectedPreset}
                    value={value}
                />
            )}
            dropdownMenuId={dropdownMenuId}
            $hasFilters={hasFiltersApplied}
            $labelPrefix={label}
        />
    );
};

FilterDateRange.displayName = 'FilterDateRange';
